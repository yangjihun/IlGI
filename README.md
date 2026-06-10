# IlGI

장소를 중심으로 일상을 기록하고, 함께 가보고 싶은 장소를 공동으로 관리하는 장소 기반 다이어리 서비스입니다.

## Overview

IlGI는 방문한 장소에 대한 다이어리를 작성하고, 그 기록을 지도 위에서 다시 확인할 수 있도록 만드는 프로젝트입니다. 사용자는 다이어리를 통해 실제로 다녀온 장소를 기록하고, 가보고 싶은 장소는 카테고리별 목록으로 저장할 수 있습니다.

또한 초대 코드 기반 공유 방을 통해 다른 사용자와 장소 기반 다이어리와 장소 목록을 함께 확인하고 편집하는 흐름을 목표로 합니다.

## Core Features

- 방문 장소 기반 다이어리 작성, 조회, 수정, 삭제
- 다이어리 작성 위치의 지도 마커 표시
- 가보고 싶은 장소 저장 및 카테고리별 분류
- 초대 코드 기반 공유 방 생성 및 입장
- 공유 방 내 다이어리 조회
- 공유 방 내 장소 목록 공동 편집

## Tech Stack

- Frontend: Vue, TypeScript
- Backend: Node.js, Express
- Database: PostgreSQL + PostGIS
- Map API: 카카오 지도 API
- Collaboration: GitHub Issues, Pull Requests, Markdown docs

## Project Structure

```text
.
├── fe/                  # Vue + TypeScript frontend
├── be/                  # Node.js + Express backend
├── docs/                # 기획서, 작업 계획, 문서 자료
├── .github/             # Issue 및 Pull Request 템플릿
├── AGENTS.md            # AI 에이전트 작업 규칙
└── README.md            # 프로젝트 소개
```

## Documents

- [Project Plan](docs/PROJECT_PLAN.md)
- [Agent Rules](AGENTS.md)
- [Initial Setup Plan](docs/superpowers/plans/2026-06-10-initial-project-setup.md)

## Development Status

현재는 프로젝트 초기 세팅 단계입니다. 프론트엔드와 백엔드 디렉토리, GitHub Issue/PR 템플릿, 기획 문서와 AI 작업 규칙을 먼저 정리했습니다.

실제 Vue 및 Express 프로젝트 scaffold는 패키지 매니저와 세부 설정을 확정한 뒤 진행합니다.
