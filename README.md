# PineCraft Website

## Intro
PineCraft Website is the full-stack product surface for user onboarding, authentication, template flows, CRM event collection, and operations APIs. It connects frontend experience with backend business logic and data services. The project is built to support practical team productivity workflows with a clean web interface and scalable service boundaries.

## Team Members
- 張鈞傑 Jun-Jie (Justin) Chang
- 陳宇禎 Cubee Chen
- 蔡仁揚 Jen-Yang (Yang) Tsai
- 吳柏均 Po-Chun Wu
- 陳秉宏 Bing-Hong Chen
- 林祐萱 Yo-Xuan Lin
- 停彭蓮香 Tina Ting

## Project Overview

### Mission
Deliver a reliable web product that converts productivity workflows into clear user journeys, from sign-in and profile setup to template usage and operational analytics.

### Details
- Product type: full-stack web platform for workflow and template operations.
- Operating model: separate frontend and backend services with shared release cadence.
- Product priorities:
  - clear onboarding and UX
  - stable backend APIs
  - measurable CRM signals
  - secure account and session handling
- Business orientation:
  - product-led growth through usable workflows
  - integration-ready architecture for future feature expansion

### Lean Canvas

| Block | Summary |
| --- | --- |
| Problem | Teams and users need integrated workflow tooling but face fragmented apps and inconsistent adoption. |
| Customer Segments | Student teams, creators, small organizations, and project leads needing lightweight but structured operations. |
| Unique Value Proposition | A practical web layer that combines authentication, workflow actions, CRM signals, and template delivery in one system. |
| Solution | React frontend, Express backend, MongoDB persistence, OAuth login, and CRM/event endpoints. |
| Channels | Direct web onboarding, Notion-linked ecosystem traffic, and community-driven product discovery. |
| Revenue Streams | Productized workflow offerings, template-related value, and future premium service layers. |
| Cost Structure | Web hosting, database usage, domain/network services, and ongoing development/support. |
| Key Metrics | Signup completion, active users, conversion actions, retention signals, and API reliability. |
| Unfair Advantage | Combined product + operations perspective with integrated backend and template/workflow context. |

### Product Scope
- Account and session workflows through OAuth.
- User profile and protected page flows.
- Template browsing, creation endpoints, and delivery paths.
- CRM event ingestion for behavior analysis.
- Admin API layer for operational control.
- Email dispatch for user-facing communication.

## Tech Details

### Stack
Frontend:
- React 18
- Vite
- React Router
- Redux Toolkit
- Bootstrap

Backend:
- Node.js 20
- Express
- Mongoose / MongoDB
- Passport (Google OAuth)
- express-session
- CORS and cookie-parser
- Nodemailer

### System Architecture
- Frontend service:
  - route-driven UI for authentication, profile, and template pages
- Backend service:
  - REST endpoints for auth, template, CRM, and admin operations
- Data layer:
  - MongoDB models for users, CRM records, and template records
- Integration layer:
  - OAuth provider integration and email provider integration

### Core Functions
- OAuth login and callback flow.
- Session-based protected route support.
- Profile update and retrieval.
- Template creation and retrieval endpoints.
- CRM event update endpoint.
- Admin user-list and administrative control endpoints.

### API Surface
- /api/auth
  - login/session and profile-related actions
- /api/template
  - template create and get actions
- /api/crm
  - CRM updates
- /api/admin
  - admin-only operations

### Security Baseline
- Environment variable based secret management.
- CORS allowlist support.
- Session middleware and protected routes.
- Recommended hardening for production:
  - strict authorization checks on write endpoints
  - secure cookie/session settings
  - rate limiting and request validation

### Environment Configuration
Backend environment variables:

```env
PORT=5000
FRONTEND_URL=http://localhost:5173
ALLOWED_ORIGINS=http://localhost:5173
MONGO_URI=
ADMIN_TOKEN=
SESSION_SECRET=
JWT_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
EMAIL=
EMAILPASSWORD=
EMAILSENDER=
```

Frontend environment variables:

```env
VITE_API_BASE_URL=http://localhost:5000
VITE_GOOGLE_CLIENT_ID=
```

### Run
Option A: Docker Compose

```bash
docker compose up --build
```

Option B: Manual

```bash
cd backend
npm install
npx nodemon app.js
```

```bash
cd frontend
yarn install
yarn dev
```

### Repository Structure

```text
pinecraft-website/
  backend/
    app.js
    routes/
    controllers/
    models/
    middleware/
    functions/
    config/
  frontend/
    src/
    public/
  docker-compose.yml
```
