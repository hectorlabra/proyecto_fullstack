import { AppDataSource } from "../data-source";
import { Appointment, AppointmentStatus } from "../entities/Appointment.entity";
import { User } from "../entities/User.entity";
import { CreateAppointmentDto } from "../dtos/appointments/create-appointment.dto";
import { Repository } from "typeorm";

export const getAllAppointments = async (): Promise<Appointment[]> => {
  const appointmentRepository: Repository<Appointment> =
    AppDataSource.getRepository(Appointment);
  return await appointmentRepository.find({
    relations: ["user"],
    order: { date: "ASC", time: "ASC" },
  });
};

export const getAppointmentById = async (
  id: number
): Promise<Appointment | null> => {
  const appointmentRepository: Repository<Appointment> =
    AppDataSource.getRepository(Appointment);
  return await appointmentRepository.findOne({
    where: { id },
    relations: ["user"],
  });
};

export const getAppointmentsByUserId = async (
  userId: number
): Promise<Appointment[]> => {
  const appointmentRepository: Repository<Appointment> =
    AppDataSource.getRepository(Appointment);
  return await appointmentRepository.find({
    where: { userId },
    relations: ["user"],
    order: { date: "ASC", time: "ASC" },
  });
};

export const createAppointment = async (
  appointmentData: CreateAppointmentDto
): Promise<Appointment> => {
  const appointmentRepository: Repository<Appointment> =
    AppDataSource.getRepository(Appointment);
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({
    where: { id: appointmentData.userId },
  });

  if (!user) {
    throw new Error("El usuario especificado no existe");
  }

  const appointmentDate = new Date(appointmentData.date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (appointmentDate < today) {
    throw new Error("No se pueden agendar citas en fechas pasadas");
  }

  const [hours, minutes] = appointmentData.time.split(":").map(Number);
  const appointmentTimeInMinutes = hours * 60 + minutes;
  const minTime = 8 * 60;
  const maxTime = 18 * 60;

  if (
    appointmentTimeInMinutes < minTime ||
    appointmentTimeInMinutes >= maxTime
  ) {
    throw new Error("Las citas solo pueden agendarse entre 8:00 AM y 6:00 PM");
  }

  const dayOfWeek = appointmentDate.getDay();
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    throw new Error("Las citas solo pueden agendarse de lunes a viernes");
  }

  const existingAppointment = await appointmentRepository.findOne({
    where: {
      userId: appointmentData.userId,
      date: appointmentData.date,
      time: appointmentData.time,
      status: AppointmentStatus.SCHEDULED,
    },
  });

  if (existingAppointment) {
    throw new Error(
      "Ya existe una cita activa para este usuario en la misma fecha y hora"
    );
  }

  const newAppointment = appointmentRepository.create({
    date: appointmentData.date,
    time: appointmentData.time,
    userId: appointmentData.userId,
    notes: appointmentData.notes || "",
    status: AppointmentStatus.SCHEDULED,
  });

  return await appointmentRepository.save(newAppointment);
};

export const cancelAppointment = async (
  id: number
): Promise<Appointment | null> => {
  const appointmentRepository: Repository<Appointment> =
    AppDataSource.getRepository(Appointment);

  const appointment = await appointmentRepository.findOne({
    where: { id },
    relations: ["user"],
  });

  if (!appointment) {
    throw new Error("La cita no existe");
  }

  if (appointment.status !== AppointmentStatus.SCHEDULED) {
    throw new Error("Solo se pueden cancelar citas programadas");
  }

  if (!appointment.canBeCanceled()) {
    throw new Error(
      "Las citas solo pueden cancelarse hasta el día anterior a la fecha programada"
    );
  }

  appointment.status = AppointmentStatus.CANCELED;
  return await appointmentRepository.save(appointment);
};

export const completeAppointment = async (
  id: number
): Promise<Appointment | null> => {
  const appointmentRepository: Repository<Appointment> =
    AppDataSource.getRepository(Appointment);

  const appointment = await appointmentRepository.findOne({
    where: { id },
    relations: ["user"],
  });

  if (!appointment) {
    throw new Error("La cita no existe");
  }

  if (appointment.status !== AppointmentStatus.SCHEDULED) {
    throw new Error("Solo se pueden completar citas programadas");
  }

  appointment.status = AppointmentStatus.COMPLETED;
  return await appointmentRepository.save(appointment);
};
