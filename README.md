# 📅 Sistema de Gestión de Turnos

> Aplicación web full-stack para la gestión de turnos médicos con autenticación de usuarios, construida con tecnologías modernas y mejores prácticas.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue.svg)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-12+-blue.svg)](https://www.postgresql.org/)

---

## 🌟 Visión

Este proyecto demuestra una **aplicación full-stack lista para producción** que incluye:

- Arquitectura limpia con separación de responsabilidades
- Backend con seguridad de tipos usando TypeScript y TypeORM
- Frontend moderno con React y Context API
- Diseño de API RESTful con validación exhaustiva
- Autenticación segura y gestión de contraseñas
- Despliegue profesional en Render (tier gratuito)
- Documentación y calidad de código lista para portfolio

**Caso de Uso**: Sistema de gestión de turnos médicos donde los pacientes pueden registrarse, iniciar sesión, ver sus turnos y agendar/cancelar visitas.

---

## 🛠️ Stack Tecnológico

### Backend

- **Runtime**: Node.js 18+
- **Framework**: Express 5
- **Lenguaje**: TypeScript
- **ORM**: TypeORM 0.3.x
- **Base de Datos**: PostgreSQL 12+
- **Validación**: class-validator
- **Seguridad**: bcrypt (hash de contraseñas)
- **Variables de Entorno**: dotenv

### Frontend

- **Librería**: React 19
- **Herramienta de Build**: Vite 7
- **Enrutador**: React Router DOM 7
- **Cliente HTTP**: Axios
- **Gestión de Estado**: Context API
- **Estilos**: CSS Modules

### DevOps y Herramientas

- **Despliegue**: Render (Web Service + Static Site + PostgreSQL Administrado)
- **Control de Versiones**: Git & GitHub
- **Linting**: ESLint 9
- **Gestor de Paquetes**: npm

---

## 🏗️ Arquitectura

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

**Patrón**: MVC (Modelo-Vista-Controlador) con capa de servicios

- **Modelos**: Entidades TypeORM (User, Credential, Appointment)
- **Controladores**: Manejadores de peticiones HTTP con validación
- **Servicios**: Lógica de negocio y operaciones de base de datos
- **DTOs**: Validación de entrada con class-validator

Para diagramas detallados de arquitectura y modelo de datos, ver [Documentación de Arquitectura](./docs/architecture.md).

---

## 🚀 Cómo Ejecutar

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

4. **Configuración de Base de Datos**:

   ```bash
   # Crear base de datos
   createdb appointments_db

   # Opcional: Poblar con datos de prueba
   cd back
   npm run seed
   ```

5. **Verificar instalación**:
   - Estado del backend: http://localhost:3000/health
   - Frontend: http://localhost:5173
   - Documentación API: http://localhost:3000/docs _(próximamente)_

### Ejecución en Render (Producción)

Ver guía de despliegue en [Quickstart](./citas_fullstack/specs/001-profesionalizacion-proyecto/quickstart.md).

**URLs de Demo** _(se actualizarán después del despliegue)_:

- Frontend: `https://[tu-app].onrender.com`
- API Backend: `https://[tu-api].onrender.com`
- Health Check: `https://[tu-api].onrender.com/health`

---

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

**⚠️ ¡Nunca subas archivos `.env` al control de versiones!**

---

## 📸 Capturas de Pantalla y Demo

_Las capturas se agregarán aquí después de la implementación de UI_

### Funcionalidades Principales

- [ ] Registro de Usuario
- [ ] Inicio de Sesión
- [ ] Panel de Turnos
- [ ] Crear Turno
- [ ] Cancelar Turno

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

- **Sin tests automatizados aún**: Planificado para iteraciones futuras (Jest/Vitest)
- **Manejo de errores básico**: Será mejorado con middleware global de errores
- **TypeORM `synchronize: true` en dev**: Conveniente pero deshabilitado en prod por seguridad
- **Sin autorización por roles**: Todos los usuarios tienen los mismos permisos actualmente
- **Sin paginación**: Todos los endpoints retornan datasets completos (bien para demo pequeña)

---

## 🗺️ Hoja de Ruta

### Fase 1: Funcionalidades Core ✅

- [x] Registro e inicio de sesión de usuarios
- [x] Operaciones CRUD de turnos
- [x] Base de datos PostgreSQL con TypeORM
- [x] SPA React con enrutamiento

### Fase 2: Profesionalización 🚧 _(En Progreso)_

- [x] Documentación del proyecto (arquitectura, ejemplos API)
- [x] Licencia y guías de contribución
- [ ] Endpoints de health y version
- [ ] Configuración CORS con lista blanca
- [ ] Logging estructurado
- [ ] Despliegue a Render
- [ ] README con capturas de pantalla

### Fase 3: Mejoras 📋 _(Planificado)_

- [ ] Autenticación JWT con refresh tokens
- [ ] Autorización basada en roles (admin/usuario)
- [ ] Tests unitarios y de integración (cobertura 80%+)
- [ ] Limitación de tasa de API
- [ ] Flujo de migraciones de base de datos
- [ ] Manejo exhaustivo de errores
- [ ] Interceptores de request/response

### Fase 4: Funcionalidades Avanzadas 🔮 _(Futuro)_

- [ ] Notificaciones por email
- [ ] Recordatorios de turnos
- [ ] Integración con calendario
- [ ] Panel de administración
- [ ] Contenedorización con Docker
- [ ] CI/CD con GitHub Actions

---

## 🧪 Cómo Evaluar Este Proyecto

Este proyecto demuestra las siguientes habilidades:

1. **Desarrollo Full-Stack**:

   - API Backend con TypeScript, Express, TypeORM
   - SPA Frontend con React, React Router, Context API
   - Diseño de base de datos y relaciones (PostgreSQL)

2. **Prácticas de Ingeniería de Software**:

   - Arquitectura limpia (MVC + Servicios)
   - Validación de entrada con DTOs
   - Manejo seguro de contraseñas
   - Configuración basada en entornos
   - CORS y consideraciones de seguridad

3. **Calidad de Código**:

   - TypeScript para seguridad de tipos
   - Convenciones de nomenclatura consistentes
   - Separación de responsabilidades
   - Documentación y comentarios

4. **DevOps y Despliegue**:
   - Control de versiones con Git
   - Gestión de variables de entorno
   - Despliegue en producción (Render)
   - Endpoints de health check

### Checklist de Evaluación Rápida

- [ ] Clonar y ejecutar localmente en <5 minutos
- [ ] Registrar un usuario e iniciar sesión
- [ ] Crear y cancelar un turno
- [ ] Verificar respuestas API en `/health` y `/version`
- [ ] Revisar estructura de código (controladores, servicios, entidades)
- [ ] Leer documentación ([Arquitectura](./docs/architecture.md), [Ejemplos API](./docs/api-examples.md))
- [ ] Verificar despliegue en producción (una vez en vivo)

---

## 📚 Documentación

- **[Visión General de Arquitectura](./docs/architecture.md)**: Diseño detallado del sistema, modelo de datos y decisiones técnicas
- **[Ejemplos de API](./docs/api-examples.md)**: Ejemplos de request/response para todos los endpoints
- **[Guía de Contribución](./CONTRIBUTING.md)**: Cómo contribuir a este proyecto
- **[Licencia](./LICENSE)**: Licencia MIT
- **[Especificación OpenAPI](./citas_fullstack/specs/001-profesionalizacion-proyecto/contracts/openapi.yaml)**: Contrato de API _(próximamente)_

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

## 🌐 Resumen en Inglés

A full-stack appointment management system built with Node.js/TypeScript (backend), React (frontend), and PostgreSQL (database). Features include user authentication, appointment scheduling, and RESTful API design. Deployed on Render with comprehensive documentation. Demonstrates clean architecture, type safety, security best practices, and production-ready deployment.

**Tech**: Express • TypeORM • React • Vite • PostgreSQL • TypeScript • bcrypt • class-validator

---

**⭐ ¡Si este proyecto te ayudó, considera darle una estrella!**

_Última Actualización: Octubre 2025 | Versión 1.0.0_
