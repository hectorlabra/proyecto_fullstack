const TIME_PATTERN = /^([01]?\d|2[0-3]):([0-5]\d)$/;

const BUSINESS_START_MINUTES = 8 * 60;
const BUSINESS_END_MINUTES = 18 * 60;

const DATE_SPLIT_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;

export interface AppointmentDateParts {
  year: number;
  month: number;
  day: number;
}

export interface AppointmentTimeParts {
  hours: number;
  minutes: number;
}

export const BUSINESS_HOURS = {
  startMinutes: BUSINESS_START_MINUTES,
  endMinutes: BUSINESS_END_MINUTES,
};

export const parseDateParts = (dateString: string): AppointmentDateParts => {
  const match = DATE_SPLIT_PATTERN.exec(dateString.trim());
  if (!match) {
    throw new Error("Formato de fecha inválido. Use YYYY-MM-DD");
  }

  const [, y, m, d] = match;
  const year = Number(y);
  const month = Number(m);
  const day = Number(d);

  return { year, month, day };
};

export const parseTimeParts = (timeString: string): AppointmentTimeParts => {
  const trimmed = timeString.trim();
  const match = TIME_PATTERN.exec(trimmed);

  if (!match) {
    throw new Error("La hora debe tener formato HH:mm válido");
  }

  const [, hh, mm] = match;
  const hours = Number(hh);
  const minutes = Number(mm);

  return { hours, minutes };
};

export const createLocalDate = ({
  year,
  month,
  day,
}: AppointmentDateParts): Date => {
  return new Date(year, month - 1, day, 0, 0, 0, 0);
};

export const combineDateAndTime = (
  dateString: string,
  timeString: string
): Date => {
  const dateParts = parseDateParts(dateString);
  const timeParts = parseTimeParts(timeString);

  return new Date(
    dateParts.year,
    dateParts.month - 1,
    dateParts.day,
    timeParts.hours,
    timeParts.minutes,
    0,
    0
  );
};

export const isWeekday = (dateString: string): boolean => {
  const { year, month, day } = parseDateParts(dateString);
  const date = new Date(year, month - 1, day);
  const dayOfWeek = date.getDay();
  return dayOfWeek >= 1 && dayOfWeek <= 5;
};

export const isWithinBusinessHours = (timeString: string): boolean => {
  const { hours, minutes } = parseTimeParts(timeString);
  const totalMinutes = hours * 60 + minutes;
  return (
    totalMinutes >= BUSINESS_START_MINUTES &&
    totalMinutes < BUSINESS_END_MINUTES
  );
};

export const ensureDateNotPast = (
  dateString: string,
  now = new Date()
): void => {
  const reference = new Date(now);
  reference.setHours(0, 0, 0, 0);

  const appointmentDate = createLocalDate(parseDateParts(dateString));

  if (appointmentDate < reference) {
    throw new Error("No se pueden agendar citas en fechas pasadas");
  }
};

export const ensureNotWeekend = (dateString: string): void => {
  if (!isWeekday(dateString)) {
    throw new Error("Las citas solo pueden agendarse de lunes a viernes");
  }
};

export const ensureWithinBusinessHours = (timeString: string): void => {
  if (!isWithinBusinessHours(timeString)) {
    throw new Error("Las citas solo pueden agendarse entre 8:00 AM y 6:00 PM");
  }
};

export const ensureDateTimeNotPast = (
  dateString: string,
  timeString: string,
  now = new Date()
): void => {
  const appointmentDateTime = combineDateAndTime(dateString, timeString);

  if (appointmentDateTime.getTime() <= now.getTime()) {
    throw new Error("No se pueden agendar citas en el pasado");
  }
};

export const validateAppointmentRequest = (
  dateString: string,
  timeString: string,
  now = new Date()
): void => {
  ensureDateNotPast(dateString, now);
  ensureNotWeekend(dateString);
  ensureWithinBusinessHours(timeString);
  ensureDateTimeNotPast(dateString, timeString, now);
};
