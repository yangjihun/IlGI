# Frontend Pages Prototype Design

## Summary

Issue #19는 홈 프로토타입(#18)과 같은 visual tone으로 MVP 주요 화면을 추가한다. 목표는 실제 API 연동 전, 사용자가 IlGI의 핵심 흐름을 화면 단위로 이해할 수 있는 clickable prototype을 만드는 것이다.

## Scope

구현할 화면은 다음 다섯 가지이다.

- 다이어리 작성 화면
- 다이어리 상세 화면
- 가보고 싶은 장소 목록 화면
- 공유 방 화면
- 초대 코드 입장/방 생성 화면

## Non-Goals

- 실제 backend API를 호출하지 않는다.
- 실제 Kakao Maps API를 연결하지 않는다.
- form submit으로 데이터를 저장하지 않는다.
- 인증, 권한, 초대 코드 검증 로직을 구현하지 않는다.
- 실제 CRUD side effect를 구현하지 않는다.

## Visual Direction

- #18 홈 프로토타입의 pastel/glass card tone을 유지한다.
- 하늘색, 연분홍, 흰색을 기본으로 쓰되, 각 화면의 정보 구조가 먼저 보이게 한다.
- landing page가 아니라 실제 앱 내부 화면처럼 구성한다.
- 화면마다 같은 top navigation을 제공해 prototype 이동성을 확보한다.
- 모바일에서는 form, list, room panel이 한 줄로 내려오며 text와 button이 잘리지 않아야 한다.

## Navigation

공통 app navigation을 추가한다.

- 홈: `/`
- 다이어리 작성: `/diaries/new`
- 다이어리 상세: `/diaries/sample`
- 가보고 싶은 곳: `/places`
- 공유 방: `/rooms/sample`
- 초대: `/invite`

홈 화면의 CTA는 실제 저장 동작 대신 관련 route로 이동한다.

## Page Designs

### Diary Create

목적: 사용자가 장소 기반 다이어리를 작성하는 흐름을 이해한다.

구성:

- 날짜 field
- 장소명 field
- 기억에 남는 것 textarea
- 추가 메모 textarea
- 저장 CTA
- 오른쪽 또는 하단에 작성 preview card

### Diary Detail

목적: 저장된 장소 일기가 어떤 형태로 보이는지 보여준다.

구성:

- 장소명, 날짜, 작성자
- 기억에 남는 것과 추가 메모
- 작은 map preview 또는 location card
- 수정/삭제 CTA
- 같은 방에서 볼 수 있는 관련 장소 snippet

### Wishlist Places

목적: 같이 가보고 싶은 장소를 카테고리별로 관리하는 흐름을 보여준다.

구성:

- 카테고리 tab 또는 segmented control
- 장소 list cards
- 장소 추가 form mock
- 공유 참여자 indicator
- 상태 badge: 저장됨, 이번 주 후보, 다녀옴

### Share Room

목적: 공유 방 안에서 다이어리와 장소 목록을 함께 보는 흐름을 보여준다.

구성:

- 방 이름과 invite code
- 참여자 list
- 공유 diary timeline
- 공동 장소 목록 preview
- 초대 code copy CTA mock

### Invite

목적: 공유 방 생성과 초대 코드 입장 흐름을 보여준다.

구성:

- 방 만들기 panel
- 초대 코드 입력 panel
- “둘만의 장소 방”을 설명하는 작은 preview
- validation은 실제 로직 없이 helper text로 표현한다.

## Components

새로 추가할 component 후보:

- `AppShell.vue`: 공통 header/navigation layout
- `PageHero.vue`: 각 page 상단 title/description/eyebrow
- `GlassPanel.vue`: glass card wrapper

기존 component 재사용:

- `MapPreview.vue`
- `SummaryCard.vue`

## Mock Data

모든 화면은 Vue file 내부 mock data를 사용한다. 실제 API 연결 시점에는 별도 composable 또는 API client로 이동한다.

## Accessibility

- navigation은 semantic link를 사용한다.
- form input에는 label을 연결한다.
- tab/segmented control은 button으로 구현한다.
- decorative icon/text는 핵심 정보 전달에 의존하지 않는다.

## Testing and Verification

- `cd fe && pnpm typecheck`
- `cd fe && pnpm build`
- `cd fe && pnpm test`
- desktop/mobile viewport에서 각 route 화면을 확인한다.

## Dependency

이 작업은 #18 홈 프로토타입의 visual system과 component를 기반으로 한다. #18이 먼저 `dev`에 merge되면 #19 PR diff가 가장 깔끔해진다.
