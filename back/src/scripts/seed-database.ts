import "reflect-metadata";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User.entity";
import { Credential } from "../entities/Credential.entity";
import { Appointment, AppointmentStatus } from "../entities/Appointment.entity";
import { hash } from "bcrypt";

/**
 * Script para poblar la base de datos con datos de prueba.
 * Crea usuarios, credenciales y citas de ejemplo para testing.
 */
async function seedDatabase() {
  try {
    console.log("🔄 Inicializando conexión a la base de datos...");
    await AppDataSource.initialize();
    console.log("✅ Conexión establecida");

    const userRepository = AppDataSource.getRepository(User);
    const credentialRepository = AppDataSource.getRepository(Credential);
    const appointmentRepository = AppDataSource.getRepository(Appointment);

    // Limpiar tablas existentes (opcional, comentar si no se quiere limpiar)
    console.log("🗑️ Limpiando datos existentes...");
    await appointmentRepository.delete({});
    await credentialRepository.delete({});
    await userRepository.delete({});

    console.log("👥 Creando usuarios de prueba...");

    // Crear usuarios de prueba
    const usersData = [
      {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@email.com",
        phone: "+1234567890",
        dateOfBirth: "1990-05-15",
        nDni: "12345678",
        username: "john_doe",
        password: "password123",
      },
      {
        firstName: "Jane",
        lastName: "Smith",
        email: "jane.smith@email.com",
        phone: "+1234567891",
        dateOfBirth: "1985-08-22",
        nDni: "87654321",
        username: "jane_smith",
        password: "securepass456",
      },
      {
        firstName: "Mike",
        lastName: "Johnson",
        email: "mike.johnson@email.com",
        phone: "+1234567892",
        dateOfBirth: "1992-12-03",
        nDni: "11223344",
        username: "mike_johnson",
        password: "mypassword789",
      },
      {
        firstName: "Sarah",
        lastName: "Wilson",
        email: "sarah.wilson@email.com",
        phone: "+1234567893",
        dateOfBirth: "1988-03-18",
        nDni: "44332211",
        username: "sarah_wilson",
        password: "strongpass321",
      },
      {
        firstName: "David",
        lastName: "Brown",
        email: "david.brown@email.com",
        phone: "+1234567894",
        dateOfBirth: "1995-09-07",
        nDni: "55667788",
        username: "david_brown",
        password: "davidpass654",
      },
    ];

    const users: User[] = [];

    for (const userData of usersData) {
      await AppDataSource.transaction(async (manager) => {
        // 1. Crear el usuario
        const user = manager.create(User, {
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          phone: userData.phone,
          dateOfBirth: userData.dateOfBirth,
          nDni: userData.nDni,
        });

        const savedUser = await manager.save(User, user);
        users.push(savedUser);

        // 2. Crear las credenciales
        const hashedPassword = await hash(userData.password, 10);
        const credential = manager.create(Credential, {
          username: userData.username,
          passwordHash: hashedPassword,
          userId: savedUser.id,
        });

        await manager.save(Credential, credential);
        console.log(
          `✅ Usuario creado: ${userData.firstName} ${userData.lastName} (${userData.username})`
        );
      });
    }

    console.log("📅 Creando citas de prueba...");

    // Crear citas de prueba
    const appointmentsData = [
      {
        userId: users[0].id,
        date: "2025-07-20",
        time: "09:00",
        status: AppointmentStatus.SCHEDULED,
        notes: "Consulta general",
      },
      {
        userId: users[1].id,
        date: "2025-07-21",
        time: "10:30",
        status: AppointmentStatus.SCHEDULED,
        notes: "Revisión mensual",
      },
      {
        userId: users[2].id,
        date: "2025-07-22",
        time: "14:00",
        status: AppointmentStatus.CANCELED,
        notes: "Cancelado por el paciente",
      },
      {
        userId: users[0].id,
        date: "2025-07-23",
        time: "16:15",
        status: AppointmentStatus.SCHEDULED,
        notes: "Seguimiento",
      },
      {
        userId: users[3].id,
        date: "2025-07-24",
        time: "11:45",
        status: AppointmentStatus.SCHEDULED,
        notes: "Primera consulta",
      },
      {
        userId: users[4].id,
        date: "2025-07-25",
        time: "13:30",
        status: AppointmentStatus.CANCELED,
        notes: "Reagendado",
      },
    ];

    for (const appointmentData of appointmentsData) {
      const appointment = appointmentRepository.create(appointmentData);
      await appointmentRepository.save(appointment);
      console.log(
        `✅ Cita creada: ${appointmentData.date} ${appointmentData.time} - Usuario ${appointmentData.userId}`
      );
    }

    console.log("🎉 Base de datos poblada exitosamente!");
    console.log("\n📊 Resumen:");
    console.log(`   👥 Usuarios creados: ${users.length}`);
    console.log(`   📅 Citas creadas: ${appointmentsData.length}`);
    console.log("\n🔐 Credenciales de prueba:");
    usersData.forEach((user) => {
      console.log(`   - ${user.username} : ${user.password}`);
    });
  } catch (error) {
    console.error("❌ Error poblando la base de datos:", error);
    throw error;
  } finally {
    await AppDataSource.destroy();
    console.log("✅ Conexión cerrada");
  }
}

// Ejecutar el script
if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log("✅ Script ejecutado exitosamente");
      process.exit(0);
    })
    .catch((error) => {
      console.error("❌ Error ejecutando el script:", error);
      process.exit(1);
    });
}

export { seedDatabase };
