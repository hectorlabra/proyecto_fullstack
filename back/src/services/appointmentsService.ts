import { AppDataSource } from "../data-source";
import { Appointment, AppointmentStatus } from "../entities/Appointment.entity";
import { User } from "../entities/User.entity";
import { CreateAppointmentDto } from "../dtos/appointments/create-appointment.dto";
import { Repository } from "typeorm";

/**
 * Servicio para manejar operaciones relacionadas con citas médicas.
 * Utiliza TypeORM para interactuar con la base de datos.
 */

/**
 * Obtiene todas las citas médicas
 * @returns Promise<Appointment[]> - Array de todas las citas
 */
export const getAllAppointments = async (): Promise<Appointment[]> => {
  const appointmentRepository: Repository<Appointment> =
    AppDataSource.getRepository(Appointment);
  return await appointmentRepository.find({
    relations: ["user"],
    order: { date: "ASC", time: "ASC" },
  });
};

/**
 * Obtiene una cita por su ID
 * @param id - ID de la cita a buscar
 * @returns Promise<Appointment | null> - Cita encontrada o null si no existe
 */
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

/**
 * Obtiene todas las citas de un usuario específico
 * @param userId - ID del usuario
 * @returns Promise<Appointment[]> - Array de citas del usuario
 */
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

/**
 * Crea una nueva cita médica
 * @param appointmentData - DTO con los datos de la cita
 * @returns Promise<Appointment> - Cita creada
 * @throws Error si hay validaciones que fallan
 */
export const createAppointment = async (
  appointmentData: CreateAppointmentDto
): Promise<Appointment> => {
  const appointmentRepository: Repository<Appointment> =
    AppDataSource.getRepository(Appointment);
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  // Verificar que el usuario existe
  const user = await userRepository.findOne({
    where: { id: appointmentData.userId },
  });

  if (!user) {
    throw new Error("El usuario especificado no existe");
  }

  // Validar que la fecha no sea en el pasado
  const appointmentDate = new Date(appointmentData.date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (appointmentDate < today) {
    throw new Error("No se pueden agendar citas en fechas pasadas");
  }

  // Validar horario de atención (8:00 AM - 6:00 PM)
  const [hours, minutes] = appointmentData.time.split(":").map(Number);
  const appointmentTimeInMinutes = hours * 60 + minutes;
  const minTime = 8 * 60; // 8:00 AM
  const maxTime = 18 * 60; // 6:00 PM

  if (
    appointmentTimeInMinutes < minTime ||
    appointmentTimeInMinutes >= maxTime
  ) {
    throw new Error("Las citas solo pueden agendarse entre 8:00 AM y 6:00 PM");
  }

  // Validar que sea día laboral (lunes a viernes)
  const dayOfWeek = appointmentDate.getDay();
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    throw new Error("Las citas solo pueden agendarse de lunes a viernes");
  }

  // Verificar disponibilidad (no hay conflicto de horario para el mismo usuario)
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

  // Crear la nueva cita
  const newAppointment = appointmentRepository.create({
    date: appointmentData.date,
    time: appointmentData.time,
    userId: appointmentData.userId,
    notes: appointmentData.notes || "",
    status: AppointmentStatus.SCHEDULED,
  });

  return await appointmentRepository.save(newAppointment);
};

/**
 * Cancela una cita cambiando su estado a "canceled"
 * @param id - ID de la cita a cancelar
 * @returns Promise<Appointment | null> - Cita cancelada o null si no se encontró/no se pudo cancelar
 */
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

  // Verificar que se puede cancelar (hasta el día anterior)
  if (!appointment.canBeCanceled()) {
    throw new Error(
      "Las citas solo pueden cancelarse hasta el día anterior a la fecha programada"
    );
  }

  // Actualizar el estado
  appointment.status = AppointmentStatus.CANCELED;
  return await appointmentRepository.save(appointment);
};

/**
 * Completa una cita cambiando su estado a "completed"
 * @param id - ID de la cita a completar
 * @returns Promise<Appointment | null> - Cita completada o null si no se encontró
 */
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

  // Actualizar el estado
  appointment.status = AppointmentStatus.COMPLETED;
  return await appointmentRepository.save(appointment);
};
