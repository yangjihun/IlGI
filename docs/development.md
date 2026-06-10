# Development Commands

이 문서는 로컬 개발 환경에서 자주 사용하는 실행 및 검증 명령어를 정리한다.

## Prerequisites

- Node.js
- pnpm
- Docker Desktop

## Environment

환경 변수 예시 파일이 추가된 뒤에는 다음처럼 로컬 파일을 만든다.

```bash
cp .env.example .env
cp fe/.env.example fe/.env
cp be/.env.example be/.env
```

Windows PowerShell에서는 다음 명령을 사용할 수 있다.

```powershell
Copy-Item .env.example .env
Copy-Item fe/.env.example fe/.env
Copy-Item be/.env.example be/.env
```

## Frontend

```bash
cd fe
pnpm install
pnpm dev
```

검증 명령어는 다음을 기준으로 한다.

```bash
cd fe
pnpm typecheck
pnpm build
pnpm test
```

## Backend

```bash
cd be
pnpm install
pnpm dev
```

검증 명령어는 다음을 기준으로 한다.

```bash
cd be
pnpm typecheck
pnpm build
pnpm test
```

## Database

Docker Desktop을 실행한 뒤 root directory에서 database container를 실행한다.

```bash
docker compose up -d db
```

PostGIS extension 활성화 여부는 다음 명령으로 확인한다.

```bash
docker compose exec db psql -U ilgi -d ilgi -c "SELECT PostGIS_Version();"
```

Database를 중지할 때는 다음 명령을 사용한다.

```bash
docker compose down
```

## PR 전 확인

작업 범위에 따라 필요한 명령만 실행하고, PR 설명에 결과를 남긴다.

```bash
cd fe
pnpm typecheck
pnpm build
pnpm test
```

```bash
cd be
pnpm typecheck
pnpm build
pnpm test
```

```bash
docker compose config
```

문서만 수정한 경우에는 테스트를 생략할 수 있다. 이때 PR 설명과 완료 보고에 생략 이유를 적는다.
