# Initial Project Setup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create the initial top-level project structure and GitHub collaboration templates.

**Architecture:** Keep frontend and backend code separated at the repository root with `fe/` and `be/`. Add GitHub issue and pull request templates that reflect `AGENTS.md` working rules, including human-only final merge.

**Tech Stack:** Vue, TypeScript, Node.js, Express, Markdown, GitHub templates.

---

### Task 1: Create App Directories

**Files:**
- Create: `fe/README.md`
- Create: `be/README.md`

- [x] **Step 1: Create frontend README**

Create `fe/README.md` with the frontend directory purpose and pending setup notes.

- [x] **Step 2: Create backend README**

Create `be/README.md` with the backend directory purpose and pending setup notes.

### Task 2: Create GitHub Templates

**Files:**
- Create: `.github/pull_request_template.md`
- Create: `.github/ISSUE_TEMPLATE/feature_request.md`
- Create: `.github/ISSUE_TEMPLATE/bug_report.md`
- Create: `.github/ISSUE_TEMPLATE/task.md`

- [x] **Step 1: Create pull request template**

Include linked issue, summary, test results, checklist, risks, and human-only merge reminder.

- [x] **Step 2: Create issue templates**

Include feature, bug, and task templates aligned with the required Issue fields in `AGENTS.md`.

### Task 3: Verify Files

**Files:**
- Read: `fe/README.md`
- Read: `be/README.md`
- Read: `.github/pull_request_template.md`
- Read: `.github/ISSUE_TEMPLATE/feature_request.md`
- Read: `.github/ISSUE_TEMPLATE/bug_report.md`
- Read: `.github/ISSUE_TEMPLATE/task.md`

- [x] **Step 1: Inspect generated files**

Run `Get-ChildItem -Recurse -Force` and inspect the generated Markdown files.

- [x] **Step 2: Check git status**

Run `git status --short` and confirm the expected files are present.
