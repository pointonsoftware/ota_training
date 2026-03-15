# OTA Training — Vertical Slice Assignment

## Assignment: [OTA-001] Municipal Employee Login

Build a functional login flow connecting a React frontend to a NestJS backend.

**Timebox:** 4 Hours (Recommended)

---

## Project Structure

```
ota_training/
├── frontend/   # React + Vite application
└── backend/    # NestJS application
```

---

## Getting Started

### Prerequisites

- Node.js >= 18
- npm >= 9

### 1. Backend Setup

```bash
cd backend
npm install
npm run start:dev
```

The backend runs on **http://localhost:3000**.

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on **http://localhost:5173**.

---

## Assignment Requirements

### User Story

> As a Municipal Employee (Barangay Official or Dept Head),
> I want to log in using my username and password,
> So that I can access the protected dashboard features.

### Frontend Acceptance Criteria

- [ ] Create a login page at `/login` with:
  - Text input for `username`
  - Password input for `password` (masked characters)
  - A "Sign In" button (disabled if fields are empty)
- [ ] Show a red error message if the backend returns a `401 Unauthorized`
- [ ] Store the returned `accessToken` in `localStorage` on success
- [ ] Redirect the user to `/dashboard` after successful login

### Backend Acceptance Criteria

- [ ] `POST /auth/login` endpoint
- [ ] DTO validation: `username` and `password` must be non-empty strings
- [ ] Mock logic:
  - `admin` / `password123` → HTTP 201 + `{ accessToken: "mock-token-xyz" }`
  - Any other combination → HTTP 401 Unauthorized
- [ ] Must use `auth.controller.ts` and `auth.service.ts`

---

## Hints

- The frontend `fetch` (or `axios`) call should point to `http://localhost:3000/auth/login`.
- NestJS uses `ValidationPipe` with `class-validator` for DTO validation.
- React Router's `useNavigate` hook handles programmatic redirects.
