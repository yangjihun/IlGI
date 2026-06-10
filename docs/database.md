# 데이터베이스 개발 환경

이 프로젝트는 장소 기반 데이터를 다루기 위해 PostgreSQL + PostGIS 조합을 사용합니다.

## 기본 구성

- DB 이미지: `postgis/postgis:16-3.5`
- 컨테이너 이름: `ilgi-postgis`
- DB 이름: `ilgi`
- 사용자: `ilgi`
- 기본 포트: `5432`

## 실행

```bash
docker compose up -d db
```

## 종료

```bash
docker compose down
```

## 접속 정보

기본 개발용 접속 정보는 다음과 같습니다.

```text
host: localhost
port: 5432
database: ilgi
user: ilgi
password: ilgi_password
```

실제 로컬 값은 `.env` 파일에서 덮어쓸 수 있습니다. `.env`는 git에 올리지 않습니다.

## PostGIS 확인

```bash
docker compose exec db psql -U ilgi -d ilgi -c "SELECT PostGIS_Version();"
```
