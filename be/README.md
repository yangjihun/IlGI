# Backend

Node.js, Express, TypeScript 기반 백엔드 애플리케이션입니다.

## 기술 스택

- Node.js
- Express
- TypeScript
- Vitest
- pnpm

## 실행 명령어

```bash
pnpm install
pnpm dev
pnpm typecheck
pnpm build
pnpm test
```

## API

- `GET /health`: API 서버 상태 확인

## 구조

- `src/app.ts`: Express 앱 생성
- `src/server.ts`: 서버 실행 진입점
- `src/routes/`: 라우터
- `src/controllers/`: 요청/응답 처리
- `src/services/`: 도메인 로직
- `tests/`: API 테스트

## 설정 메모

- 기본 포트는 `3000`입니다.
- `PORT` 환경 변수로 실행 포트를 변경할 수 있습니다.
- 데이터베이스는 PostgreSQL + PostGIS를 기준으로 준비합니다.
