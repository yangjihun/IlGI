# Couple Map Home Prototype Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a frontend home prototype that shows IlGI as a soft couple-oriented place diary app with a mock map, markers, and summary panels.

**Architecture:** Keep the prototype in the existing Vue frontend. `HomeView.vue` owns mock data and page composition, while small local components render the map preview and summary cards. Global CSS defines the pastel visual system and responsive layout.

**Tech Stack:** Vue 3, TypeScript, Vite, CSS.

---

## File Structure

- Modify: `fe/src/views/HomeView.vue`
  - Replace the current intro/feature grid with the app-like home prototype.
  - Define typed mock marker and place data in `<script setup lang="ts">`.
  - Keep the route unchanged.
- Create: `fe/src/components/MapPreview.vue`
  - Render the pastel map mock, marker buttons, and selected marker preview.
  - Accept marker data as props.
- Create: `fe/src/components/SummaryCard.vue`
  - Render a compact summary panel with title, eyebrow, value, and optional list.
- Modify: `fe/src/style.css`
  - Replace the current landing-page CSS with responsive app-shell styling.
  - Add map mock, marker, panel, button, and mobile rules.

## Task 1: Map Preview Component

**Files:**
- Create: `fe/src/components/MapPreview.vue`

- [ ] **Step 1: Create typed props and template**

Add this file:

```vue
<script setup lang="ts">
export type MarkerType = 'diary' | 'wishlist' | 'shared'

export type MapMarker = {
  id: string
  type: MarkerType
  title: string
  description: string
  position: {
    top: string
    left: string
  }
}

defineProps<{
  markers: MapMarker[]
  activeMarker: MapMarker
}>()
</script>

<template>
  <section class="map-preview" aria-label="우리의 장소 지도 미리보기">
    <div class="map-preview__canvas" aria-hidden="true">
      <span class="map-shape map-shape--river" />
      <span class="map-shape map-shape--park" />
      <span class="map-road map-road--one" />
      <span class="map-road map-road--two" />
      <span class="map-road map-road--three" />
    </div>

    <button
      v-for="marker in markers"
      :key="marker.id"
      class="map-marker"
      :class="`map-marker--${marker.type}`"
      :style="{ top: marker.position.top, left: marker.position.left }"
      type="button"
      :aria-label="`${marker.title}: ${marker.description}`"
    >
      <span class="map-marker__dot" />
    </button>

    <article class="marker-preview">
      <p>{{ activeMarker.type === 'diary' ? '오늘의 기록' : '함께 볼 장소' }}</p>
      <h2>{{ activeMarker.title }}</h2>
      <span>{{ activeMarker.description }}</span>
    </article>
  </section>
</template>
```

- [ ] **Step 2: Commit component**

Run:

```bash
git add fe/src/components/MapPreview.vue
git commit -m "feat: 지도 미리보기 컴포넌트 추가"
```

## Task 2: Summary Card Component

**Files:**
- Create: `fe/src/components/SummaryCard.vue`

- [ ] **Step 1: Create reusable summary component**

Add this file:

```vue
<script setup lang="ts">
defineProps<{
  eyebrow: string
  title: string
  value: string
  description: string
  items?: string[]
}>()
</script>

<template>
  <article class="summary-card">
    <p class="summary-card__eyebrow">{{ eyebrow }}</p>
    <div class="summary-card__heading">
      <h2>{{ title }}</h2>
      <strong>{{ value }}</strong>
    </div>
    <p class="summary-card__description">{{ description }}</p>
    <ul v-if="items?.length" class="summary-card__list">
      <li v-for="item in items" :key="item">{{ item }}</li>
    </ul>
  </article>
</template>
```

- [ ] **Step 2: Commit component**

Run:

```bash
git add fe/src/components/SummaryCard.vue
git commit -m "feat: 홈 요약 카드 컴포넌트 추가"
```

## Task 3: Home Prototype Composition

**Files:**
- Modify: `fe/src/views/HomeView.vue`

- [ ] **Step 1: Replace HomeView with prototype composition**

Replace the file with:

```vue
<script setup lang="ts">
import MapPreview, { type MapMarker } from '../components/MapPreview.vue'
import SummaryCard from '../components/SummaryCard.vue'

const markers: MapMarker[] = [
  {
    id: 'mangwon',
    type: 'diary',
    title: '망원 한강공원',
    description: '노을 보면서 남긴 산책 기록',
    position: { top: '38%', left: '26%' },
  },
  {
    id: 'seongsu',
    type: 'wishlist',
    title: '성수 작은 식당',
    description: '이번 주말에 같이 가보기',
    position: { top: '28%', left: '62%' },
  },
  {
    id: 'bukchon',
    type: 'shared',
    title: '북촌 골목',
    description: '둘 다 저장한 다음 데이트 장소',
    position: { top: '58%', left: '48%' },
  },
  {
    id: 'yeonnam',
    type: 'diary',
    title: '연남동 카페',
    description: '처음 같이 쓴 장소 일기',
    position: { top: '68%', left: '21%' },
  },
  {
    id: 'jamsil',
    type: 'wishlist',
    title: '잠실 야경길',
    description: '비 오는 날 말고 맑은 날 가기',
    position: { top: '48%', left: '76%' },
  },
]

const activeMarker = markers[0]

const wishlistItems = ['성수 작은 식당', '잠실 야경길', '북촌 골목 산책']
</script>

<template>
  <main class="home-page">
    <header class="home-header">
      <div>
        <p class="home-header__eyebrow">우리의 장소 일기</p>
        <h1>IlGI</h1>
      </div>

      <div class="home-header__actions" aria-label="공유 방 상태">
        <span class="room-pill">2명이 함께 기록 중</span>
        <button class="icon-button" type="button" aria-label="알림 보기">♡</button>
        <span class="profile-avatar" aria-label="프로필">J</span>
      </div>
    </header>

    <section class="hero-layout" aria-label="장소 기반 다이어리 홈">
      <div class="hero-copy">
        <p class="hero-copy__label">Today near us</p>
        <h2>둘이 남긴 하루가 지도 위에 천천히 쌓여요.</h2>
        <p>
          다녀온 곳은 다이어리로, 가보고 싶은 곳은 함께 보는 목록으로 모아두세요.
        </p>
        <div class="hero-actions">
          <button class="primary-button" type="button">오늘 기록 남기기</button>
          <button class="secondary-button" type="button">가고 싶은 곳 추가</button>
        </div>
      </div>

      <MapPreview :markers="markers" :active-marker="activeMarker" />
    </section>

    <section class="summary-grid" aria-label="오늘의 요약">
      <SummaryCard
        eyebrow="Diary"
        title="오늘의 기록"
        value="3"
        description="망원 한강공원에서 남긴 산책 기록이 가장 최근에 저장됐어요."
      />
      <SummaryCard
        eyebrow="Wishlist"
        title="같이 가고 싶은 곳"
        value="12"
        description="이번 주말에 고르기 좋은 장소를 모아뒀어요."
        :items="wishlistItems"
      />
      <SummaryCard
        eyebrow="Room"
        title="우리 방"
        value="IlGI-204"
        description="초대 코드로 만든 공유 방에서 장소 목록을 함께 관리하고 있어요."
      />
    </section>
  </main>
</template>
```

- [ ] **Step 2: Commit page composition**

Run:

```bash
git add fe/src/views/HomeView.vue
git commit -m "feat: 커플 지도 홈 화면 구성"
```

## Task 4: Visual Styling and Responsiveness

**Files:**
- Modify: `fe/src/style.css`

- [ ] **Step 1: Replace global CSS with prototype styles**

Replace `fe/src/style.css` with:

```css
:root {
  color: #243447;
  background: #f7fbff;
  font-family:
    Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
    sans-serif;
  font-synthesis: none;
  line-height: 1.5;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  box-sizing: border-box;
}

body {
  min-width: 320px;
  margin: 0;
}

button,
input,
textarea,
select {
  font: inherit;
}

button {
  cursor: pointer;
}

#app {
  min-height: 100vh;
}

.home-page {
  min-height: 100vh;
  padding: 28px clamp(18px, 4vw, 56px) 40px;
  overflow: hidden;
  background:
    radial-gradient(circle at 12% 18%, rgba(255, 213, 226, 0.82), transparent 28%),
    radial-gradient(circle at 82% 8%, rgba(191, 230, 255, 0.9), transparent 28%),
    linear-gradient(135deg, #fff8fb 0%, #eff9ff 48%, #fffdf7 100%);
}

.home-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  max-width: 1180px;
  margin: 0 auto 28px;
}

.home-header__eyebrow {
  margin: 0 0 4px;
  color: #6b8ca8;
  font-size: 14px;
  font-weight: 800;
}

.home-header h1 {
  margin: 0;
  color: #27384f;
  font-size: 34px;
  line-height: 1;
}

.home-header__actions {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}

.room-pill,
.icon-button,
.profile-avatar {
  border: 1px solid rgba(255, 255, 255, 0.72);
  background: rgba(255, 255, 255, 0.68);
  box-shadow: 0 18px 50px rgba(84, 121, 156, 0.14);
  backdrop-filter: blur(18px);
}

.room-pill {
  max-width: 180px;
  padding: 10px 14px;
  border-radius: 999px;
  color: #486178;
  font-size: 14px;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.icon-button,
.profile-avatar {
  display: inline-grid;
  place-items: center;
  width: 42px;
  height: 42px;
  flex: 0 0 42px;
  border-radius: 999px;
  color: #df7797;
  font-weight: 900;
}

.icon-button {
  border-color: rgba(255, 255, 255, 0.78);
}

.profile-avatar {
  color: #ffffff;
  background: linear-gradient(135deg, #ff9dbb, #8fc9ff);
}

.hero-layout {
  display: grid;
  grid-template-columns: minmax(300px, 0.78fr) minmax(420px, 1.22fr);
  gap: clamp(22px, 4vw, 48px);
  align-items: stretch;
  max-width: 1180px;
  margin: 0 auto;
}

.hero-copy {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 500px;
  padding: clamp(28px, 4vw, 48px);
  border: 1px solid rgba(255, 255, 255, 0.74);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.62);
  box-shadow: 0 24px 80px rgba(85, 122, 155, 0.16);
  backdrop-filter: blur(22px);
}

.hero-copy__label {
  margin: 0 0 18px;
  color: #df7797;
  font-size: 13px;
  font-weight: 900;
  text-transform: uppercase;
}

.hero-copy h2 {
  margin: 0;
  color: #243447;
  font-size: clamp(36px, 5vw, 64px);
  line-height: 1.05;
}

.hero-copy p:not(.hero-copy__label) {
  max-width: 520px;
  margin: 22px 0 0;
  color: #5c7286;
  font-size: 18px;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 34px;
}

.primary-button,
.secondary-button {
  min-height: 48px;
  padding: 0 18px;
  border-radius: 999px;
  font-weight: 800;
}

.primary-button {
  border: 0;
  color: #ffffff;
  background: linear-gradient(135deg, #ff89ad, #77bfff);
  box-shadow: 0 18px 32px rgba(218, 111, 151, 0.24);
}

.secondary-button {
  border: 1px solid rgba(117, 157, 189, 0.28);
  color: #486178;
  background: rgba(255, 255, 255, 0.76);
}

.map-preview {
  position: relative;
  min-height: 500px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.78);
  border-radius: 8px;
  background: linear-gradient(135deg, rgba(234, 249, 255, 0.92), rgba(255, 244, 249, 0.92));
  box-shadow: 0 24px 80px rgba(85, 122, 155, 0.18);
}

.map-preview__canvas {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(94, 135, 166, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(94, 135, 166, 0.08) 1px, transparent 1px);
  background-size: 64px 64px;
}

.map-shape,
.map-road {
  position: absolute;
  display: block;
}

.map-shape--river {
  top: 8%;
  left: 44%;
  width: 180px;
  height: 540px;
  border-radius: 999px;
  background: rgba(155, 214, 243, 0.42);
  transform: rotate(28deg);
}

.map-shape--park {
  right: 8%;
  bottom: 12%;
  width: 220px;
  height: 150px;
  border-radius: 48% 52% 40% 60%;
  background: rgba(190, 229, 203, 0.52);
}

.map-road {
  height: 2px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 0 0 8px rgba(255, 255, 255, 0.22);
}

.map-road--one {
  top: 35%;
  left: -10%;
  width: 78%;
  transform: rotate(-14deg);
}

.map-road--two {
  top: 62%;
  right: -8%;
  width: 86%;
  transform: rotate(12deg);
}

.map-road--three {
  top: 18%;
  right: 10%;
  width: 56%;
  transform: rotate(36deg);
}

.map-marker {
  position: absolute;
  z-index: 2;
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border: 0;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.86);
  box-shadow: 0 14px 32px rgba(62, 92, 120, 0.22);
  transform: translate(-50%, -50%);
}

.map-marker:focus-visible {
  outline: 3px solid rgba(36, 52, 71, 0.42);
  outline-offset: 3px;
}

.map-marker__dot {
  width: 18px;
  height: 18px;
  border-radius: 999px;
}

.map-marker--diary .map-marker__dot {
  background: #ff8cab;
}

.map-marker--wishlist .map-marker__dot {
  background: #78bffc;
}

.map-marker--shared .map-marker__dot {
  background: #9bd8af;
}

.marker-preview {
  position: absolute;
  right: 24px;
  bottom: 24px;
  z-index: 3;
  width: min(320px, calc(100% - 48px));
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.78);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.76);
  box-shadow: 0 18px 44px rgba(75, 109, 139, 0.18);
  backdrop-filter: blur(18px);
}

.marker-preview p,
.marker-preview h2,
.marker-preview span {
  margin: 0;
}

.marker-preview p {
  color: #df7797;
  font-size: 13px;
  font-weight: 900;
}

.marker-preview h2 {
  margin-top: 8px;
  color: #26384d;
  font-size: 22px;
}

.marker-preview span {
  display: block;
  margin-top: 6px;
  color: #5e7284;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  max-width: 1180px;
  margin: 22px auto 0;
}

.summary-card {
  min-height: 190px;
  padding: 22px;
  border: 1px solid rgba(255, 255, 255, 0.74);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.68);
  box-shadow: 0 18px 48px rgba(85, 122, 155, 0.13);
  backdrop-filter: blur(18px);
}

.summary-card__eyebrow {
  margin: 0 0 14px;
  color: #7ca0b8;
  font-size: 12px;
  font-weight: 900;
  text-transform: uppercase;
}

.summary-card__heading {
  display: flex;
  align-items: start;
  justify-content: space-between;
  gap: 16px;
}

.summary-card h2 {
  margin: 0;
  color: #26384d;
  font-size: 21px;
}

.summary-card strong {
  color: #df7797;
  font-size: 24px;
}

.summary-card__description {
  margin: 16px 0 0;
  color: #5e7284;
}

.summary-card__list {
  display: grid;
  gap: 8px;
  margin: 16px 0 0;
  padding: 0;
  list-style: none;
}

.summary-card__list li {
  padding: 8px 10px;
  border-radius: 8px;
  color: #486178;
  background: rgba(239, 248, 255, 0.82);
}

@media (max-width: 900px) {
  .hero-layout,
  .summary-grid {
    grid-template-columns: 1fr;
  }

  .hero-copy,
  .map-preview {
    min-height: 420px;
  }
}

@media (max-width: 640px) {
  .home-page {
    padding: 20px 14px 28px;
  }

  .home-header {
    align-items: flex-start;
  }

  .room-pill {
    display: none;
  }

  .hero-copy {
    min-height: auto;
    padding: 26px 20px;
  }

  .hero-actions {
    flex-direction: column;
  }

  .primary-button,
  .secondary-button {
    width: 100%;
  }

  .map-preview {
    min-height: 420px;
  }

  .marker-preview {
    right: 14px;
    bottom: 14px;
    width: calc(100% - 28px);
  }

  .summary-card {
    min-height: auto;
  }
}
```

- [ ] **Step 2: Commit styling**

Run:

```bash
git add fe/src/style.css
git commit -m "feat: 커플앱 홈 프로토타입 스타일 적용"
```

## Task 5: Verification

**Files:**
- Verify only.

- [ ] **Step 1: Run typecheck**

Run:

```bash
cd fe
pnpm typecheck
```

Expected: command exits with code 0.

- [ ] **Step 2: Run production build**

Run:

```bash
cd fe
pnpm build
```

Expected: command exits with code 0 and writes `dist`.

- [ ] **Step 3: Run local visual check**

Run:

```bash
cd fe
pnpm dev -- --host 127.0.0.1
```

Expected: Vite serves the app. Check desktop and mobile viewport for:

- header text does not overlap action controls.
- map marker buttons are visible.
- summary panels stack on mobile.
- buttons keep readable text.

- [ ] **Step 4: Final commit if visual fixes are needed**

If visual fixes are made, commit:

```bash
git add fe/src
git commit -m "fix: 홈 프로토타입 반응형 표시 보정"
```
