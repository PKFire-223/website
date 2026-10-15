# Architecture & Modular Folder Restructuring Plan (v1.5.0)

A comprehensive architectural refinement to ensure zero code conflicts, establish a strict feature-driven folder hierarchy with clean English naming, guarantee dual-mode persistence (MongoDB + in-memory fallback), and provide rich environment configuration guidance.

## User Review & Critical Decisions

> [!IMPORTANT]
> The architectural directions below were aligned via Phase 1 clarification:
> - **Folder Architecture**: Modular feature-based structure with domain separation (`src/features/*` for frontend views and `server/modules/*` for backend domains).
> - **Persistence & Seeding**: Dual-mode resilience where the system boots immediately with in-memory sample data if `MONGODB_URI` is unset, accompanied by an explicit CLI / HTTP seed trigger to populate MongoDB.
> - **Environment Defaults**: Comprehensive `.env.example` with self-documenting comments, safe development presets, and connection troubleshooting.

- **Confirmed Decision 1**: Keep frontend (`src/`) and backend (`server/`) clearly separated at the root level while grouping each feature into self-contained modules (`features/landing`, `features/tasks`, `features/courses`, `modules/auth`, `modules/seed`, `modules/errors`).
- **Confirmed Decision 2**: Ensure zero static imports of seed data so that `sampleData.json` can be loaded or removed without breaking code compilation or deployment.
- **Confirmed Decision 3**: Provide a clean `.env.example` that includes MongoDB Atlas / local connection examples, JWT secrets, Gemini API key, and SMTP mail configuration.

---

## 1. Overview & Core Concept

- **What It Does**: Refines Planora LMS into a modular, production-ready full-stack structure. Guarantees that the app runs smoothly in cloud environments (Cloud Run/Docker) without requiring external MongoDB setup, while enabling seamless database synchronization when a MongoDB connection string is provided.
- **Target Persona**: Students, instructors, and developers who need an intuitive academic workspace and a maintainable, clean code structure for grading, deployment, and open-source contributions.
- **Key Value**: Predictable file organization, zero naming collisions, clean separation between UI components and server logic, automated data seeding, and error diagnostics.

---

## 2. User Experience & Visual Design

- **Key User Flows**:
  1. **Instant Cloud Run Launch**: User boots the server with `npm run dev` or production build. If `.env` is unconfigured, the app logs a clean diagnostic note and mounts the rich in-memory database with pre-populated courses, tasks, and test accounts (`Tester123@gmail.com`).
  2. **Feature-based Navigation**: Clean sidebar navigation routes between Landing (`features/landing`), Academic Courses (`features/courses`), Task Kanban (`features/tasks`), Timetable Planner (`features/timetable`), Gemini AI Tutor (`features/ai`), and System Error Reports (`features/errorReports`).
  3. **One-Click Database Seeding**: Developers can execute `npm run seed` or trigger `POST /api/seed` to instantly push sample data into their MongoDB database.
  4. **Security & Role Validation**: Visual badges and route guards for Administrator vs. Student accounts with client-side real-time password policy validation.

- **Visual Identity & Theme**:
  - *Palette*: Deep slate/neutral foundation (`bg-slate-50 dark:bg-neutral-950`) with vibrant indigo (`text-indigo-600 dark:text-indigo-400`) and cyan accents.
  - *Zero-Pill Discipline*: Plain typographic metadata for course codes, dates, and units without cluttered capsule enclosures.
  - *Theme Adaptability*: Instant transitions between dark and light modes with system preference detection.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Modular Feature-Driven vs. Flat Monorepo**:
  - *Chosen Approach*: Feature-based organization (`src/features/<feature-name>/*` and `server/modules/<module-name>/*`).
  - *Why*: Eliminates context-switching across distant folders while avoiding unnecessary monorepo complexity (`lerna`, `nx`) that slows down Vite and Docker builds.
  - *Alternatives Considered*: Flat `pages/` + `components/` structure was rejected because co-locating modals, hooks, and helpers with their respective features ensures better maintainability.

- **Decision 2: Resilient In-Memory Cache with MongoDB Sync**:
  - *Chosen Approach*: `server/config/db.ts` boots an `InMemoryStore` initialized via safe JSON loading (`server/seed/sampleData.json`). If MongoDB connects, it synchronizes data to RAM and handles writes to both Mongo and memory.
  - *Why*: Allows zero-dependency deployments on preview environments while giving users full persistence when they connect a MongoDB instance.

- **Decision 3: Dedicated Error Diagnostics & Security Modules**:
  - *Chosen Approach*: Isolate system error logging (`server/modules/errors` and `src/features/errorReports`) and security/auth validation (`server/modules/auth` and `server/utils/passwordValidator`).
  - *Why*: Satisfies academic and production criteria for centralized error handling, auditability, and role-based access control.

---

## 4. Technical Architecture & Data Strategy

### System Architecture Diagram

```text
┌────────────────────────────────────────────────────────────────────────┐
│                   Frontend Client (React 19 + Vite 6)                  │
├────────────────────────────────────────────────────────────────────────┤
│ src/                                                                   │
│ ├── components/       # Common shared UI (Button, Logo, Modals)        │
│ ├── context/          # Global state (AuthContext, ThemeContext)       │
│ ├── features/         # Feature-Driven Pages & Components              │
│ │   ├── landing/      # Public Landing Showcase View                   │
│ │   ├── auth/         # Login, Register, OTP Recovery                  │
│ │   ├── dashboard/    # Overview KPIs, Study Streak                    │
│ │   ├── courses/      # Course Cards, Syllabi, Grade Weights           │
│ │   ├── tasks/        # Kanban Board, AI Subtask Generator             │
│ │   ├── timetable/    # Weekly Schedule Grid                           │
│ │   ├── notes/        # Markdown Notes & Tagging                       │
│ │   ├── goals/        # Milestones & Study Timer                       │
│ │   ├── ai/           # Gemini AI Study Tutor Chat                     │
│ │   ├── admin/        # Admin User Management Table                    │
│ │   └── errorReports/ # System Diagnostics & Error Resolution          │
│ ├── services/         # Type-safe API Client (api.ts)                  │
│ └── utils/            # Schedule Sync & Password Checkers              │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ HTTP / RESTful API (JSON)
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                Backend Server (Node.js + Express 5 + tsx)              │
├────────────────────────────────────────────────────────────────────────┤
│ server/                                                                │
│ ├── config/           # Database setup & Memory Cache Store            │
│ ├── errors/           # ApiError definitions (400, 401, 403, 404, 500) │
│ ├── middlewares/      # Global error handler & auth middlewares        │
│ ├── models/           # Mongoose schemas (User, Course, Task, Note)    │
│ ├── modules/          # Business logic REST endpoints                  │
│ │   ├── auth/         # JWT Auth, Register, Password Reset OTP         │
│ │   ├── courses/      # Course CRUD routes                             │
│ │   ├── tasks/        # Tasks & Deadlines routes                       │
│ │   ├── timetable/    # Schedule slots routes                          │
│ │   ├── notes/        # Notes management routes                        │
│ │   ├── goals/        # KPI goals & study hours routes                 │
│ │   ├── ai/           # Google Gemini AI assistant routes              │
│ │   ├── errors/       # Diagnostic error logging routes                │
│ │   └── sync/         # Seed execution & database backup routes        │
│ ├── seed/             # Isolated seed assets & CLI runner              │
│ └── services/         # Email (Nodemailer) & external utilities        │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                    ┌───────────────┴───────────────┐
                    ▼                               ▼
      ┌───────────────────────────┐   ┌───────────────────────────┐
      │     MongoDB Database      │   │   Resilient Memory Store  │
      │  (When MONGODB_URI is set)│   │  (Instant Default Active) │
      └───────────────────────────┘   └───────────────────────────┘
```

### Proposed Directory Layout & Structural Rules
1. **Frontend Rule (`src/features/*`)**:
   - Every major page belongs to a dedicated English-named folder under `src/features/`.
   - Modals and child components specific to that feature live inside that feature's directory.
2. **Backend Rule (`server/modules/*`)**:
   - Each route module manages its own controller and sub-router (`*.routes.ts`).
   - All modules register cleanly into `server/routes.ts`.
3. **Database & Seed Rule (`server/seed/*`)**:
   - `sampleData.json` is completely decoupled: system works whether the file is present or deleted.
   - `seedRunner.ts` provides a clear console report with upsert counts.
4. **Environment Rule (`.env.example`)**:
   - Provides fully documented keys for `PORT`, `MONGODB_URI`, `JWT_SECRET`, `GEMINI_API_KEY`, and `SMTP_*`.

---

## 5. Implementation Roadmap (Post-Approval)

1. **Step 1: Code Verification & Conflict Check**:
   - Verify all route registrations in `server/routes.ts` match frontend `src/services/api.ts`.
   - Ensure zero circular dependencies and verify all imports use relative paths.
2. **Step 2: Environment File (`.env.example`) Enhancement**:
   - Expand `.env.example` with comprehensive inline documentation, fallback explanations, and sample MongoDB Atlas strings.
3. **Step 3: Verification of Seed and Database Fallback**:
   - Ensure `server/config/db.ts` and `server/seed/seedRunner.ts` handle missing credentials gracefully without crashing the server.
4. **Step 4: Final Compilation & Server Dev Restart**:
   - Run `lint_applet` and `compile_applet` to confirm clean builds.
