<!--
Sync Impact Report
- Version change: N/A → 1.0.0
- Modified principles: New constitution created
- Added sections: Additional Constraints; Development Workflow & Quality Gates
- Removed sections: None
- Templates requiring updates:
	✅ .specify/templates/spec-template.md (validated, no change needed)
	✅ .specify/templates/plan-template.md (validated, no change needed)
	✅ .specify/templates/tasks-template.md (validated, no change needed)
	✅ .github/prompts/constitution.prompt.md (validated, no change needed)
- Follow-up TODOs:
	- TODO(CORS_ALLOWED_ORIGINS): Define allowed origins list for production
	- TODO(OBSERVABILITY_STACK): Select logging/metrics stack (e.g., pino + OpenTelemetry)
-->

# citas_fullstack Constitution

## Core Principles

### I. Tests-First and Contracts-First

All new behavior MUST be driven by tests before implementation (Red → Green →
Refactor). Public API surfaces (HTTP endpoints, events) MUST have a contract
defined first (OpenAPI/contract files + contract tests) before any code.
Acceptance criteria are codified as tests. No endpoint is merged without its
contract and failing test in place.

Rationale: Ensures correctness, enables safe refactors, and aligns frontend and
backend early via explicit contracts.

### II. Single Source of Truth for Data and Validation

Data models and DTOs define the canonical schema. Server-side validation MUST
use class-validator; database migrations MUST derive from TypeORM entities.
Schema duplication across layers is prohibited—frontends integrate via the
published API contracts, not via shared runtime code.

Rationale: Prevents drift between validation, persistence, and API behavior.

### III. Security by Default

Credentials MUST be hashed with bcrypt and never logged. Environment variables
are required for secrets; secrets MUST NOT be committed. CORS MUST be
restrictive in production (allowlist origins). Input validation is mandatory on
all external inputs. Database connections MUST use SSL when required by the
environment.

Rationale: Reduce risk from common attack vectors and configuration mistakes.

### IV. Observability and Error Handling

The backend MUST implement structured logging and normalized error responses.
Distinguish 4xx (client) from 5xx (server) consistently. Add minimal request
logging middleware and capture correlation IDs where applicable. Key operations
should expose lightweight metrics or logs sufficient for triage.

Rationale: Make failures diagnosable with minimal overhead.

### V. Versioning and Simplicity (YAGNI)

Follow Semantic Versioning for contracts and this constitution. Breaking API
changes require deprecation notes and migration guidance. Prefer the simplest
design that satisfies requirements; avoid speculative abstractions and unused
dependencies.

Rationale: Maintain velocity and backward compatibility with clear evolution.

## Additional Constraints & Technology Standards

- Backend: Node.js + TypeScript, Express 5, TypeORM 0.3.x, PostgreSQL, bcrypt,
  class-validator, class-transformer, dotenv, CORS. TypeScript in strict mode
  with decorators enabled.
- Frontend: React 19, React Router DOM 7, Axios, Vite 7, ESLint 9.
- Environment: .env required for DB connectivity and secrets; production must
  set SSL if required by provider.
- Contracts: Prefer OpenAPI v3 for HTTP interfaces. Contract tests live
  alongside contracts and run in CI before implementation.
- Migrations/Seeding: TypeORM migrations are the single source of schema change;
  seeding scripts MUST be idempotent.

## Development Workflow, Review Process, and Quality Gates

1. Specification → Clarification → Plan → Tasks → Implementation.
2. Gates per change:
   - Build: PASS backend (tsc) and frontend (vite build).
   - Lint: PASS ESLint (frontend) and TypeScript checks (backend).
   - Tests: Contract and unit/integration tests MUST run and PASS locally and in CI.
3. Code Review:
   - Verify adherence to principles (tests-first, contracts-first, validation,
     error semantics, logging).
   - Confirm no secrets or sensitive logs.
   - Confirm migrations cover all DB changes.
4. Documentation:
   - Update contracts and quickstart where behavior changes.
   - Note deprecations and migrations in PR description.

## Governance

- This constitution supersedes informal practices. All PRs MUST include a
  checklist referencing these principles.
- Amendments: Propose changes via PR that updates this document with a
  migration/deprecation plan. Version bump rules:
  - MAJOR: Backward-incompatible principle changes or removals.
  - MINOR: New principles/sections or materially expanded guidance.
  - PATCH: Clarifications and non-semantic edits.
- Compliance: Reviewers MUST block changes that violate gates without
  justification in the "Complexity Tracking" section of plans.

**Version**: 1.0.0 | **Ratified**: 2025-10-01 | **Last Amended**: 2025-10-01
