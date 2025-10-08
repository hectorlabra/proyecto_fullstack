import { describe, expect, it } from "vitest";
import {
  combineDateTime,
  isWithinBusinessHours,
  isWeekday,
  isDateTimeInPast,
  validateAppointmentSelection,
} from "./appointmentValidation";

const FIXED_NOW = new Date(2025, 0, 15, 10, 0, 0);

describe("appointmentValidation", () => {
  it("validates business hours boundaries", () => {
    expect(isWithinBusinessHours("08:00")).toBe(true);
    expect(isWithinBusinessHours("17:59")).toBe(true);
    expect(isWithinBusinessHours("07:59")).toBe(false);
    expect(isWithinBusinessHours("18:00")).toBe(false);
  });

  it("detects weekdays correctly", () => {
    expect(isWeekday("2025-01-15")).toBe(true); // Wednesday
    expect(isWeekday("2025-01-18")).toBe(false); // Saturday
  });

  it("combines date and time into local date", () => {
    const result = combineDateTime("2025-01-20", "09:45");
    expect(result.getFullYear()).toBe(2025);
    expect(result.getMonth()).toBe(0);
    expect(result.getDate()).toBe(20);
    expect(result.getHours()).toBe(9);
    expect(result.getMinutes()).toBe(45);
  });

  it("flags past date times", () => {
    expect(isDateTimeInPast("2025-01-15", "09:55", FIXED_NOW)).toBe(true);
    expect(isDateTimeInPast("2025-01-15", "10:00", FIXED_NOW)).toBe(true);
    expect(isDateTimeInPast("2025-01-15", "10:05", FIXED_NOW)).toBe(false);
    expect(isDateTimeInPast("2025-01-16", "09:00", FIXED_NOW)).toBe(false);
  });

  it("returns field errors for invalid selection", () => {
    const errors = validateAppointmentSelection(
      "2025-01-18",
      "07:30",
      FIXED_NOW
    );
    expect(errors).toMatchObject({
      date: "Solo se pueden agendar citas de lunes a viernes",
      time: "Las citas solo pueden agendarse entre 8:00 AM y 6:00 PM",
    });
  });

  it("detects past selections even on same day", () => {
    const errors = validateAppointmentSelection(
      "2025-01-15",
      "09:30",
      FIXED_NOW
    );
    expect(errors).toMatchObject({
      time: "No se pueden agendar citas en el pasado",
    });
  });

  it("approves valid future selection", () => {
    const errors = validateAppointmentSelection(
      "2025-01-16",
      "11:00",
      FIXED_NOW
    );
    expect(errors).toEqual({});
  });
});
