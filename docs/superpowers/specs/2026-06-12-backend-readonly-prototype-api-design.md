# Backend Readonly Prototype API Design

## Summary

Issue #22는 프론트엔드 프로토타입을 실제 backend endpoint와 연결할 수 있도록 읽기 전용 mock API를 추가한다. 실제 database, 인증, 권한, CRUD side effect는 구현하지 않는다.

## Goals

- 프론트엔드 화면에서 필요한 다이어리, 장소, 공유 방, 초대 코드 preview 데이터를 backend에서 받을 수 있게 한다.
- 현재 health API와 같은 route, controller, service 구조를 유지한다.
- service 내부 mock data를 나중에 database repository로 교체하기 쉽게 둔다.
- 코드 추가는 작게 유지하고, endpoint behavior는 테스트로 고정한다.

## API Scope

- `GET /api/diaries`
  - 다이어리 목록을 반환한다.
- `GET /api/diaries/:id`
  - 특정 다이어리 상세를 반환한다.
  - 없으면 404를 반환한다.
- `GET /api/places`
  - 가보고 싶은 장소 목록을 반환한다.
- `GET /api/rooms/:id`
  - 공유 방 상세, 참여자, timeline, 공유 장소 preview를 반환한다.
  - 없으면 404를 반환한다.
- `POST /api/invitations/preview`
  - 초대 코드로 입장 전에 보여줄 공유 방 preview를 반환한다.
  - 초대 코드가 비어 있으면 400을 반환한다.

## Non-Goals

- PostgreSQL/PostGIS 연결을 하지 않는다.
- 생성, 수정, 삭제 API를 만들지 않는다.
- 인증 또는 사용자 세션을 구현하지 않는다.
- 초대 코드 실제 검증 정책을 구현하지 않는다.
- 프론트엔드 코드를 수정하지 않는다.

## Data Shape

Mock data는 TypeScript type으로 정의한다. 최소 필드는 다음 기준을 따른다.

- Diary: `id`, `date`, `placeName`, `title`, `memory`, `memo`, `author`, `markerType`
- Place: `id`, `name`, `category`, `status`
- Room: `id`, `name`, `inviteCode`, `participants`, `timeline`, `places`

## File Boundaries

- `prototype.service.ts`
  - typed mock data와 조회 함수를 가진다.
- `prototype.controller.ts`
  - request parameter/body를 읽고 HTTP status를 결정한다.
- `prototype.route.ts`
  - endpoint path와 controller를 연결한다.
- `prototype.test.ts`
  - endpoint behavior를 검증한다.

## Error Handling

- 없는 diary id: `404 { message: 'Diary not found' }`
- 없는 room id: `404 { message: 'Room not found' }`
- 빈 invite code: `400 { message: 'Invite code is required' }`

## Testing

- 테스트를 먼저 작성하고 실패를 확인한다.
- 이후 최소 구현으로 테스트를 통과시킨다.
- 최종 검증 명령어:
  - `cd be && pnpm test`
  - `cd be && pnpm typecheck`
  - `cd be && pnpm build`
