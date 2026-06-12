# Backend Readonly Prototype API Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:test-driven-development to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add small readonly backend prototype APIs for the frontend mock screens.

**Architecture:** Follow the existing Express health route pattern. Add one prototype route module, one controller module, one service module, and one focused test file. Keep mock data in the service so future database repositories can replace it without changing routes.

**Tech Stack:** Node.js, Express, TypeScript, Vitest, Supertest.

---

## Task 1: RED Tests

**Files:**
- Create: `be/tests/prototype.test.ts`

- [ ] Write tests for:
  - `GET /api/diaries` returns a diary list.
  - `GET /api/diaries/diary-mangwon` returns one diary.
  - `GET /api/diaries/unknown` returns 404.
  - `GET /api/places` returns a place list.
  - `GET /api/rooms/room-ilgi-204` returns one room.
  - `GET /api/rooms/unknown` returns 404.
  - `POST /api/invitations/preview` returns room preview for `IlGI-204`.
  - `POST /api/invitations/preview` returns 400 for blank invite code.
- [ ] Run `cd be && pnpm test`.
- [ ] Confirm tests fail because routes are missing.
- [ ] Commit tests.

## Task 2: GREEN Implementation

**Files:**
- Create: `be/src/services/prototype.service.ts`
- Create: `be/src/controllers/prototype.controller.ts`
- Create: `be/src/routes/prototype.route.ts`
- Modify: `be/src/app.ts`

- [ ] Add typed mock data and lookup functions in service.
- [ ] Add controller functions that map service results to HTTP responses.
- [ ] Add route definitions under `/api`.
- [ ] Mount route in `createApp`.
- [ ] Run `cd be && pnpm test`.
- [ ] Confirm tests pass.
- [ ] Commit implementation.

## Task 3: Verification

**Files:**
- Verify only.

- [ ] Run `cd be && pnpm typecheck`.
- [ ] Run `cd be && pnpm build`.
- [ ] Run `cd be && pnpm test`.
- [ ] If any verification fails, fix with the smallest change and commit.
