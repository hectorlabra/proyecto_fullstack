# 📅 Sistema de Gestión de Turnos Médicos

> Aplicación web full‑stack (React + Node.js + PostgreSQL) para registrar, autenticar usuarios y gestionar turnos médicos.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue.svg)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-12+-blue.svg)](https://www.postgresql.org/)

---

<!-- Hero mockup: centered, responsive preview (desktop + mobile) -->
<p align="center">
      <picture>
         <!-- high-res / wide screens -->
         <source media="(min-width:1024px)" srcset="assets/mockup-hero.png">
         <!-- fallback image -->
         <img src="assets/mockup-hero.png" alt="Mockup de la aplicación de gestión de turnos médicos en escritorio y móvil" style="max-width:100%;height:auto;border-radius:12px;box-shadow:0 10px 30px rgba(14,20,40,0.25);" />
      </picture>
</p>

## 🌟 Visión / TL;DR

Sistema para:

1. Registro e inicio de sesión de pacientes.
2. Creación, listado y cancelación de turnos médicos.
3. Reglas de negocio (horarios hábiles, no duplicados, cancelación controlada).

Incluye: migraciones, seed, validación, logging estructurado, rate limiting, variables de entorno tipadas, arquitectura documentada y despliegue productivo.

---

## 🛠️ Stack Tecnológico

### Backend

- **Runtime**: Node.js 18+
- **Framework**: Express 5
- **Lenguaje**: TypeScript (strict)
- **ORM**: TypeORM 0.3.x
- **DB**: PostgreSQL 12+
- **Validación DTOs**: class-validator
- **Env Validation**: Zod
- **Hash contraseñas**: bcrypt
- **Logging**: pino / pino-http
- **Rate Limiting**: express-rate-limit
- **Seguridad**: helmet + CORS allowlist

### Frontend

- **Librería**: React 19
- **Build Tool**: Vite 7
- **Router**: React Router DOM 7
- **HTTP**: Axios
- **Estado Global**: Context API + localStorage
- **Accesibilidad**: WCAG 2.1 AA (subset)
- **Estilos**: CSS modular / utilitario

### DevOps y Herramientas

- **Despliegue**: Render (Web Service + Static Site + Managed PostgreSQL)
- **Control de Versiones**: Git + GitHub
- **Linting**: ESLint 9
- **Testing**: Vitest (rules de negocio y helpers)
- **Paquetes**: npm

---

## 🏗️ Arquitectura (Alta Nivel)

```
┌─────────────────┐       HTTPS/REST       ┌──────────────────┐
│  React Frontend │ ◄────────────────────► │  Express Backend │
│   (Vite SPA)    │                        │  (TypeScript)    │
└─────────────────┘                        └────────┬─────────┘
                                                    │ SQL/TCP
                                            ┌───────▼──────────┐
                                            │   PostgreSQL DB  │
                                            │   (TypeORM)      │
                                            └──────────────────┘
```

Patrón **MVC + Services Layer**. Separación clara: Rutas → Controladores → Servicios → Entidades. Validación en DTOs, logging y manejo de errores centralizado.

Ver diagramas completos y modelo relacional en: `docs/architecture/architecture.md`.

---

## 🚀 Ejecución Local

### Prerequisitos

- Node.js 18 o superior
- PostgreSQL 12 o superior
- npm o yarn

### Desarrollo Local

1. **Clonar el repositorio**:

   ```bash
   git clone https://github.com/hectorlabra/proyecto_fullstack.git
   cd proyecto_fullstack
   ```

2. **Configuración del Backend**:

   ```bash
   cd back
   npm install

   # Crear y configurar archivo .env
   cp .env.example .env
   # Editar .env con tus credenciales de PostgreSQL:
   # DB_HOST=localhost
   # DB_PORT=5432
   # DB_USER=tu_usuario
   # DB_PASSWORD=tu_contraseña
   # DB_NAME=appointments_db
   # PORT=3000

   # Iniciar servidor backend
   npm run start
   ```

   El backend correrá en `http://localhost:3000`

3. **Configuración del Frontend** (nueva terminal):

   ```bash
   cd front
   npm install

   # Iniciar servidor de desarrollo
   npm run dev
   ```

   El frontend correrá en `http://localhost:5173`

4. **Base de Datos & Seed**:

```bash
createdb medical_appointments   # o el nombre configurado en .env
cd back
npm run migration:run           # aplica esquema (si no existe)
npm run seed                     # crea datos de ejemplo
```

**Usuarios de ejemplo (seed)**

| Usuario      | Contraseña    | Email                  |
| ------------ | ------------- | ---------------------- |
| john_doe     | password123   | john.doe@email.com     |
| jane_smith   | securepass456 | jane.smith@email.com   |
| mike_johnson | mypassword789 | mike.johnson@email.com |
| sarah_wilson | strongpass321 | sarah.wilson@email.com |
| david_brown  | davidpass654  | david.brown@email.com  |

5. **Verificación**:
   - Backend: http://localhost:3000/health
   - Versión: http://localhost:3000/version
   - Frontend: http://localhost:5173
   - Docs Swagger (si habilitado): http://localhost:3000/docs

### Despliegue (Render)

Guía detallada: `docs/architecture/architecture.md` (sección despliegue).

Producción:

- 🌐 Frontend: https://medical-appointments-frontend.onrender.com
- 🔧 API: https://medical-appointments-api-hlpv.onrender.com
- ❤️ Health: https://medical-appointments-api-hlpv.onrender.com/health
- 📋 Version: https://medical-appointments-api-hlpv.onrender.com/version
- 📚 Swagger: https://medical-appointments-api-hlpv.onrender.com/docs

> Cold start (~30s) tras inactividad (tier gratuito).

### Funcionalidades Principales

| Área            | Funcionalidad                                  | Estado |
| --------------- | ---------------------------------------------- | ------ |
| Auth            | Registro / Login (hash bcrypt)                 | ✅     |
| Turnos          | Crear / Listar / Cancelar                      | ✅     |
| Validaciones    | Horario laboral, no duplicados, fechas futuras | ✅     |
| Infraestructura | Migraciones + Seed                             | ✅     |
| Seguridad       | Helmet, Rate Limit, CORS allowlist             | ✅     |
| Observabilidad  | Health / Version / Logging estructurado        | ✅     |
| UX              | Responsive, Accesible, ErrorBoundary           | ✅     |
| Roadmap         | JWT + Roles + Tests E2E                        | ⏳     |

## 🔐 Variables de Entorno

### Backend (`back/.env`)

```bash
# Configuración de Base de Datos
DB_HOST=localhost
DB_PORT=5432
DB_USER=tu_usuario_db
DB_PASSWORD=tu_contraseña_db
DB_NAME=appointments_db

# Configuración del Servidor
PORT=3000
NODE_ENV=development

# Seguridad (Producción)
ALLOWED_ORIGINS=http://localhost:5173,https://tu-frontend.onrender.com
APP_VERSION=1.0.0
ENABLE_RATE_LIMIT=true
```

Archivo de ejemplo propuesto: `back/.env.example` (ver sección pendientes si aún no existe).

**⚠️ Nunca subir `.env` al repositorio.**

---

## 📸 Demo

Producción: https://medical-appointments-frontend.onrender.com

Puedes iniciar sesión con cualquier usuario del seed (ej. `john_doe` / `password123`).

> Capturas y GIFs serán añadidos posteriormente en `docs/ui/`.

---

## 💡 Decisiones Clave y Compromisos

### Decisiones de Diseño

| Decisión                    | Justificación                                                                     | Compromiso                                      |
| --------------------------- | --------------------------------------------------------------------------------- | ----------------------------------------------- |
| **TypeScript en Backend**   | Seguridad de tipos, mejor soporte IDE, menos errores en tiempo de ejecución       | Levemente más verboso que JavaScript            |
| **TypeORM con Decoradores** | Definiciones limpias de entidades, soporte de migraciones, integración TypeScript | Curva de aprendizaje para patrones ORM          |
| **React Context API**       | No requiere librería externa, característica nativa de React                      | Menos escalable que Redux para apps muy grandes |
| **Render Tier Gratuito**    | Costo $0, auto-deploy desde GitHub, DB administrada                               | Arranque en frío (~30s) después de inactividad  |
| **bcrypt para contraseñas** | Estándar de la industria, resistente a tablas rainbow                             | Más lento que alternativas (por diseño)         |
| **Sin JWT aún**             | Implementación inicial más simple                                                 | Solo auth básica; JWT planificado para v2       |
| **Lista blanca CORS**       | Seguridad limitando orígenes                                                      | Requiere config env por entorno                 |

### Limitaciones Conocidas

- Cobertura de tests limitada (existen tests unitarios de reglas puntuales).
- Sin autenticación basada en tokens (JWT pendiente).
- Sin autorización por roles (v1 todos iguales).
- Sin paginación / filtrado avanzado.
- Sin cache / CDN para API.

---

## 🗺️ Hoja de Ruta

### Fase 1: Funcionalidades Core ✅

- [x] Registro e inicio de sesión de usuarios
- [x] Operaciones CRUD de turnos
- [x] Base de datos PostgreSQL con TypeORM
- [x] SPA React con enrutamiento

### Fase 2: Profesionalización ✅ _(Completado)_

- [x] Documentación del proyecto (arquitectura, ejemplos API)
- [x] Licencia y guías de contribución
- [x] Endpoints de health y version
- [x] Configuración CORS con lista blanca
- [x] Logging estructurado (Pino)
- [x] Despliegue a Render (Backend + Frontend + PostgreSQL)
- [x] README con capturas de pantalla y URLs en vivo
- [x] Migraciones de base de datos implementadas
- [x] Rate limiting configurado
- [x] SPA routing con \_redirects
- [x] Sistema E2E funcionando en producción

### Fase 3: Mejoras 📋 (Planificado)

- [ ] Autenticación JWT (access + refresh)
- [ ] Roles y autorización granular
- [ ] Tests unitarios + integración (80%+ cobertura)
- [ ] Paginación endpoints `/appointments`
- [ ] Refuerzo de manejo de errores (códigos estándar + RFC 7807)
- [ ] OpenAPI contract y generación automática

### Fase 4: Funcionalidades Avanzadas 🔮 _(Futuro)_

- [ ] Notificaciones por email
- [ ] Recordatorios de turnos
- [ ] Integración con calendario
- [ ] Panel de administración
- [ ] Contenedorización con Docker
- [ ] CI/CD con GitHub Actions

---

## 🧪 Evaluación Rápida

### ⚡ Evaluación Rápida (5 minutos)

**Opción 1: Producción (más rápido)**

1. **Verificar backend funcionando** (30 segundos)

   ```bash
   # Health check
   curl https://medical-appointments-api-hlpv.onrender.com/health

   # Version info
   curl https://medical-appointments-api-hlpv.onrender.com/version
   ```

2. **Probar aplicación completa** (3 minutos)

   - Abrir: https://medical-appointments-frontend.onrender.com
   - Login con credenciales demo: `maria.gonzalez` / `Maria123!`
   - Ver turnos existentes
   - Crear nuevo turno
   - Cancelar turno

3. **Revisar documentación** (2 minutos)
   - Arquitectura: [docs/architecture/architecture.md](./docs/architecture/architecture.md)
   - Ejemplos API: [docs/api/api-examples.md](./docs/api/api-examples.md)
   - OpenAPI Docs: https://medical-appointments-api-hlpv.onrender.com/docs

**Opción 2: Local (más control)**

```bash
git clone https://github.com/hectorlabra/proyecto_fullstack.git
cd proyecto_fullstack

# Backend
cd back
npm install
cp .env.example .env   # editar valores
npm run migration:run
npm run seed
npm start              # o npm run dev si se agrega script

# Frontend (nueva terminal)
cd ../front
npm install
npm run dev
```

---

### 🎯 Habilidades Demostradas

<details>
<summary><b>1. 💻 Desarrollo Full-Stack</b></summary>

- ✅ **Backend RESTful API** con TypeScript, Express, TypeORM
- ✅ **Frontend SPA moderno** con React 19, Vite, React Router
- ✅ **Base de datos relacional** con PostgreSQL y migraciones
- ✅ **Integración completa** frontend-backend-database
- ✅ **Gestión de estado** con Context API
- ✅ **Cliente HTTP** con Axios e interceptores

</details>

<details>
<summary><b>2. 🏗️ Arquitectura y Patrones</b></summary>

- ✅ **MVC con Services Layer** - separación clara de responsabilidades
- ✅ **Repository Pattern** - abstracción de acceso a datos
- ✅ **DTO Pattern** - validación y transformación de inputs
- ✅ **Error Handling Global** - middleware centralizado
- ✅ **Dependency Injection** - módulos ES6 y constructores
- ✅ **Structured Logging** - JSON con request-id correlation

</details>

<details>
<summary><b>3. 🔒 Seguridad y Validación</b></summary>

- ✅ **Helmet** - headers HTTP seguros (CSP, HSTS, etc.)
- ✅ **Rate Limiting** - protección anti-DDoS/brute-force
- ✅ **CORS Allowlist** - orígenes permitidos por entorno
- ✅ **bcrypt** - hash de contraseñas con salt
- ✅ **class-validator** - validación exhaustiva de DTOs
- ✅ **Environment Variables** - configuración segura
- ✅ **SQL Injection Prevention** - parametrized queries (TypeORM)

</details>

<details>
<summary><b>4. 📝 Calidad de Código</b></summary>

- ✅ **TypeScript strict mode** - type safety completo
- ✅ **ESLint** - linting y reglas de estilo
- ✅ **Convenciones consistentes** - nomenclatura, estructura
- ✅ **Documentación completa** - README, architecture, API examples
- ✅ **Comentarios útiles** - explicaciones de lógica compleja
- ✅ **Separation of Concerns** - sin acoplamiento

</details>

<details>
<summary><b>5. 🚀 DevOps y Deployment</b></summary>

- ✅ **Git/GitHub** - control de versiones, commits semánticos
- ✅ **Render Deploy** - backend web service + frontend static
- ✅ **PostgreSQL Managed** - base de datos en producción
- ✅ **Environment-based Config** - dev/prod separation
- ✅ **Health Checks** - `/health` y `/version` endpoints
- ✅ **Build Pipeline** - TypeScript compilation, Vite bundle
- ✅ **Database Migrations** - TypeORM migration scripts

</details>

<details>
<summary><b>6. ♿ Accesibilidad y UX</b></summary>

- ✅ **WCAG 2.1 AA** - skip links, foco visible, semántica
- ✅ **Responsive Design** - móvil y desktop
- ✅ **Error Boundaries** - fallback UI para crashes
- ✅ **Loading States** - feedback visual en operaciones async
- ✅ **Keyboard Navigation** - navegación sin mouse
- ✅ **Alt Text** - imágenes accesibles

</details>

---

### ✅ Checklist Técnica (Snapshot)

**Backend (API)**

- [ ] Endpoints RESTful bien diseñados (`/users`, `/appointments`)
- [ ] Validación exhaustiva con DTOs y class-validator
- [ ] Manejo de errores consistente (4xx/5xx)
- [ ] Logging estructurado con Pino
- [ ] Seguridad con helmet, rate-limit, CORS
- [ ] TypeORM entities con relaciones correctas
- [ ] Migraciones de base de datos implementadas
- [ ] Health check y version endpoints

**Frontend (React)**

- [ ] Componentes funcionales con hooks
- [ ] Context API para estado global
- [ ] React Router para navegación SPA
- [ ] Axios con interceptores de error
- [ ] Error Boundaries para manejo de crashes
- [ ] CSS responsive y accesibilidad
- [ ] Loading states y feedback visual

**Database (PostgreSQL)**

- [ ] Diseño normalizado (Users, Credentials, Appointments)
- [ ] Relaciones foreign key correctas
- [ ] Constraints (unique, not null)
- [ ] Índices en campos frecuentes
- [ ] Migraciones versionadas

**DevOps**

- [ ] Deploy en Render funcionando
- [ ] Variables de entorno configuradas
- [ ] CORS entre frontend y backend OK
- [ ] Health checks respondiendo
- [ ] Logs accesibles en Render dashboard

**Documentación**

- [ ] README completo y actualizado
- [ ] Architecture.md con diagramas
- [ ] API examples con curl
- [ ] Comentarios en código complejo
- [ ] Licencia MIT incluida

---

### 📊 Métricas de Calidad

| Métrica                | Valor (Oct 2025)   | Estado          |
| ---------------------- | ------------------ | --------------- |
| Cobertura tests        | Unitaria parcial   | 🟡 Parcial      |
| TypeScript strict      | 100% backend       | ✅ Activo       |
| Endpoints documentados | Usuarios / Turnos  | ✅ Completo     |
| Accesibilidad WCAG     | AA (subset)        | ✅ Implementado |
| Uptime producción      | ~98% (Render free) | ✅ Estable      |
| Tiempo de deploy       | ~3 min (Render)    | ✅ Automático   |
| Headers seguridad      | Helmet completo    | ✅ Configurado  |
| Rate limiting          | 100 req / 15 min   | ✅ Activo       |

---

## 📚 Documentación Relacionada

- **Arquitectura**: `docs/architecture/architecture.md`
- **API Examples**: `docs/api/api-examples.md`
- **Contribución**: `CONTRIBUTING.md`
- **Licencia**: `LICENSE`
- **UI/Accesibilidad**: `docs/ui/`

---

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Por favor lee la [Guía de Contribución](./CONTRIBUTING.md) antes de enviar pull requests.

### Inicio Rápido para Contribuidores

1. Hacer fork del repositorio
2. Crear una rama de funcionalidad (`git checkout -b feat/funcionalidad-increible`)
3. Hacer commit de los cambios (`git commit -m 'feat: agregar funcionalidad increíble'`)
4. Push a la rama (`git push origin feat/funcionalidad-increible`)
5. Abrir un Pull Request

---

## 📄 Licencia

Este proyecto está licenciado bajo la **Licencia MIT** - ver el archivo [LICENSE](./LICENSE) para más detalles.

---

## 👤 Autor

**Héctor Ignacio Labra Barros**

- GitHub: [@hectorlabra](https://github.com/hectorlabra)
- Portfolio: _(enlace por agregar)_

---

## 🌐 English Summary

### Medical Appointments Management System

A **production-ready full-stack web application** for managing medical appointments with user authentication, built using modern technologies and industry best practices.

**Tech Stack**:

- **Backend**: Node.js 18+ • Express 5 • TypeScript 5+ • TypeORM 0.3 • PostgreSQL 12+
- **Frontend**: React 19 • Vite 7 • React Router 7 • Axios • Context API
- **Security**: helmet • bcrypt • express-rate-limit • CORS allowlist • class-validator
- **DevOps**: Render (deployment) • Pino (logging) • Git/GitHub

**Key Features**:

- ✅ RESTful API with comprehensive validation
- ✅ MVC + Services architecture
- ✅ Type-safe backend with TypeScript strict mode
- ✅ Secure password hashing with bcrypt
- ✅ Database migrations with TypeORM
- ✅ WCAG 2.1 AA accessibility (subset)
- ✅ Structured logging with request correlation
- ✅ Production deployment on Render

**Live Demo**: https://medical-appointments-frontend.onrender.com

**Skills Demonstrated**: Full-stack development • Clean architecture • Security best practices • API design • Database modeling • DevOps deployment • Technical documentation

---

**⭐ Si este proyecto te resultó útil, ¡considera dejar una estrella!**

_Última Actualización: Octubre 2025 | Versión 1.0.0_
