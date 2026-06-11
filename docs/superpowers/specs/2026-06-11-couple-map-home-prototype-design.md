# Couple Map Home Prototype Design

## Summary

프론트엔드 첫 프로토타입은 장소 기반 다이어리 서비스의 핵심을 바로 보여주는 메인 지도형 홈 화면으로 만든다. 실제 Kakao Maps 연동 전 단계이므로 지도는 mock UI로 표현하고, 사용자가 기대할 주요 정보 구조와 커플앱 감성을 검증하는 데 집중한다.

## Goal

- 사용자가 앱을 열었을 때 “둘이 함께 장소를 기록하고 관리하는 앱”이라는 목적을 즉시 이해하게 한다.
- MVP 핵심 기능인 장소 기반 다이어리, 가보고 싶은 장소, 공유 방 상태를 한 화면에서 확인할 수 있게 한다.
- 향후 실제 지도 API와 diary/place 데이터가 연결되기 쉬운 컴포넌트 구조로 만든다.

## Non-Goals

- 실제 Kakao Maps API를 연결하지 않는다.
- 실제 backend API를 호출하지 않는다.
- 인증, 초대 코드 입력, CRUD form 구현은 포함하지 않는다.
- 실제 이미지 업로드나 diary 상세 화면은 포함하지 않는다.

## Visual Direction

- 전체 톤은 하늘색, 연분홍, 흰색을 중심으로 한 부드러운 pastel palette를 사용한다.
- 커플앱 느낌은 과한 장식보다 은은한 glass panel, 작은 heart/location accent, 따뜻한 microcopy로 표현한다.
- 첫 화면은 landing page가 아니라 실제 앱 home처럼 구성한다.
- 화면 정보 밀도는 낮게 시작하되, 지도 marker와 요약 panel이 한눈에 들어오게 한다.
- UI는 모바일 앱에 가까운 감성을 가지되 desktop viewport에서도 어색하지 않게 responsive layout을 둔다.

## Screen Structure

### Top Bar

- 좌측에 `IlGI` brand와 짧은 subtitle을 둔다.
- 우측에는 공유 방 상태, 알림, mock profile avatar를 둔다.
- navigation보다 현재 app context를 보여주는 header 역할에 집중한다.

### Map Mock Area

- 가장 큰 영역에 pastel map mock을 배치한다.
- 실제 지도 tile 대신 얇은 road line, river/park shape, soft grid를 CSS로 표현한다.
- marker는 diary, wishlist, shared place를 구분할 수 있게 4~5개 배치한다.
- 선택된 marker에는 작은 preview bubble을 보여준다.

### Summary Panels

- `오늘의 기록`: 최근 diary snippet과 장소명, 작성자 표시.
- `같이 가고 싶은 곳`: wishlist count와 상위 장소 2~3개.
- `우리 방`: 공유 방 이름, 참여자 수, 초대 상태 mock text.
- 각 panel은 실제 데이터 연결 전 mock data를 사용한다.

### Mobile Layout

- header는 compact하게 유지한다.
- map mock을 상단에 크게 두고, summary panels는 아래로 세로 배치한다.
- text가 button/card 영역을 넘치지 않도록 line wrapping과 min/max width를 지정한다.

## Component Boundaries

- `HomeView.vue`: page composition과 mock data 소유.
- `MapPreview`: 지도 mock, marker, selected marker preview 표현.
- `SummaryCard`: 반복 summary panel 표현.
- `PlaceList`: 같이 가고 싶은 곳 목록 표현.

처음 구현에서는 파일 수를 과하게 늘리지 않되, UI 책임이 커지는 부분은 component로 분리한다.

## Data Model for Mock

```ts
type MarkerType = 'diary' | 'wishlist' | 'shared';

type MapMarker = {
  id: string;
  type: MarkerType;
  title: string;
  description: string;
  position: {
    top: string;
    left: string;
  };
};
```

## Interaction

- marker hover/focus 시 preview bubble을 강조한다.
- 주요 CTA는 “오늘 기록 남기기”와 “가고 싶은 곳 추가” 두 개로 제한한다.
- 버튼은 실제 route/API가 없으므로 현재는 UI 상태만 표현하고 동작은 연결하지 않는다.

## Accessibility

- marker는 button으로 구현해 keyboard focus가 가능하게 한다.
- pastel background 위 text contrast가 부족하지 않게 text color를 조정한다.
- decorative shape는 screen reader에 노출하지 않는다.

## Testing and Verification

- `cd fe && pnpm typecheck`
- `cd fe && pnpm build`
- 가능하면 local dev server에서 desktop/mobile viewport를 확인한다.
- mock 지도와 panel이 desktop/mobile에서 겹치지 않는지 확인한다.

## Open Decisions

- 실제 Kakao Maps API 연결 시점은 별도 Issue로 분리한다.
- diary/place API 연결 시점은 backend schema와 API contract가 정리된 뒤 결정한다.
- 최종 brand copy와 icon set은 MVP UI가 더 쌓인 뒤 조정한다.
