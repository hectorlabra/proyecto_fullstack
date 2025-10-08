import { describe, expect, it } from "vitest";
import {
  combineDateAndTime,
  ensureDateNotPast,
  ensureDateTimeNotPast,
  ensureNotWeekend,
  isWithinBusinessHours,
  validateAppointmentRequest,
} from "./appointmentRules";

const FIXED_NOW = new Date(2025, 0, 15, 10, 0, 0); // 15 Jan 2025 10:00 local time

describe("appointmentRules", () => {
  it("identifies business hours correctly", () => {
    expect(isWithinBusinessHours("08:00")).toBe(true);
    expect(isWithinBusinessHours("17:59")).toBe(true);
    expect(isWithinBusinessHours("07:59")).toBe(false);
    expect(isWithinBusinessHours("18:00")).toBe(false);
  });

  it("combines date and time using local timezone", () => {
    const result = combineDateAndTime("2025-02-10", "14:30");
    expect(result.getFullYear()).toBe(2025);
    expect(result.getMonth()).toBe(1);
    expect(result.getDate()).toBe(10);
    expect(result.getHours()).toBe(14);
    expect(result.getMinutes()).toBe(30);
  });

  it("throws when scheduling on a weekend", () => {
    expect(() => ensureNotWeekend("2025-01-18")).toThrow(
      "Las citas solo pueden agendarse de lunes a viernes"
    );
  });

  it("throws when scheduling in a past date", () => {
    expect(() => ensureDateNotPast("2025-01-10", FIXED_NOW)).toThrow(
      "No se pueden agendar citas en fechas pasadas"
    );
  });

  it("throws when scheduling in the past within the same day", () => {
    expect(() =>
      ensureDateTimeNotPast("2025-01-15", "09:55", FIXED_NOW)
    ).toThrow("No se pueden agendar citas en el pasado");
  });

  it("allows valid future appointments", () => {
    expect(() =>
      validateAppointmentRequest("2025-01-16", "11:00", FIXED_NOW)
    ).not.toThrow();
  });
});
