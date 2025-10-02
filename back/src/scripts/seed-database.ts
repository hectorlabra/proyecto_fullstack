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
    const appointmentRepository = AppDataSource.getRepository(Appointment);

    // Verificar si ya hay datos
    const existingUsersCount = await userRepository.count();
    if (existingUsersCount > 0) {
      console.log(
        `📊 Ya existen ${existingUsersCount} usuarios en la base de datos.`
      );
      console.log(
        "ℹ️  Si quieres limpiar los datos, hazlo manualmente desde psql o elimina las tablas."
      );
      console.log("🎉 Script completado - usando datos existentes");
      return;
    }

    console.log(
      "🗑️ Base de datos vacía, procediendo a crear datos de prueba..."
    );

    console.log("👥 Creando usuarios de prueba...");

    const usersData = [
      {
        firstName: "Admin",
        lastName: "Sistema",
        email: "admin@medicapp.com",
        phone: "+1234567890",
        dateOfBirth: "1980-01-01",
        nDni: "00000000",
        username: "admin",
        password: "Admin123!",
        role: "admin",
      },
      {
        firstName: "María",
        lastName: "González",
        email: "maria.gonzalez@email.com",
        phone: "+1234567891",
        dateOfBirth: "1990-05-15",
        nDni: "12345678",
        username: "maria.gonzalez",
        password: "Maria123!",
        role: "user",
      },
      {
        firstName: "Carlos",
        lastName: "Rodríguez",
        email: "carlos.rodriguez@email.com",
        phone: "+1234567892",
        dateOfBirth: "1985-08-22",
        nDni: "87654321",
        username: "carlos.rodriguez",
        password: "Carlos123!",
        role: "user",
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

    const appointmentsData = [
      {
        userId: users[1].id,
        date: "2025-10-15",
        time: "09:00",
        status: AppointmentStatus.SCHEDULED,
        notes: "Consulta general - Chequeo anual",
      },
      {
        userId: users[1].id,
        date: "2025-10-20",
        time: "14:30",
        status: AppointmentStatus.SCHEDULED,
        notes: "Análisis de laboratorio - Seguimiento",
      },
      {
        userId: users[2].id,
        date: "2025-10-18",
        time: "10:00",
        status: AppointmentStatus.SCHEDULED,
        notes: "Primera consulta - Evaluación inicial",
      },
      {
        userId: users[2].id,
        date: "2025-09-25",
        time: "11:30",
        status: AppointmentStatus.COMPLETED,
        notes: "Consulta completada - Control de presión",
      },
      {
        userId: users[1].id,
        date: "2025-09-28",
        time: "16:00",
        status: AppointmentStatus.CANCELED,
        notes: "Cancelada por el paciente - Reagendar",
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
