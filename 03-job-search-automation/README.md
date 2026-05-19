# Daily Job Application Operating System

## Purpose

Subproject 03 is a daily job application operating system for high-volume entry-level applications.

The goal is to help Aaron apply to 20-30 relevant jobs per day without turning the process into a heavy recruiting platform. The system should collect job leads, place them in Google Sheets, help Aaron quickly choose Apply / Maybe / Skip, and prepare the materials needed for manual application submission.

This is an efficiency system, not an auto-application system.

## Core Workflow

1. Aaron opens the PC, Codex or VS Code, and the job tracking Google Sheet.
2. The system collects or imports today's job leads from approved sources.
3. Relevant jobs are written into the `Today Intake` sheet.
4. Aaron opens job links, quickly checks details, and marks each row `Apply`, `Maybe`, or `Skip`.
5. The system moves only `Apply` rows into the `Apply Queue`.
6. The system selects the best master resume version from R1-R10.
7. The system drafts a cover letter and short application answers.
8. Aaron manually copies/pastes answers, uploads the chosen resume, and submits applications.
9. Aaron marks applications as `Applied` in Google Sheets.

## Current Foundation Scope

This foundation includes:

- Google Sheet schema documentation.
- Apps Script menu and sheet setup code.
- Today Intake workflow.
- Apply Queue workflow.
- Resume version selector placeholder.
- Application drafting placeholder.
- Daily summary placeholder.
- Prompt templates and example configuration files.

It does not include LinkedIn scraping, Indeed scraping, Gmail parsing, Google API OAuth, secrets, credentials, auto-submit, email sending, or interview follow-up.

## Storage Rules

GitHub repository:

- Scripts.
- Prompt templates.
- Workflow documentation.
- Apps Script source files.
- Example configuration files.

Google Sheet:

- Main UI.
- `Today Intake` for quick Apply / Maybe / Skip decisions.
- `Apply Queue` for rows Aaron chose to apply to.
- `Resume Versions` for R1-R10 master resumes.
- `Daily Summary` for basic counts.

Google Drive:

- Master resume files.
- Final cover letters.
- Final application packages.
- Application-related documents that Aaron needs to access outside the repo.

## First Manual Install Step

Create a Google Sheet, open **Extensions > Apps Script**, paste `apps-script/Code.gs`, save, reload the sheet, and use the **Job OS > Setup Sheets** menu item.

See `apps-script/README.md` for the detailed install steps.

## Documentation

- `docs/daily-workflow.md`
- `docs/google-sheet-schema.md`
- `docs/status-rules.md`
- `docs/resume-version-strategy.md`
- `docs/source-strategy.md`
- `docs/implementation-roadmap.md`
