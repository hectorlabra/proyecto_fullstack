import { AppDataSource } from "../data-source";
import { Appointment, AppointmentStatus } from "../entities/Appointment.entity";
import { User } from "../entities/User.entity";
import { CreateAppointmentDto } from "../dtos/appointments/create-appointment.dto";
import { Repository } from "typeorm";
import { validateAppointmentRequest } from "./appointments/appointmentRules";

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

  validateAppointmentRequest(
    appointmentData.date,
    appointmentData.time,
    new Date()
  );

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

  const sanitizedNotes = appointmentData.notes?.trim();

  const newAppointment = appointmentRepository.create({
    date: appointmentData.date,
    time: appointmentData.time,
    userId: appointmentData.userId,
    notes: sanitizedNotes ?? "",
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
