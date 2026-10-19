# DevOps Course Activity: GitHub Actions Hands-On Implementation & PoC

**Student Name:** Abdul Rafay  
**SAP ID:** 54689  
**Course:** DevOps Course Activity — GitHub Actions Certification  
**Repository:** [aabdulrafay/Github-Examples](https://github.com/aabdulrafay/Github-Examples)  
**Deliverable:** Proof of Concept (PoC) Document & Hands-On Repository  

---

## 1. Executive Summary & Activity Overview

This repository contains the complete practical implementation of all seven modules required for the **GitHub Actions Certification Hands-On Activity**. All workflows have been authored, validated, and executed under `.github/workflows/` with live GitHub-hosted and self-hosted runners, secret isolation, dynamic triggers, dependency caching, matrix builds, service containers, and custom JavaScript action bundling.

---

## 2. Practical Modules Implementation Matrix

| Module | Topic / Focus | Workflow File | Trigger Type | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Module 1** | Repository Action Permissions & Governance | `.github/workflows/` | Repository Policy | Verified & Configured |
| **Module 2A** | Multi-Event Triggers (Push & Pull Request) | `module2a-multi-event.yml` | `push`, `pull_request` (`main`, `dev`) | **PASSED** |
| **Module 2B** | Scheduled Events (Cron Execution) | `module2b-schedule.yml` | `schedule` (cron `*/5 * * * *`) | **PASSED** |
| **Module 2C** | Manual Trigger with Parameterized Inputs | `module2c-manual.yml` | `workflow_dispatch` (name, greeting, data) | **PASSED** |
| **Module 2D** | Webhook Events & External API Integration | `module2d-webhook.yml` | `repository_dispatch` (`custom-webhook`) | **PASSED** |
| **Module 3** | Architecture, Context Objects & Expressions | `module3-contexts-conditionals.yml` | `push`, `workflow_dispatch` | **PASSED** |
| **Module 4** | Secrets Management & GITHUB_TOKEN | `module4-secrets-variables.yml` | `push`, `workflow_dispatch` | **PASSED** |
| **Module 5A** | Multi-OS GitHub-Hosted Runners | `module5a-multios.yml` | `push`, `workflow_dispatch` (`ubuntu`, `windows`, `macos`) | **PASSED** |
| **Module 5B** | Self-Hosted Runner Infrastructure | `module5b-self-hosted.yml` | `self-hosted` runner | **ACTIVE** |
| **Module 6** | Matrix Strategy, Cache & Service Containers | `module6-matrix-cache-container.yml` | Matrix across OS & Node versions, Redis/PostgreSQL | **PASSED** |
| **Module 7** | Authoring & Bundling Custom JS Action | `module7-custom-action.yml` | Custom Action (`@vercel/ncc` bundle) | **PASSED** |

---

## 3. Architecture & Core Workflow Descriptions

### Module 1: Repository Exploration & Action Settings
- Configured repository actions permissions to allow all actions and reusable workflows.
- Workflow permissions configured to `Read and write permissions` with approval rights for PR reviews (`gh api -X PUT repos/aabdulrafay/Github-Examples/actions/permissions/workflow`).

### Module 2: Workflow Triggers & Event Logic
- **2A: Multi-Event Triggers (`module2a-multi-event.yml`)**: Triggered simultaneously on `push` and `pull_request` targeting `main` and `dev` branches.
- **2B: Scheduled Events (`module2b-schedule.yml`)**: Uses cron expression `*/5 * * * *` configured on default branch `main`.
- **2C: Manual Triggers (`module2c-manual.yml`)**: Accepts `name`, `greeting`, and base64-encoded `data`, decodes payloads, and executes on-demand via UI and CLI:
  ```bash
  gh workflow run module2c-manual.yml -f name="Abdul Rafay" -f greeting="Hello from CLI" -f data="SGVsbG8gZnJvbSBHaXRIdWIgQWN0aW9ucyBDTEkgVHJpZ2dlciE="
  ```
- **2D: Webhook Events (`module2d-webhook.yml`)**: Triggered via external REST API `repository_dispatch` using `curl.exe`:
  ```bash
  curl.exe -i -X POST -H "Accept: application/vnd.github+json" \
    -H "Authorization: Bearer <PAT>" \
    https://api.github.com/repos/aabdulrafay/Github-Examples/dispatches \
    --data-binary "@payload.json"
  ```
  Returns HTTP `204 No Content` and immediately schedules runner execution.

### Module 3: Context Objects & Expressions
- Inspects context objects: `github.actor`, `github.event_name`, `github.repository`, `runner.os`, `vars.APP_ENV`, and `env.STEP_SPECIFIC_VAR`.
- Evaluates expression functions: `contains()`, `success()`, `failure()`, and `always()` for conditional step execution.

### Module 4: Encrypted Secrets & GITHUB_TOKEN
- Injects non-sensitive variables from `vars.APP_ENV` and encrypted secrets from `secrets.MY_SECRET`.
- Demonstrates automatic log redaction/masking (`***`).
- Leverages temporary auto-generated `secrets.GITHUB_TOKEN` to authenticate against GitHub REST API with elevated repository permissions.

### Module 5: Multi-OS & Self-Hosted Runners
- **5A Multi-OS**: Parallel jobs executing on `ubuntu-latest` (Linux system inspections), `windows-latest` (PowerShell and C# compilation via dotnet), and `macos-latest` (Swift compilation via `swiftc`).
- **5B Self-Hosted Runner**: Dedicated local runner agent registered and deployed on Windows host targeted via `runs-on: self-hosted`.

### Module 6: Matrix Builds, Dependency Caching & Service Containers
- **Matrix Strategy**: Parallel grid testing Node.js versions (`18.x`, `20.x`) across `ubuntu-latest` and `windows-latest`.
- **Dependency Caching**: Utilizes `actions/cache@v4` with cache keys derived from `hashFiles('**/package.json')` to optimize npm restore times.
- **PostgreSQL Service Container**: Spins up ephemeral `postgres:15` container with automated health checks (`pg_isready`) on port 5432 and executes integration test script `client.js`.

### Module 7: Authoring & Compiling Custom JavaScript Actions
- Authoring custom action under `custom-js-action/`:
  - `action.yml`: Declares inputs (`who-to-greet`), outputs (`greeting`, `time`), and runner configuration (`node20`).
  - `index.js`: Implements logic using `@actions/core` and `@actions/github`.
  - Compiled into standalone distribution bundle `custom-js-action/dist/index.js` using `@vercel/ncc`.
- Invoked seamlessly from `.github/workflows/module7-custom-action.yml`.

---

## 4. Verification & Audit Trail

All workflow runs, check runs, and artifacts can be audited live via the GitHub Actions UI:
👉 **[View Actions Execution Runs](https://github.com/aabdulrafay/Github-Examples/actions)**
