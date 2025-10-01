# Arquitectura

## Visión General

Este proyecto sigue una **arquitectura limpia de tres capas** con clara separación entre las capas de frontend, backend y base de datos.

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND (React)                        │
│  - React 19 + Vite 7                                            │
│  - React Router DOM 7 (enrutamiento SPA)                        │
│  - Axios (cliente HTTP)                                         │
│  - Context API (gestión de estado)                             │
└────────────────────────────┬────────────────────────────────────┘
                             │
                          HTTPS/REST
                             │
┌────────────────────────────┴────────────────────────────────────┐
│                      BACKEND (Node.js/TypeScript)               │
│  - Express 5 (framework web)                                    │
│  - TypeORM 0.3.x (ORM)                                          │
│  - bcrypt (hash de contraseñas)                                 │
│  - class-validator (validación de DTOs)                         │
│  - Middleware: CORS, validación, manejo de errores, logging     │
└────────────────────────────┬────────────────────────────────────┘
                             │
                           SQL/TCP
                             │
┌────────────────────────────┴────────────────────────────────────┐
│                      BASE DE DATOS (PostgreSQL)                 │
│  - Tablas: users, credentials, appointments                     │
│  - Relaciones: Uno-a-Uno (User ⇄ Credential)                   │
│                Uno-a-Muchos (User ⇄ Appointments)               │
└─────────────────────────────────────────────────────────────────┘
```

## Arquitectura del Backend (Patrón MVC)

```
src/
├── index.ts              # Punto de entrada de la app (inicialización del servidor)
├── data-source.ts        # Configuración de BD con TypeORM
├── config/
│   └── envs.ts           # Variables de entorno
├── entities/             # Entidades de base de datos (modelos TypeORM)
│   ├── User.entity.ts
│   ├── Credential.entity.ts
│   └── Appointment.entity.ts
├── dtos/                 # Data Transfer Objects (validación)
│   ├── users/
│   ├── credentials/
│   └── appointments/
├── controllers/          # Manejadores de peticiones HTTP
│   ├── usersController.ts
│   └── appointmentsController.ts
├── services/             # Capa de lógica de negocio
│   ├── usersService.ts
│   ├── credentialsService.ts
│   └── appointmentsService.ts
├── middlewares/          # Middlewares de Express
│   └── validation.middleware.ts
└── routes/               # Definición de endpoints de API
    ├── index.ts
    ├── usersRouter.ts
    └── appointmentsRouter.ts
```

### Flujo de Peticiones

```
Petición HTTP
    ↓
Router (routes/)
    ↓
Middleware de Validación (DTOs)
    ↓
Controlador (controllers/)
    ↓
Servicio (services/)
    ↓
Repositorio/Entidad (TypeORM)
    ↓
Base de Datos (PostgreSQL)
```

## Arquitectura del Frontend

```
src/
├── main.jsx              # Punto de entrada de la app
├── App.jsx               # Configuración del router
├── views/                # Componentes a nivel de página
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── MisTurnos.jsx
│   └── CreateAppointment.jsx
├── components/           # Componentes UI reutilizables
│   ├── Navbar.jsx
│   ├── AppointmentCard.jsx
│   └── EmptyAppointments.jsx
├── context/              # React Context (estado global)
│   └── UserContext.jsx
├── hooks/                # React hooks personalizados
│   └── useUser.js
├── helpers/              # Funciones utilitarias
│   └── myAppointments.js
└── styles/               # CSS específico por componente
```

## Modelo de Datos

### Entidades y Relaciones

```
User (users)
├── id (PK)
├── name
├── email (único)
├── birthdate
├── nDni (único)
├── credentialId (FK, único) → Credential
└── appointments[] → Appointment[]

Credential (credentials)
├── id (PK)
├── username (único)
└── password (hasheado con bcrypt)

Appointment (appointments)
├── id (PK)
├── date
├── time
├── status ("active" | "cancelled")
├── description
└── userId (FK) → User
```

## Endpoints de la API

Ver [Ejemplos de API](./api-examples.md) para requests/responses detallados.

### Rutas Core

- `GET /health` - Endpoint de verificación de estado
- `GET /version` - Versión de la API
- `GET /docs` - Documentación OpenAPI

### Rutas de Usuarios (`/users`)

- `GET /users` - Obtener todos los usuarios
- `GET /users/:id` - Obtener usuario por ID
- `POST /users/register` - Registrar nuevo usuario
- `POST /users/login` - Autenticación de usuario

### Rutas de Turnos (`/appointments`)

- `GET /appointments` - Obtener todos los turnos
- `GET /appointments/:id` - Obtener turno por ID
- `POST /appointments/schedule` - Crear nuevo turno
- `PUT /appointments/cancel/:id` - Cancelar turno

## Consideraciones de Seguridad

- **Seguridad de Contraseñas**: Hash con Bcrypt y salt rounds
- **CORS**: Lista blanca configurada para orígenes del frontend
- **Validación de Entrada**: DTOs con class-validator a nivel de controlador
- **Variables de Entorno**: Datos sensibles en `.env` (no commiteado)
- **Base de Datos**: Conexiones SSL en producción (Render)

## Arquitectura de Despliegue (Render)

```
                    ┌─────────────────────┐
                    │ Usuarios (Browser)  │
                    └──────────┬──────────┘
                               │ HTTPS
                ┌──────────────┴──────────────┐
                │                             │
        ┌───────▼──────┐              ┌──────▼────────┐
        │   Frontend   │              │    Backend    │
        │ (Static Site)│──────────────►│ (Web Service) │
        │  Render CDN  │     HTTPS    │  Render VM    │
        └──────────────┘              └───────┬───────┘
                                              │ SSL/TCP
                                      ┌───────▼────────┐
                                      │   PostgreSQL   │
                                      │  (BD Gestionada)│
                                      │     Render     │
                                      └────────────────┘
```

### Configuración Específica por Entorno

| Componente    | Desarrollo              | Producción (Render)               |
| ------------- | ----------------------- | --------------------------------- |
| Frontend      | `localhost:5173` (Vite) | CDN Estático                      |
| Backend       | `localhost:3000`        | Web Service                       |
| Base de Datos | PostgreSQL Local        | PostgreSQL Gestionado             |
| CORS          | `http://localhost:5173` | `https://[frontend].onrender.com` |
| SSL de BD     | Deshabilitado           | Requerido                         |

## Decisiones de Diseño

### ¿Por Qué Este Stack?

1. **TypeScript + Express**: Seguridad de tipos y framework web estándar de la industria
2. **TypeORM**: ORM con entidades basadas en decoradores, migraciones fáciles
3. **PostgreSQL**: Datos relacionales, cumplimiento ACID, listo para producción
4. **React + Vite**: Frontend moderno con HMR rápido y tiempos de build
5. **Render**: Tier gratuito con BD gestionada, auto-deploy desde GitHub

### Compromisos

- **TypeORM `synchronize: true` en dev**: Iteración rápida pero riesgoso en prod (deshabilitado en producción)
- **Sin middleware de autenticación aún**: Login/register básico, sin JWT (mejora futura)
- **Manejo de errores mínimo**: Estructura básica, a mejorar con middleware global de errores
- **Sin testing aún**: Planificado para iteraciones futuras con Jest/Vitest

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
