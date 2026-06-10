# Environment Variables

이 문서는 로컬 개발에 필요한 환경 변수 예시와 관리 규칙을 정리한다.

## 기본 규칙

- 실제 환경 변수 파일은 저장소에 커밋하지 않는다.
- 필요한 값은 `.env.example` 파일을 복사해서 로컬 `.env` 파일에 채운다.
- API key, token, password처럼 민감한 값은 GitHub Issue, PR, commit message에 남기지 않는다.

## 예시 파일

- Root: `.env.example`
- Frontend: `fe/.env.example`
- Backend: `be/.env.example`

## 로컬 설정

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

## 변수 목록

| 변수 | 위치 | 설명 |
| --- | --- | --- |
| `POSTGRES_DB` | Root | 로컬 PostgreSQL database 이름 |
| `POSTGRES_USER` | Root | 로컬 PostgreSQL user 이름 |
| `POSTGRES_PASSWORD` | Root | 로컬 PostgreSQL password |
| `POSTGRES_PORT` | Root | 로컬 PostgreSQL host port |
| `PORT` | Root, Backend | Backend server port |
| `DATABASE_URL` | Root, Backend | Backend에서 사용할 PostgreSQL connection string |
| `VITE_API_BASE_URL` | Root, Frontend | Frontend가 호출할 Backend API base URL |
| `VITE_KAKAO_MAP_APP_KEY` | Root, Frontend | Kakao Maps JavaScript app key |

## 참고

- `VITE_` prefix가 붙은 값은 frontend build 결과에 포함될 수 있다.
- Kakao Maps key는 브라우저에서 사용하는 공개 app key만 `VITE_KAKAO_MAP_APP_KEY`에 넣는다.
- 운영 환경 값은 로컬 예시와 분리해서 배포 플랫폼의 secret 또는 environment 설정으로 관리한다.
