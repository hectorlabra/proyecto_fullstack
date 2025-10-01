# Contribuir al Sistema de Gestión de Turnos

¡Gracias por considerar contribuir a este proyecto! Este es un proyecto de portfolio que muestra habilidades de desarrollo full-stack con Node.js, TypeScript, React y PostgreSQL.

## 📋 Tabla de Contenidos

- [Cómo Contribuir](#cómo-contribuir)
- [Configuración de Desarrollo](#configuración-de-desarrollo)
- [Estándares de Código](#estándares-de-código)
- [Guías de Commits](#guías-de-commits)
- [Proceso de Pull Request](#proceso-de-pull-request)
- [Reportar Problemas](#reportar-problemas)

## 🤝 Cómo Contribuir

Las contribuciones son bienvenidas en las siguientes áreas:

1. **Corrección de Bugs**: Reportar y corregir bugs que encuentres
2. **Mejoras de Funcionalidades**: Proponer e implementar nuevas características
3. **Documentación**: Mejorar o expandir la documentación existente
4. **Calidad de Código**: Refactorización, optimización, cobertura de tests
5. **Seguridad**: Reportar vulnerabilidades o mejorar prácticas de seguridad

## 🚀 Configuración de Desarrollo

### Prerequisitos

- Node.js 18+ y npm
- PostgreSQL 12+
- Git

### Configuración Local

1. **Hacer fork y clonar el repositorio**:

   ```bash
   git clone https://github.com/TU_USUARIO/proyecto_fullstack.git
   cd proyecto_fullstack
   ```

2. **Configuración del backend**:

   ```bash
   cd back
   npm install
   cp .env.example .env
   # Configurar tu .env con credenciales locales de PostgreSQL
   npm run start
   ```

3. **Configuración del frontend** (en una nueva terminal):

   ```bash
   cd front
   npm install
   npm run dev
   ```

4. **Configuración de la base de datos**:

   ```bash
   # Crear base de datos en PostgreSQL
   createdb appointments_db

   # Ejecutar seed (opcional)
   cd back
   npm run seed
   ```

5. **Verificar configuración**:
   - Backend: `http://localhost:3000/health`
   - Frontend: `http://localhost:5173`

## 📝 Estándares de Código

### Backend (TypeScript/Node.js)

- **Guía de Estilo**: Seguir los patrones de código existentes
- **Seguridad de Tipos**: Usar modo estricto de TypeScript, evitar `any`
- **Nomenclatura**:
  - Archivos: `camelCase.ts` para servicios, `PascalCase.entity.ts` para entidades
  - Clases: `PascalCase`
  - Funciones/variables: `camelCase`
  - Constantes: `UPPER_SNAKE_CASE`
- **DTOs**: Usar decoradores de class-validator para toda validación de entrada
- **Manejo de Errores**: Usar bloques try-catch y retornar errores significativos

### Frontend (React/JavaScript)

- **Guía de Estilo**: Seguir las mejores prácticas de React
- **Estructura de Componentes**:
  - Componentes funcionales con hooks
  - PropTypes o TypeScript para chequeo de tipos (futuro)
- **Nomenclatura**:
  - Componentes: `PascalCase.jsx`
  - Utilidades: `camelCase.js`
  - Estilos: Coincidir con nombre de componente `Componente.css`
- **Gestión de Estado**: Usar Context API para estado global
- **Estilos**: Archivos CSS específicos por componente

### General

- **Linting**: Ejecutar ESLint antes de hacer commit
  ```bash
  npm run lint
  ```
- **Formateo**: Mantener indentación consistente (2 espacios)
- **Comentarios**: Agregar comentarios para lógica compleja, evitar comentarios obvios
- **Variables de Entorno**: Nunca hacer commit de archivos `.env`

## 📦 Guías de Commits

Seguir el formato de [Conventional Commits](https://www.conventionalcommits.org/):

```
<tipo>(<alcance>): <asunto>

[cuerpo opcional]

[pie opcional]
```

### Tipos

- `feat`: Nueva funcionalidad
- `fix`: Corrección de bug
- `docs`: Cambios en documentación
- `style`: Cambios de estilo de código (formato, sin cambio de lógica)
- `refactor`: Refactorización de código
- `test`: Agregar o actualizar tests
- `chore`: Tareas de mantenimiento (deps, config)

### Ejemplos

```
feat(users): agregar endpoint de verificación de email

fix(appointments): resolver problema de parseo de fecha en UTC

docs(readme): actualizar instrucciones de despliegue

refactor(auth): extraer lógica de bcrypt a servicio separado
```

## 🔄 Proceso de Pull Request

1. **Crear una rama de funcionalidad**:

   ```bash
   git checkout -b feat/nombre-tu-funcionalidad
   ```

2. **Hacer tus cambios**:

   - Escribir código claro y conciso
   - Agregar comentarios donde sea necesario
   - Actualizar documentación si es necesario

3. **Probar tus cambios**:

   - Verificar que los endpoints del backend funcionen
   - Probar interacciones del frontend
   - Verificar errores en consola

4. **Hacer commit de tus cambios**:

   ```bash
   git add .
   git commit -m "feat(alcance): tu mensaje descriptivo"
   ```

5. **Push a tu fork**:

   ```bash
   git push origin feat/nombre-tu-funcionalidad
   ```

6. **Abrir un Pull Request**:

   - Proporcionar título y descripción claros
   - Referenciar issues relacionados
   - Incluir capturas de pantalla para cambios de UI
   - Explicar las pruebas realizadas

7. **Revisión del PR**:
   - Atender el feedback de los revisores
   - Mantener discusiones profesionales y constructivas
   - Hacer los cambios solicitados prontamente

## 🐛 Reportar Problemas

### Reportes de Bugs

Al reportar bugs, incluir:

1. **Descripción**: Resumen claro del problema
2. **Pasos para Reproducir**:
   ```
   1. Ir a '...'
   2. Hacer clic en '...'
   3. Ver error
   ```
3. **Comportamiento Esperado**: Qué debería suceder
4. **Comportamiento Real**: Qué sucede realmente
5. **Entorno**:
   - SO: [ej. macOS 13]
   - Versión de Node: [ej. 18.16.0]
   - Navegador: [ej. Chrome 115]
6. **Capturas de Pantalla**: Si aplica
7. **Contexto Adicional**: Logs, mensajes de error, etc.

### Solicitudes de Funcionalidades

Al proponer funcionalidades, incluir:

1. **Declaración del Problema**: ¿Qué problema resuelve esto?
2. **Solución Propuesta**: ¿Cómo lo implementarías?
3. **Alternativas Consideradas**: Otros enfoques que has pensado
4. **Impacto**: ¿Quién se beneficia y cómo?

## 🔒 Vulnerabilidades de Seguridad

**No abras issues públicos para vulnerabilidades de seguridad.**

En su lugar, envía un email a: [tu-email@example.com] con:

- Descripción de la vulnerabilidad
- Pasos para reproducir
- Impacto potencial
- Corrección sugerida (si hay alguna)

## 📚 Recursos Adicionales

- [Arquitectura del Proyecto](./docs/architecture.md)
- [Ejemplos de API](./docs/api-examples.md)
- [Especificación OpenAPI](./citas_fullstack/specs/001-profesionalizacion-proyecto/contracts/openapi.yaml)

## 📄 Licencia

Al contribuir, aceptas que tus contribuciones serán licenciadas bajo la Licencia MIT.

## 🙏 ¡Gracias!

Tus contribuciones hacen este proyecto mejor para todos. ¡Gracias por tomarte el tiempo de contribuir!

---

**¿Preguntas?** No dudes en abrir una discusión o contactar vía issues.
