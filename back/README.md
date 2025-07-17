# Sistema de Gestión de Turnos Médicos - Backend

## 📋 Descripción

Backend para el sistema de gestión de turnos médicos desarrollado con Node.js, Express, TypeScript y TypeORM. Permite manejar usuarios, credenciales y citas médicas con persistencia en PostgreSQL.

## 🚀 Tecnologías Utilizadas

- **Node.js** con **Express.js**
- **TypeScript** para tipado estático
- **TypeORM** como ORM para base de datos
- **PostgreSQL** como base de datos
- **class-validator** para validación de DTOs
- **bcrypt** para hashing de contraseñas

## 📦 Instalación

1. **Clonar el repositorio e instalar dependencias:**

```bash
npm install
```

2. **Configurar la base de datos PostgreSQL:**

   - Crear una base de datos llamada `medical_appointments`
   - Asegurarse de que PostgreSQL esté ejecutándose en el puerto 5432

3. **Configurar variables de entorno:**
   - Copiar `.env.example` a `.env`
   - Actualizar las variables con tus datos de base de datos:

```bash
cp .env.example .env
```

Editar `.env`:

```env
# Configuración del servidor
PORT=3000

# Configuración de la base de datos PostgreSQL
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=tu_usuario_postgres
DB_PASSWORD=tu_contraseña_postgres
DB_DATABASE=medical_appointments
DB_SSL=false

# Configuración de desarrollo
NODE_ENV=development
```

4. **Poblar la base de datos con datos de prueba:**

```bash
npm run seed
```

5. **Iniciar el servidor:**

```bash
npm start
```

El servidor estará disponible en `http://localhost:3000`

## 🗄️ Estructura de la Base de Datos

### Entidades

1. **Users (Usuarios)**

   - Información personal de los pacientes
   - Campos: firstName, lastName, email, phone, dateOfBirth, nDni

2. **Credentials (Credenciales)**

   - Información de autenticación
   - Relación 1:1 con Users
   - Campos: username, passwordHash

3. **Appointments (Citas)**
   - Turnos médicos programados
   - Relación N:1 con Users
   - Campos: date, time, status, notes
   - Estados: scheduled, canceled, completed

## 🔌 API Endpoints

### Usuarios

- `GET /users` - Obtener todos los usuarios
- `GET /users/:id` - Obtener usuario por ID
- `POST /users/register` - Registrar nuevo usuario
- `POST /users/login` - Autenticar usuario

### Citas Médicas

- `GET /appointments` - Obtener todas las citas
- `GET /appointments/:id` - Obtener cita por ID
- `POST /appointments/schedule` - Agendar nueva cita
- `PUT /appointments/cancel/:id` - Cancelar cita

## 📝 Ejemplos de Uso

### Registrar Usuario

```json
POST /users/register
Content-Type: application/json

{
  "firstName": "Carlos",
  "lastName": "López",
  "email": "carlos.lopez@email.com",
  "phone": "+1234567890",
  "dateOfBirth": "1990-05-15",
  "nDni": "12345678",
  "username": "carlos_lopez",
  "password": "mipassword123"
}
```

### Login

```json
POST /users/login
Content-Type: application/json

{
  "username": "john_doe",
  "password": "password123"
}
```

### Agendar Cita

```json
POST /appointments/schedule
Content-Type: application/json

{
  "userId": 1,
  "date": "2025-07-20",
  "time": "09:00",
  "notes": "Consulta general"
}
```

## 🧪 Datos de Prueba

Después de ejecutar `npm run seed`, tendrás los siguientes usuarios de prueba:

| Usuario      | Contraseña    | Email                  |
| ------------ | ------------- | ---------------------- |
| john_doe     | password123   | john.doe@email.com     |
| jane_smith   | securepass456 | jane.smith@email.com   |
| mike_johnson | mypassword789 | mike.johnson@email.com |
| sarah_wilson | strongpass321 | sarah.wilson@email.com |
| david_brown  | davidpass654  | david.brown@email.com  |

## 🛠️ Scripts Disponibles

- `npm start` - Iniciar servidor en modo desarrollo (con nodemon)
- `npm run build` - Compilar TypeScript a JavaScript
- `npm run prod` - Compilar y ejecutar en modo producción
- `npm run seed` - Poblar base de datos con datos de prueba
- `npm run typeorm` - Ejecutar comandos de TypeORM
- `npm run migration:generate` - Generar nueva migración
- `npm run migration:run` - Ejecutar migraciones
- `npm run migration:revert` - Revertir última migración

## 🔒 Reglas de Negocio Implementadas

### Usuarios

- Email único en el sistema
- DNI único en el sistema
- Username único en el sistema
- Contraseñas hasheadas con bcrypt

### Citas Médicas

- Solo se pueden agendar de lunes a viernes
- Horario de atención: 8:00 AM - 6:00 PM
- No se pueden agendar citas en fechas pasadas
- Las citas solo pueden cancelarse hasta el día anterior
- Un usuario no puede tener dos citas activas a la misma hora y fecha

## 🚨 Manejo de Errores

El sistema incluye manejo robusto de errores:

- Validación de DTOs con class-validator
- Respuestas de error consistentes
- Logging de errores en consola
- Códigos de estado HTTP apropiados

## 🔧 Desarrollo

Para desarrollo, el proyecto incluye:

- Hot reload con nodemon
- Compilación automática de TypeScript
- Validación estricta de tipos
- Decoradores habilitados para TypeORM

## 📊 Monitoreo

El proyecto incluye un endpoint de salud:

- `GET /test` - Verifica que el servidor esté funcionando

## 🤝 Contribución

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo LICENSE para detalles.
