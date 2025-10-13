# Arquitectura del Sistema de Gestión de Turnos Médicos

## 🏗️ Visión General

Este proyecto implementa una **arquitectura limpia de tres capas** con separación clara de responsabilidades entre frontend, backend y base de datos. El sistema sigue principios **SOLID** y patrones de diseño **MVC** para mantener el código mantenible y escalable.

## 📊 Diagrama de Arquitectura General

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         🌐 CAPA DE PRESENTACIÓN                          │
│                                                                          │
│  ┌────────────────────────────────────────────────────────────────┐    │
│  │                     React SPA (Vite)                            │    │
│  │  • React 19 + Context API (estado global)                      │    │
│  │  • React Router DOM 7 (enrutamiento cliente)                   │    │
│  │  • Axios (cliente HTTP con interceptores)                      │    │
│  │  • ErrorBoundary (manejo de errores UI)                        │    │
│  │  • WCAG 2.1 AA (accesibilidad)                                 │    │
│  └────────────────────┬───────────────────────────────────────────┘    │
└─────────────────────────┼────────────────────────────────────────────────┘
                         │
                    HTTPS/REST API
                    (JSON Payloads)
                         │
┌────────────────────────┼─────────────────────────────────────────────────┐
│                        ⚙️ CAPA DE LÓGICA DE NEGOCIO                      │
│  ┌─────────────────────▼──────────────────────────────────────────┐    │
│  │              Node.js/TypeScript Backend (Express)              │    │
│  │                                                                 │    │
│  │  🛡️ Middleware Stack:                                          │    │
│  │    • helmet (headers de seguridad)                            │    │
│  │    • compression (gzip responses)                             │    │
│  │    • cors (allowlist configurada)                             │    │
│  │    • express-rate-limit (protección DDoS)                     │    │
│  │    • pino-http (logging estructurado)                         │    │
│  │    • class-validator (validación DTOs)                        │    │
│  │    • error handler global (respuestas consistentes)           │    │
│  │                                                                 │    │
│  │  🎯 Arquitectura MVC:                                          │    │
│  │    Routes → Controllers → Services → Repositories             │    │
│  │                                                                 │    │
│  │  📦 Tecnologías:                                               │    │
│  │    • Express 5 (web framework)                                │    │
│  │    • TypeORM 0.3.x (ORM con decoradores)                      │    │
│  │    • bcrypt (hash de contraseñas con salt)                    │    │
│  │    • zod (validación de env vars)                             │    │
│  └────────────────────┬────────────────────────────────────────── │    │
└─────────────────────────┼────────────────────────────────────────────────┘
                         │
                    SQL/TCP con SSL
                 (TypeORM Query Builder)
                         │
┌────────────────────────┼─────────────────────────────────────────────────┐
│                        💾 CAPA DE PERSISTENCIA                           │
│  ┌─────────────────────▼──────────────────────────────────────────┐    │
│  │                PostgreSQL 12+ (Relacional)                      │    │
│  │                                                                 │    │
│  │  📋 Esquema:                                                    │    │
│  │    • users (datos de usuario)                                  │    │
│  │    • credentials (autenticación)                               │    │
│  │    • appointments (gestión de turnos)                          │    │
│  │                                                                 │    │
│  │  🔗 Relaciones:                                                 │    │
│  │    • User ⇄ Credential (1:1 con CASCADE)                       │    │
│  │    • User ⇄ Appointment (1:N con CASCADE)                      │    │
│  │                                                                 │    │
│  │  🚀 Gestión:                                                    │    │
│  │    • Migraciones TypeORM (control de versiones)               │    │
│  │    • Índices en FKs para performance                           │    │
│  │    • synchronize: false en producción                          │    │
│  └────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────┘
```

## 🏛️ Arquitectura del Backend (Patrón MVC + Services)

### Estructura de Carpetas

```
back/src/
├── index.ts              # ⚠️ Deprecated - usar server.ts
├── server.ts             # ✅ Punto de entrada (graceful shutdown)
├── app.ts                # ✅ Configuración de Express app
├── data-source.ts        # Configuración TypeORM + migraciones
│
├── config/
│   ├── envs.ts           # Validación env vars con Zod
│   ├── logger.ts         # Logger Pino estructurado
│   └── swagger.ts        # Configuración OpenAPI/Swagger
│
├── entities/             # 🗄️ Modelos de datos (TypeORM)
│   ├── User.entity.ts
│   ├── Credential.entity.ts
│   └── Appointment.entity.ts
│
├── dtos/                 # ✅ Data Transfer Objects (validación)
│   ├── users/
│   │   └── create-user.dto.ts
│   ├── credentials/
│   │   └── login.dto.ts
│   └── appointments/
│       ├── create-appointment.dto.ts
│       └── update-appointment.dto.ts
│
├── controllers/          # 🎮 Manejadores de peticiones HTTP
│   ├── usersController.ts
│   └── appointmentsController.ts
│
├── services/             # 💼 Lógica de negocio
│   ├── usersService.ts
│   ├── credentialsService.ts
│   └── appointmentsService.ts
│
├── middlewares/          # 🛡️ Middleware personalizados
│   ├── validation.middleware.ts
│   ├── error.middleware.ts      # ✅ Error handler global
│   └── requestId.middleware.ts  # ✅ Correlación de requests
│
├── routes/               # 🛣️ Definición de endpoints
│   ├── index.ts          # Router principal
│   ├── usersRouter.ts
│   └── appointmentsRouter.ts
│
├── migrations/           # 📦 Migraciones de BD (versionadas)
│   └── 1730480000000-InitialSchema.ts
│
└── scripts/
    └── seed-database.ts  # 🌱 Datos iniciales para demo
```

### 🔄 Flujo de una Petición HTTP

```
1️⃣ Cliente HTTP
   ↓
2️⃣ Middleware Stack (app.ts)
   ├─ helmet (security headers)
   ├─ compression (gzip)
   ├─ cors (allowlist)
   ├─ express-rate-limit (100 req/15min)
   ├─ pino-http (logging con request-id)
   └─ express.json()
   ↓
3️⃣ Router (routes/*)
   └─ Endpoint específico (/users/register, /appointments/schedule, etc.)
   ↓
4️⃣ Validation Middleware
   └─ class-validator (DTOs) → 400 si falla
   ↓
5️⃣ Controller (controllers/*)
   └─ Parsea req, llama service, formatea response
   ↓
6️⃣ Service (services/*)
   └─ Lógica de negocio + validaciones
   ↓
7️⃣ Repository/Entity (TypeORM)
   └─ Query Builder → SQL preparado
   ↓
8️⃣ PostgreSQL
   └─ Ejecuta query transaccional
   ↓
9️⃣ Response
   ├─ 2xx (éxito) → JSON con datos
   ├─ 4xx (error cliente) → { error: "mensaje" }
   └─ 5xx (error servidor) → log + mensaje genérico
   ↓
🔟 Logger (Pino)
   └─ Structured JSON log con request-id, statusCode, latencia
```

## 🎨 Arquitectura del Frontend

### Estructura de Carpetas

```
front/src/
├── main.jsx              # ✅ Punto de entrada (ReactDOM.render)
├── App.jsx               # ✅ Router principal + rutas
│
├── views/                # 📄 Componentes a nivel de página
│   ├── Home.jsx          # Landing page
│   ├── Login.jsx         # Autenticación
│   ├── Register.jsx      # Registro de usuario
│   ├── MisCitas.jsx     # Lista de citas del usuario
│   └── CreateAppointment.jsx  # Formulario nueva cita
│
├── components/           # 🧩 Componentes UI reutilizables
│   ├── Navbar.jsx        # Navegación principal
│   ├── AppointmentCard.jsx    # Card individual de cita
│   ├── EmptyAppointments.jsx  # Estado vacío
│   └── ErrorBoundary.jsx      # ✅ Manejo de errores global
│
├── context/              # 🌐 React Context (estado global)
│   └── UserContext.jsx   # Auth + appointments state
│
├── hooks/                # 🪝 Custom hooks
│   └── useUser.js        # Hook para acceder a UserContext
│
├── helpers/              # 🛠️ Funciones utilitarias
│   └── myAppointments.js # Transformaciones de datos
│
├── config/               # ⚙️ Configuración
│   └── api.js            # ✅ Validación de API_URL
│
└── styles/               # 🎨 CSS por componente
    ├── accessibility.css # ✅ WCAG 2.1 AA compliance
    ├── Home.css
    ├── Login.css
    └── ...
```

### 🔄 Flujo de Navegación

```
1️⃣ Usuario accede a URL
   ↓
2️⃣ React Router (App.jsx)
   └─ Match ruta → Componente View
   ↓
3️⃣ View Component (e.g., MisCitas)
   ├─ useEffect → llama Context API
   └─ UserContext.refreshAppointments()
   ↓
4️⃣ UserContext (estado global)
   ├─ fetch(API_URL/appointments)
   └─ Actualiza state con reducer
   ↓
5️⃣ Re-render con nuevos datos
   └─ Renderiza AppointmentCards
   ↓
6️⃣ ErrorBoundary (si hay error)
   └─ Muestra UI de fallback elegante
```

### 🌐 Gestión de Estado (Context API)

```javascript
UserContext Provider
├── State:
│   ├── user: { id, firstName, lastName, email, ... }
│   ├── userAppointments: Appointment[]
│   ├── isLoading: boolean
│   ├── error: string | null
│   └── isAuthenticated: boolean
│
├── Actions:
│   ├── login(credentials)
│   ├── logout()
│   ├── createAppointment(data)
│   ├── cancelAppointment(id)
│   └── refreshAppointments()
│
└── Persistence:
    └── localStorage.setItem('user', JSON.stringify(userData))
```

## 💾 Modelo de Datos (PostgreSQL)

### Diagrama ER (Entity-Relationship)

```
┌─────────────────────────┐         ┌──────────────────────────┐
│         User            │         │      Credential          │
├─────────────────────────┤         ├──────────────────────────┤
│ 🔑 id (PK)              │◄───────►│ 🔑 id (PK)               │
│ firstName               │   1:1   │ username (UNIQUE)        │
│ lastName                │         │ passwordHash             │
│ 📧 email (UNIQUE)       │         │ 🔗 userId (FK, UNIQUE)   │
│ phone                   │         │ createdAt                │
│ dateOfBirth             │         │ updatedAt                │
│ 🆔 nDni (UNIQUE)        │         └──────────────────────────┘
│ createdAt               │
│ updatedAt               │
└────────┬────────────────┘
         │
         │ 1:N (CASCADE DELETE)
         │
         ▼
┌─────────────────────────┐
│      Appointment        │
├─────────────────────────┤
│ 🔑 id (PK)              │
│ date                    │
│ time                    │
│ status (enum)           │  ← 'scheduled' | 'canceled' | 'completed'
│ notes                   │
│ 🔗 userId (FK)          │
│ createdAt               │
│ updatedAt               │
└─────────────────────────┘
```

### 📋 Esquemas de Tablas

#### `users`

| Campo         | Tipo         | Constraints      | Descripción           |
| ------------- | ------------ | ---------------- | --------------------- |
| `id`          | SERIAL       | PRIMARY KEY      | ID auto-incremental   |
| `firstName`   | VARCHAR(100) | NOT NULL         | Nombre del usuario    |
| `lastName`    | VARCHAR(100) | NOT NULL         | Apellido del usuario  |
| `email`       | VARCHAR(255) | UNIQUE, NOT NULL | Email (autenticación) |
| `phone`       | VARCHAR(20)  | NOT NULL         | Teléfono de contacto  |
| `dateOfBirth` | DATE         | NOT NULL         | Fecha de nacimiento   |
| `nDni`        | VARCHAR(20)  | UNIQUE, NOT NULL | Número de DNI         |
| `createdAt`   | TIMESTAMP    | DEFAULT NOW()    | Fecha de creación     |
| `updatedAt`   | TIMESTAMP    | DEFAULT NOW()    | Última modificación   |

#### `credentials`

| Campo          | Tipo         | Constraints                               | Descripción           |
| -------------- | ------------ | ----------------------------------------- | --------------------- |
| `id`           | SERIAL       | PRIMARY KEY                               | ID auto-incremental   |
| `username`     | VARCHAR(50)  | UNIQUE, NOT NULL                          | Nombre de usuario     |
| `passwordHash` | VARCHAR(255) | NOT NULL                                  | Hash bcrypt (salt 10) |
| `userId`       | INTEGER      | FK → users(id), UNIQUE, ON DELETE CASCADE | Relación 1:1 con User |
| `createdAt`    | TIMESTAMP    | DEFAULT NOW()                             | Fecha de creación     |
| `updatedAt`    | TIMESTAMP    | DEFAULT NOW()                             | Última modificación   |

#### `appointments`

| Campo       | Tipo      | Constraints                       | Descripción              |
| ----------- | --------- | --------------------------------- | ------------------------ |
| `id`        | SERIAL    | PRIMARY KEY                       | ID auto-incremental      |
| `date`      | DATE      | NOT NULL                          | Fecha de la cita         |
| `time`      | TIME      | NOT NULL                          | Hora de la cita          |
| `status`    | ENUM      | NOT NULL, DEFAULT 'scheduled'     | Estado de la cita        |
| `notes`     | TEXT      | NULL                              | Notas adicionales        |
| `userId`    | INTEGER   | FK → users(id), ON DELETE CASCADE | Usuario dueño de la cita |
| `createdAt` | TIMESTAMP | DEFAULT NOW()                     | Fecha de creación        |
| `updatedAt` | TIMESTAMP | DEFAULT NOW()                     | Última modificación      |

**Enum `status`**: `'scheduled'`, `'canceled'`, `'completed'`

### 🔗 Relaciones

1. **User ⇄ Credential (1:1)**

   - Un usuario tiene exactamente una credencial
   - `CASCADE DELETE`: Si se elimina el usuario, se elimina la credencial

2. **User ⇄ Appointment (1:N)**
   - Un usuario puede tener múltiples citas
   - `CASCADE DELETE`: Si se elimina el usuario, se eliminan todas sus citas

### 📦 Migraciones

Las migraciones están versionadas en `back/src/migrations/`:

```bash
# Generar nueva migración
npm run migration:generate -- -n DescripcionDelCambio

# Ejecutar migraciones pendientes
npm run migration:run

# Revertir última migración
npm run migration:revert
```

**⚠️ Importante**: En producción, `synchronize: false` está habilitado. Todos los cambios de esquema deben hacerse mediante migraciones.

## 🔌 Endpoints de la API

Ver [📖 Ejemplos de API](../api/api-examples.md) para requests/responses completos con ejemplos de `curl`.

### 🏥 Health & Metadata

| Método | Endpoint   | Descripción                   | Auth |
| ------ | ---------- | ----------------------------- | ---- |
| GET    | `/health`  | Estado del servidor y DB      | No   |
| GET    | `/version` | Versión de la API             | No   |
| GET    | `/docs`    | Documentación Swagger/OpenAPI | No   |

### 👤 Rutas de Usuarios (`/users`)

| Método | Endpoint          | Descripción               | Auth |
| ------ | ----------------- | ------------------------- | ---- |
| GET    | `/users`          | Listar todos los usuarios | No   |
| GET    | `/users/:id`      | Obtener usuario por ID    | No   |
| POST   | `/users/register` | Registrar nuevo usuario   | No   |
| POST   | `/users/login`    | Autenticar usuario        | No   |

### 📅 Rutas de Turnos (`/appointments`)

| Método | Endpoint                   | Descripción             | Auth |
| ------ | -------------------------- | ----------------------- | ---- |
| GET    | `/appointments`            | Listar todos los turnos | No   |
| GET    | `/appointments/:id`        | Obtener turno por ID    | No   |
| POST   | `/appointments/schedule`   | Crear nuevo turno       | No   |
| PUT    | `/appointments/cancel/:id` | Cancelar turno          | No   |

### 📝 Validaciones de Negocio

**Turnos (`/appointments`)**:

- ✅ Solo días laborales (lunes a viernes)
- ✅ Horario de atención: 8:00 AM - 6:00 PM
- ✅ No se pueden agendar citas en fechas pasadas
- ✅ No se pueden tener dos citas activas en la misma fecha/hora
- ✅ Solo se pueden cancelar citas programadas
- ✅ Solo se pueden cancelar hasta el día anterior

**Usuarios (`/users`)**:

- ✅ Email debe ser único y válido
- ✅ DNI debe ser único
- ✅ Username debe ser único (3-50 caracteres)
- ✅ Password mínimo 6 caracteres (hasheado con bcrypt)

## 🔐 Seguridad

### Medidas Implementadas

| Capa                 | Medida              | Implementación           | Descripción                                   |
| -------------------- | ------------------- | ------------------------ | --------------------------------------------- |
| **Passwords**        | Hashing             | bcrypt (salt rounds: 10) | Nunca se almacenan contraseñas en texto plano |
| **CORS**             | Allowlist           | `express-cors`           | Solo dominios aprobados (localhost + Render)  |
| **Headers**          | Security Headers    | `helmet`                 | CSP, HSTS, X-Frame-Options, etc.              |
| **Rate Limiting**    | DDoS Protection     | `express-rate-limit`     | 100 requests/15min por IP                     |
| **Input Validation** | DTOs                | `class-validator`        | Validación de todos los inputs en controllers |
| **SQL Injection**    | Prepared Statements | TypeORM Query Builder    | Escapeo automático de queries                 |
| **Env Vars**         | Validation          | `zod`                    | Validación y tipado de variables de entorno   |
| **Database**         | SSL/TLS             | PostgreSQL SSL           | Conexiones encriptadas en producción          |
| **Logging**          | No Secrets          | Pino redactor            | Nunca loguear passwords o tokens              |
| **Errors**           | Sanitization        | Error handler global     | No exponer stack traces en producción         |

### 🛡️ Configuración de Helmet

```typescript
helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true,
  },
});
```

### 🚦 Rate Limiting

```typescript
rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // máximo 100 requests
  message: "Demasiadas peticiones, intenta nuevamente más tarde",
  standardHeaders: true,
  legacyHeaders: false,
});
```

### 🔒 CORS Allowlist

```typescript
const allowlist = [
  "http://localhost:5173", // Dev frontend
  "https://medical-appointments-web.onrender.com", // Prod frontend
];

cors({
  origin: (origin, callback) => {
    if (!origin || allowlist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("No permitido por CORS"));
    }
  },
  credentials: true,
});
```

## ☁️ Arquitectura de Despliegue (Render)

### Diagrama de Infraestructura

```
                         🌐 Internet
                              │
                ┌─────────────┴─────────────┐
                │                           │
         ┌──────▼──────┐            ┌──────▼────────┐
         │  Frontend   │            │   Backend     │
         │ Static Site │◄──────────►│ Web Service   │
         │             │   HTTPS    │               │
         │ • CDN Edge  │            │ • Node.js VM  │
         │ • Gzip      │            │ • PM2 (?)     │
         │ • _redirects│            │ • Auto-scale  │
         └─────────────┘            └───────┬───────┘
                                            │
                                       SSL/TCP
                                            │
                                    ┌───────▼────────┐
                                    │   PostgreSQL   │
                                    │  Managed DB    │
                                    │                │
                                    │ • Backups      │
                                    │ • Replication  │
                                    │ • Monitoring   │
                                    └────────────────┘
```

### 📊 Configuración por Servicio

#### Frontend (Static Site)

| Config                | Valor                          | Descripción                     |
| --------------------- | ------------------------------ | ------------------------------- |
| **Build Command**     | `npm install && npm run build` | Compila Vite                    |
| **Publish Directory** | `dist`                         | Carpeta de build                |
| **Node Version**      | 22.16.0                        | Especificada en `.node-version` |
| **Environment Vars**  | `VITE_API_URL`                 | URL del backend                 |
| **Auto-Deploy**       | GitHub `main` branch           | Deploy automático en push       |
| **CDN**               | Global Edge Network            | Distribución de contenido       |

#### Backend (Web Service)

| Config               | Valor                                        | Descripción                          |
| -------------------- | -------------------------------------------- | ------------------------------------ |
| **Build Command**    | `npm install --include=dev && npm run build` | Compila TypeScript                   |
| **Start Command**    | `node dist/server.js`                        | Ejecuta JS compilado                 |
| **Node Version**     | 22.16.0                                      | Especificada en package.json engines |
| **Health Check**     | `/health`                                    | Monitoreo automático                 |
| **Environment Vars** | Ver tabla abajo                              | Variables secretas                   |
| **Auto-Deploy**      | GitHub `main` branch                         | Deploy automático en push            |

**Environment Variables (Backend)**:

```bash
NODE_ENV=production
PORT=10000                          # Asignado por Render
DATABASE_URL=postgresql://...       # Provisto por Render
ALLOWED_ORIGINS=https://medical-appointments-frontend.onrender.com,http://localhost:5173
APP_VERSION=1.0.0
ENABLE_RATE_LIMIT=true
```

#### PostgreSQL (Managed Database)

| Config                    | Valor             | Descripción                 |
| ------------------------- | ----------------- | --------------------------- |
| **Version**               | PostgreSQL 12+    | Versión LTS                 |
| **SSL**                   | Required          | TLS en tránsito             |
| **Backups**               | Daily             | Automáticos                 |
| **Connection Pooling**    | Sí                | PgBouncer                   |
| **Internal Database URL** | Usado por backend | Conexión interna optimizada |

### 🔄 Proceso de Deployment

```
1️⃣ Developer pushea a GitHub (branch main)
   ↓
2️⃣ Render detecta push (webhook)
   ↓
3️⃣ Pull código + npm install
   ↓
4️⃣ Build (tsc para backend, vite para frontend)
   ↓
5️⃣ Health check /health (backend)
   ↓
6️⃣ Zero-downtime deploy
   ↓
7️⃣ Notificación de deploy exitoso
```

### 🌍 URLs de Producción

- **Frontend**: https://medical-appointments-web.onrender.com
- **API Backend**: https://medical-appointments-api-hlpv.onrender.com
- **Health Check**: https://medical-appointments-api-hlpv.onrender.com/health
- **API Docs**: https://medical-appointments-api-hlpv.onrender.com/docs

### ⚠️ Limitaciones del Tier Gratuito

- **Spin down después de 15min de inactividad** → Cold start ~30s
- **750 horas de compute/mes** (suficiente para demos)
- **No autoscaling horizontal** (solo 1 instancia)
- **Backups limitados** (1 backup diario, retención 7 días)

## 🎯 Decisiones de Diseño y Trade-offs

### Stack Tecnológico

| Decisión                    | Justificación                                                   | Compromiso                                      |
| --------------------------- | --------------------------------------------------------------- | ----------------------------------------------- |
| **TypeScript en Backend**   | Seguridad de tipos, mejor soporte IDE, menos errores en runtime | Ligeramente más verboso que JavaScript          |
| **TypeORM con Decoradores** | Definiciones limpias de entidades, migraciones robustas         | Curva de aprendizaje ORM                        |
| **React Context API**       | No requiere librerías externas, nativo de React                 | Menos escalable que Redux para apps muy grandes |
| **Render Tier Gratuito**    | Costo $0, auto-deploy, BD gestionada                            | Cold start ~30s, sin autoscaling                |
| **bcrypt para passwords**   | Estándar de industria, resistente a rainbow tables              | Más lento que alternativas (por diseño)         |
| **Pino para logging**       | Performance alto, JSON estructurado                             | Requiere parser para lectura humana             |
| **No JWT aún**              | Implementación inicial más simple                               | Auth básica limitada                            |
| **CORS Allowlist**          | Seguridad por defecto                                           | Requiere configuración por entorno              |

### Patrones de Arquitectura

#### ✅ Aplicados

- **MVC + Services**: Separación clara de responsabilidades
- **Repository Pattern**: Abstracción de acceso a datos con TypeORM
- **DTO Pattern**: Validación y transformación de datos de entrada
- **Dependency Injection**: A través de módulos ES6 y constructores
- **Error Handling Global**: Middleware centralizado para respuestas consistentes
- **Structured Logging**: Logs JSON con correlación por request-id

#### 🚧 Pendientes

- **CQRS**: Command Query Responsibility Segregation (overkill para MVP)
- **Event Sourcing**: Historial de cambios (no requerido aún)
- **Circuit Breaker**: Protección de servicios externos (no hay dependencias externas)

### Compromisos Conocidos

| Limitación                     | Estado Actual                                   | Plan Futuro                                   |
| ------------------------------ | ----------------------------------------------- | --------------------------------------------- |
| **Sin autenticación JWT**      | Login básico con credenciales                   | Implementar JWT + refresh tokens              |
| **Sin autorización por roles** | Todos los usuarios tienen mismos permisos       | Sistema de roles (admin/user)                 |
| **Sin tests automatizados**    | Testing manual                                  | Jest + Supertest (backend), Vitest (frontend) |
| **Sin paginación**             | Todos los endpoints retornan datasets completos | Implementar cursor pagination                 |
| **Sin cache**                  | Queries directas a BD                           | Redis para datos frecuentes                   |
| **Cold start en Render**       | ~30s después de 15min inactividad               | Considerar ping scheduler o tier pago         |

## Mejoras Futuras (Roadmap)

- [ ] Autenticación basada en JWT con refresh tokens
- [ ] Autorización basada en roles (admin/usuario)
- [ ] Tests unitarios y de integración exhaustivos
- [ ] Limitación de tasa de API (express-rate-limit)
- [ ] Logging de peticiones (morgan o winston)
- [ ] Migraciones de base de datos (migraciones TypeORM)
- [ ] Contenedorización con Docker
- [ ] Pipeline CI/CD (GitHub Actions)

---

**Última Actualización**: Octubre 2025  
**Versión**: 1.0.0
