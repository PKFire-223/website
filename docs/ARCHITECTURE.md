# Architectural Specification & Modular Structure (Planora LMS v1.5.0)

This document outlines the architectural principles, folder taxonomy, security guidelines, and resilience strategies powering the Planora Personal LMS platform.

---

## 1. Architectural Philosophy & Principles

Planora enforces two core software engineering standards:
1. **Separation of Concerns (SoC)**: Complete decoupling between user presentation (`src/`), server-side business domain execution (`server/`), and persistence models (`server/models/`).
2. **Single Responsibility Principle (SRP)**: Each feature and API module handles strictly one bounded context (e.g. `auth` manages credentials and tokens, `courses` manages syllabus and grades, `timetable` manages weekly calendar blocks).

---

## 2. Directory Structure & Domain Rules

```text
planora/
├── docs/                               # Architectural & API design documentation
│   ├── ARCHITECTURE.md                 # System architecture, SoC rules, and project tree
│   ├── API_SPEC.md                     # RESTful API endpoints and payload specifications
│   └── DATABASE_SCHEMA.md              # MongoDB collections and Mongoose models
│
├── server/                             # Backend source code (Node.js + Express 5 + TypeScript)
│   ├── config/
│   │   └── db.ts                       # Dual-mode persistence: MongoDB & In-Memory Store
│   ├── errors/
│   │   └── apiError.ts                 # Standardized operational error classes (400, 401, 403, 404, 500)
│   ├── middlewares/
│   │   └── errorHandler.ts             # Centralized global error handling & auto error-logging
│   ├── models/                         # Mongoose ODM schemas (isolated & strict)
│   │   ├── course.model.ts             # Courses collection
│   │   ├── error.model.ts              # Error logs collection
│   │   ├── goal.model.ts               # Goals & habit tracking collection
│   │   ├── note.model.ts               # Markdown notes collection
│   │   ├── task.model.ts               # Tasks & deadlines collection
│   │   ├── timetable.model.ts          # Timetable schedule collection
│   │   └── user.model.ts               # User credentials & RBAC profiles collection
│   ├── modules/                        # Domain-driven RESTful feature modules
│   │   ├── ai/                         # Google Gemini AI study assistant (ai.routes.ts)
│   │   ├── auth/                       # Sign in, register, JWT, password reset (auth.routes.ts)
│   │   ├── courses/                    # Course CRUD & syllabi (course.routes.ts)
│   │   ├── errors/                     # Error report triage & audit (errorLog.routes.ts)
│   │   ├── goals/                      # KPI goals & study timer (goal.routes.ts)
│   │   ├── notes/                      # Markdown notes management (note.routes.ts)
│   │   ├── sync/                       # 5-minute auto-save & DB backups (sync.routes.ts)
│   │   ├── tasks/                      # Kanban tasks & AI subtask decomposition (task.routes.ts)
│   │   ├── timetable/                  # Timetable scheduling (managed via routes.ts)
│   │   └── upload/                     # File attachments & material uploads (upload.routes.ts)
│   ├── seed/                           # Independent, decoupled seed assets
│   │   ├── sampleData.json             # Decoupled seed JSON (can be safely deleted post-seed)
│   │   └── seedRunner.ts               # CLI database seeder script (npm run seed)
│   ├── services/
│   │   └── emailService.ts             # Nodemailer OTP email transmission service
│   ├── types/
│   │   └── index.ts                    # Backend TypeScript interfaces
│   ├── utils/
│   │   └── passwordValidator.ts        # Server-side password security verification
│   └── routes.ts                       # Master API router uniting all submodules
│
├── src/                                # Frontend source code (React 19 + TypeScript + Tailwind CSS v4)
│   ├── components/                     # Reusable global layout & UI primitives
│   │   ├── common/                     # Brand logo, button, badges, theme toggle
│   │   ├── layout/                     # Sidebar, Header, UserMenu, NotificationPopover
│   │   └── modals/                     # Common dialogs and confirmation modals
│   ├── context/                        # Cross-cutting React state contexts
│   │   ├── AuthContext.tsx             # User session, JWT tokens, RBAC roles
│   │   ├── LanguageContext.tsx         # Bilingual internationalization (EN / VI)
│   │   ├── ThemeContext.tsx            # Dark / Light theme provider
│   │   └── ToastContext.tsx            # Global feedback notifications
│   ├── features/                       # Feature-Driven modular views (Self-contained)
│   │   ├── admin/                      # Admin user management & privilege control
│   │   ├── ai/                         # Interactive Gemini AI academic assistant
│   │   ├── auth/                       # Split-screen login, register, OTP reset
│   │   ├── courses/                    # Course list, syllabus modal, grade weights
│   │   ├── dashboard/                  # KPI overview, study streak, hours analytics
│   │   ├── errorReports/               # Centralized system diagnostic & error reporter
│   │   ├── goals/                      # Milestones & Pomodoro study timer
│   │   ├── landing/                    # Public showcase landing page
│   │   ├── notes/                      # Markdown notes editor & tag categorizer
│   │   ├── notifications/              # Central notifications management center
│   │   ├── profile/                    # User profile details & preferences
│   │   ├── settings/                   # Platform configurations
│   │   ├── tasks/                      # Kanban tasks board & AI task decomposition
│   │   └── timetable/                  # Interactive weekly schedule grid
│   ├── services/
│   │   └── api.ts                      # Client-side HTTP API client with auth tokens
│   ├── utils/
│   │   ├── courseTimetableSync.ts      # Bi-directional course-timetable schedule sync
│   │   └── passwordValidator.ts        # Client-side real-time password verification
│   ├── types.ts                        # Shared frontend TypeScript declarations
│   ├── App.tsx                         # Root router & application view coordinator
│   └── main.tsx                        # Browser entry point
│
├── .env.example                        # Comprehensive environment configuration template
├── package.json                        # Dependencies, version (1.5.0), and scripts
├── server.ts                           # Full-stack Node.js server integrating Vite
└── vite.config.ts                      # Vite build pipeline and Tailwind CSS integration
```

---

## 3. Dedicated Subsystem Guidelines

### 3.1. Error Management & Diagnostics (`server/errors/`, `server/middlewares/`, `src/features/errorReports/`)
- All operational errors inherit from `ApiError`.
- Any unhandled exception is caught by `errorHandler.ts`, automatically recorded into the `error_logs` collection, and returns a sanitized JSON response:
  ```json
  {
    "success": false,
    "message": "User-facing message",
    "code": "INTERNAL_SERVER_ERROR",
    "timestamp": "2026-10-15T08:15:00.000Z"
  }
  ```
- Administrators can review, diagnose, and mark errors as `resolved` via the UI in `src/features/errorReports`.

### 3.2. Authentication, Roles & Security (`server/modules/auth/`, `server/utils/passwordValidator.ts`, `src/utils/passwordValidator.ts`)
- **Role-Based Access Control (RBAC)**: Distinguishes between `admin` and `student` roles.
- **Strict Password Policy**:
  - Minimum 8 characters.
  - At least 1 uppercase letter (`A-Z`).
  - At least 1 numerical digit (`0-9`).
  - At least 1 special symbol (`@`, `#`, `$`, `%`, `!`, `*`).
- **Real OTP Email Recovery**:
  - Employs `nodemailer` to dispatch 6-digit numeric OTPs.
  - Automatically provisions an Ethereal mail testing account in development with zero external configuration needed.

### 3.3. Database Seeding & Resilient In-Memory Fallback (`server/seed/`, `server/config/db.ts`)
- **Resilient Fallback**: If `MONGODB_URI` is not supplied or MongoDB is offline, `server/config/db.ts` automatically runs an `InMemoryStore`. All routes continue functioning seamlessly without crashing.
- **Decoupled Data**: All initial mock courses, tasks, and users live in `server/seed/sampleData.json`. It is loaded dynamically with `fs.existsSync` so developers can delete the sample file after seeding without introducing compilation errors.
- **One-Click Seeding**: Execute `npm run seed` in terminal or send `POST /api/seed` to upsert sample records into MongoDB.
