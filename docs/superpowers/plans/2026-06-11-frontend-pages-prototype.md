# Frontend Pages Prototype Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add clickable prototype pages for diary creation, diary detail, wishlist places, share room, and invite flows.

**Architecture:** Build on the #18 frontend home prototype. Add shared layout components for navigation and page headers, then add route-level view components with local mock data. Keep all behavior client-side and avoid API side effects.

**Tech Stack:** Vue 3, TypeScript, Vue Router, Vite, CSS.

---

## File Structure

- Create: `fe/src/components/AppShell.vue`
  - Shared app header, navigation, and page container.
- Create: `fe/src/components/PageHero.vue`
  - Reusable page eyebrow/title/description block.
- Create: `fe/src/components/GlassPanel.vue`
  - Reusable glass card wrapper.
- Modify: `fe/src/views/HomeView.vue`
  - Wrap home content in `AppShell`.
  - Convert CTAs to `RouterLink`.
- Create: `fe/src/views/DiaryCreateView.vue`
  - Mock diary form and preview.
- Create: `fe/src/views/DiaryDetailView.vue`
  - Mock diary detail view.
- Create: `fe/src/views/PlacesView.vue`
  - Mock wishlist/category management view.
- Create: `fe/src/views/RoomView.vue`
  - Mock shared room dashboard.
- Create: `fe/src/views/InviteView.vue`
  - Mock room create/invite code entry view.
- Modify: `fe/src/router/index.ts`
  - Add routes for all new pages.
- Modify: `fe/src/style.css`
  - Add shared layout, form, list, timeline, and responsive page styles.

## Task 1: Shared Layout Components

**Files:**
- Create: `fe/src/components/AppShell.vue`
- Create: `fe/src/components/PageHero.vue`
- Create: `fe/src/components/GlassPanel.vue`

- [ ] **Step 1: Add AppShell**

Create `AppShell.vue` with brand text, room status, profile controls, and RouterLink navigation to `/`, `/diaries/new`, `/diaries/sample`, `/places`, `/rooms/sample`, `/invite`.

- [ ] **Step 2: Add PageHero**

Create `PageHero.vue` with props `eyebrow`, `title`, `description`.

- [ ] **Step 3: Add GlassPanel**

Create `GlassPanel.vue` with a default slot and optional `class` support through standard Vue fallthrough attributes.

- [ ] **Step 4: Commit**

Run:

```bash
git add fe/src/components/AppShell.vue fe/src/components/PageHero.vue fe/src/components/GlassPanel.vue
git commit -m "feat: 주요 페이지 공통 레이아웃 컴포넌트 추가"
```

## Task 2: Router and Home Navigation

**Files:**
- Modify: `fe/src/router/index.ts`
- Modify: `fe/src/views/HomeView.vue`

- [ ] **Step 1: Add route imports and route entries**

Add routes:

- `/diaries/new` -> `DiaryCreateView`
- `/diaries/sample` -> `DiaryDetailView`
- `/places` -> `PlacesView`
- `/rooms/sample` -> `RoomView`
- `/invite` -> `InviteView`

- [ ] **Step 2: Wrap HomeView with AppShell**

Use `<AppShell>` around home content. Replace header markup with the shared shell.

- [ ] **Step 3: Convert home CTAs**

Use `RouterLink` for “오늘 기록 남기기” -> `/diaries/new` and “가고 싶은 곳 추가” -> `/places`.

- [ ] **Step 4: Commit**

Run:

```bash
git add fe/src/router/index.ts fe/src/views/HomeView.vue
git commit -m "feat: 주요 페이지 라우팅과 홈 이동 연결"
```

## Task 3: Diary Pages

**Files:**
- Create: `fe/src/views/DiaryCreateView.vue`
- Create: `fe/src/views/DiaryDetailView.vue`

- [ ] **Step 1: Add DiaryCreateView**

Implement a mock form with date, place, memorable moment, memo, and preview card. Use labels for all fields.

- [ ] **Step 2: Add DiaryDetailView**

Implement sample diary detail with date, place, author, memory text, memo, location card, edit/delete mock buttons, and related place snippets.

- [ ] **Step 3: Commit**

Run:

```bash
git add fe/src/views/DiaryCreateView.vue fe/src/views/DiaryDetailView.vue
git commit -m "feat: 다이어리 작성과 상세 프로토타입 추가"
```

## Task 4: Places and Room Pages

**Files:**
- Create: `fe/src/views/PlacesView.vue`
- Create: `fe/src/views/RoomView.vue`

- [ ] **Step 1: Add PlacesView**

Implement category segmented controls, place cards, mock add form, shared participant indicator, and status badges.

- [ ] **Step 2: Add RoomView**

Implement room title, invite code panel, participant list, shared diary timeline, and shared places preview.

- [ ] **Step 3: Commit**

Run:

```bash
git add fe/src/views/PlacesView.vue fe/src/views/RoomView.vue
git commit -m "feat: 장소 목록과 공유 방 프로토타입 추가"
```

## Task 5: Invite Page

**Files:**
- Create: `fe/src/views/InviteView.vue`

- [ ] **Step 1: Add InviteView**

Implement create room panel, invite code entry panel, and small preview explaining the shared couple room.

- [ ] **Step 2: Commit**

Run:

```bash
git add fe/src/views/InviteView.vue
git commit -m "feat: 초대 코드 진입 프로토타입 추가"
```

## Task 6: Styling and Responsive Polish

**Files:**
- Modify: `fe/src/style.css`

- [ ] **Step 1: Add shared styles**

Add styles for:

- `.app-shell`
- `.app-header`
- `.app-nav`
- `.page-shell`
- `.page-hero`
- `.glass-panel`
- `.form-grid`
- `.field-group`
- `.mock-input`
- `.mock-textarea`
- `.panel-grid`
- `.stack-list`
- `.status-badge`
- `.timeline`

- [ ] **Step 2: Add mobile rules**

At `max-width: 760px`, stack panels, wrap nav, reduce page heading size, and ensure long Korean text wraps.

- [ ] **Step 3: Commit**

Run:

```bash
git add fe/src/style.css
git commit -m "feat: 주요 페이지 반응형 스타일 추가"
```

## Task 7: Verification

**Files:**
- Verify only.

- [ ] **Step 1: Typecheck**

Run:

```bash
cd fe
pnpm typecheck
```

Expected: exit code 0.

- [ ] **Step 2: Build**

Run:

```bash
cd fe
pnpm build
```

Expected: exit code 0.

- [ ] **Step 3: Test**

Run:

```bash
cd fe
pnpm test
```

Expected: exit code 0.

- [ ] **Step 4: Visual smoke check**

Serve `fe/dist` and capture or manually inspect:

- `/`
- `/diaries/new`
- `/diaries/sample`
- `/places`
- `/rooms/sample`
- `/invite`

Check desktop and mobile for clipping, overlap, blank screens, and unreadable buttons.

- [ ] **Step 5: Commit visual fixes if needed**

Run:

```bash
git add fe/src
git commit -m "fix: 주요 페이지 모바일 표시 보정"
```
