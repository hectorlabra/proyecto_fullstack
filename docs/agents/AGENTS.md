# Agentes para el Proyecto Fullstack de Gestión de Citas

Este documento lista agentes de IA y herramientas recomendadas para el desarrollo, mantenimiento y consulta futura del proyecto. Basado en el stack tecnológico analizado (Node.js/TypeScript backend con Express/TypeORM/PostgreSQL; React/Vite frontend con Axios/React Router), se incluyen agentes especializados por tecnología. La información se obtiene de Context7 (configurado vía MCP server).

## Backend (Node.js/TypeScript/Express)

### Agentes para Desarrollo General

- **Node.js Assistant**: Ayuda con escritura de código, debugging de APIs y manejo de módulos. Útil para controladores y servicios.

  - Enlace: [Buscar en Context7](https://context7.com/search?q=node.js+assistant)
  - Uso: Generar endpoints REST en Express.

- **TypeScript Coder**: Asiste en tipado fuerte, decoradores y compilación. Ideal para entidades y DTOs.
  - Enlace: [Buscar en Context7](https://context7.com/search?q=typescript+coder)
  - Uso: Crear interfaces y validaciones con class-validator.

### Agentes para Frameworks y Librerías

- **Express Builder**: Configura rutas, middlewares y manejo de errores.

  - Enlace: [Buscar en Context7](https://context7.com/search?q=express+builder)
  - Uso: Implementar middlewares de validación.

- **TypeORM Helper**: Facilita creación de entidades, migraciones y queries.
  - Enlace: [Buscar en Context7](https://context7.com/search?q=typeorm+helper)
  - Uso: Generar migraciones para PostgreSQL.

### Agentes para Seguridad y Validación

- **Authentication Agent**: Maneja login/register y hashing con bcrypt.

  - Enlace: [Buscar en Context7](https://context7.com/search?q=authentication+agent)
  - Uso: Implementar servicios de credenciales.

- **Validation Assistant**: Automatiza DTOs con class-validator.
  - Enlace: [Buscar en Context7](https://context7.com/search?q=validation+assistant)
  - Uso: Validar inputs en controladores.

## Base de Datos (PostgreSQL/TypeORM)

- **PostgreSQL Optimizer**: Ayuda con queries, indexing y troubleshooting.

  - Enlace: [Buscar en Context7](https://context7.com/search?q=postgresql+optimizer)
  - Uso: Optimizar consultas en data-source.ts.

- **SQL Query Builder**: Genera queries complejas para TypeORM.
  - Enlace: [Buscar en Context7](https://context7.com/search?q=sql+query+builder)
  - Uso: Crear relaciones entre User, Credential y Appointment.

## Frontend (React/Vite)

- **React Component Creator**: Construye componentes funcionales y hooks.

  - Enlace: [Buscar en Context7](https://context7.com/search?q=react+component+creator)
  - Uso: Desarrollar vistas como Home.jsx o AppointmentCard.jsx.

- **Vite Dev Assistant**: Configura build, plugins y dev server.
  - Enlace: [Buscar en Context7](https://context7.com/search?q=vite+dev+assistant)
  - Uso: Optimizar vite.config.js.

### Agentes para Integración

- **Axios Handler**: Maneja llamadas HTTP y errores.

  - Enlace: [Buscar en Context7](https://context7.com/search?q=axios+handler)
  - Uso: Integrar API calls en helpers como myAppointments.js.

- **React Router Guide**: Configura navegación SPA.
  - Enlace: [Buscar en Context7](https://context7.com/search?q=react+router+guide)
  - Uso: Agregar rutas en App.jsx.

## Herramientas Generales y DevOps

- **Fullstack Integrator**: Cubre integración backend-frontend.

  - Enlace: [Buscar en Context7](https://context7.com/search?q=fullstack+integrator)
  - Uso: Resolver problemas cross-stack.

- **Testing Agent**: Escribe tests con Jest/Mocha (para agregar en futuro).

  - Enlace: [Buscar en Context7](https://context7.com/search?q=testing+agent)
  - Uso: Crear suites de tests.

- **Linting Optimizer**: Mejora ESLint y calidad de código.

  - Enlace: [Buscar en Context7](https://context7.com/search?q=linting+optimizer)
  - Uso: Configurar eslint.config.js.

- **Package Manager**: Gestiona npm scripts y dependencias.

  - Enlace: [Buscar en Context7](https://context7.com/search?q=package+manager)
  - Uso: Optimizar package.json.

- **Environment Configurer**: Maneja dotenv y variables de entorno.
  - Enlace: [Buscar en Context7](https://context7.com/search?q=environment+configurer)
  - Uso: Configurar .env para DB y API keys.

## Cómo Usar Este Documento

- Consulta Context7 directamente para enlaces actualizados y detalles.
- Integra agentes vía MCP server configurado en `.vscode/settings.json`.
- Actualiza este documento con nuevos agentes a medida que evolucione el proyecto.

Última actualización: 1 de octubre de 2025
