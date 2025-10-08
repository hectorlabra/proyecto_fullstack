const TIME_PATTERN = /^([01]?\d|2[0-3]):([0-5]\d)$/;

const BUSINESS_START_MINUTES = 8 * 60;
const BUSINESS_END_MINUTES = 18 * 60;

export const parseTime = (timeString = "") => {
  const trimmed = timeString.trim();
  const match = TIME_PATTERN.exec(trimmed);
  if (!match) {
    return null;
  }
  const [, hh, mm] = match;
  return { hours: Number(hh), minutes: Number(mm) };
};

export const isWithinBusinessHours = (timeString = "") => {
  const parsed = parseTime(timeString);
  if (!parsed) return false;
  const totalMinutes = parsed.hours * 60 + parsed.minutes;
  return (
    totalMinutes >= BUSINESS_START_MINUTES &&
    totalMinutes < BUSINESS_END_MINUTES
  );
};

export const isWeekday = (dateString = "") => {
  if (!dateString || typeof dateString !== "string") return false;
  const [year, month, day] = dateString.split("-").map(Number);
  if (Number.isNaN(year) || Number.isNaN(month) || Number.isNaN(day)) {
    return false;
  }
  const date = new Date(year, month - 1, day);
  const dayOfWeek = date.getDay();
  return dayOfWeek >= 1 && dayOfWeek <= 5;
};

export const combineDateTime = (dateString = "", timeString = "") => {
  const [year, month, day] = dateString.split("-").map(Number);
  const parsedTime = parseTime(timeString);

  if (
    Number.isNaN(year) ||
    Number.isNaN(month) ||
    Number.isNaN(day) ||
    !parsedTime
  ) {
    return null;
  }

  return new Date(
    year,
    month - 1,
    day,
    parsedTime.hours,
    parsedTime.minutes,
    0,
    0
  );
};

export const isDateInPast = (dateString = "", now = new Date()) => {
  const [year, month, day] = dateString.split("-").map(Number);
  if (Number.isNaN(year) || Number.isNaN(month) || Number.isNaN(day)) {
    return true;
  }
  const appointmentDate = new Date(year, month - 1, day);
  appointmentDate.setHours(0, 0, 0, 0);

  const reference = new Date(now);
  reference.setHours(0, 0, 0, 0);

  return appointmentDate < reference;
};

export const isDateTimeInPast = (
  dateString = "",
  timeString = "",
  now = new Date()
) => {
  const appointmentDateTime = combineDateTime(dateString, timeString);
  if (!appointmentDateTime) return true;
  return appointmentDateTime.getTime() <= now.getTime();
};

export const validateAppointmentSelection = (
  dateString,
  timeString,
  now = new Date()
) => {
  const errors = {};

  if (!dateString) {
    errors.date = "La fecha es obligatoria";
  } else if (!isWeekday(dateString)) {
    errors.date = "Solo se pueden agendar citas de lunes a viernes";
  } else if (isDateInPast(dateString, now)) {
    errors.date = "No se pueden agendar citas en fechas pasadas";
  }

  if (!timeString) {
    errors.time = "La hora es obligatoria";
  } else if (!isWithinBusinessHours(timeString)) {
    errors.time = "Las citas solo pueden agendarse entre 8:00 AM y 6:00 PM";
  }

  if (!errors.date && !errors.time) {
    if (isDateTimeInPast(dateString, timeString, now)) {
      errors.time = "No se pueden agendar citas en el pasado";
    }
  }

  return errors;
};
