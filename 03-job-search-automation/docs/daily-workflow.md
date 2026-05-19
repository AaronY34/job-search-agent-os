# Daily Workflow

## Goal

Run a fast daily application loop that helps Aaron find, sort, prepare, and submit 20-30 entry-level job applications while keeping every final decision manual.

## Morning Startup

### Human

- Open the PC.
- Open Codex or VS Code in the local repository.
- Open the job tracking Google Sheet.
- Review any unfinished rows from the previous day.

### Google Sheet

- Shows the main working tabs: `Today Intake`, `Apply Queue`, `Resume Versions`, and `Daily Summary`.

### Apps Script

- Provides the `Job OS` menu.
- Runs `Setup Sheets` if the workbook needs tabs, headers, formatting, or dropdowns.

## Today Intake

### Human

- Starts the daily intake process from the sheet menu or a manual workflow.
- Reviews job rows as they appear.

### AI Agent

- In the MVP foundation, does not scrape or parse live sources.
- Later, helps collect leads from Gmail job alerts, source lists, company career pages, and supported ATS pages.
- Uses broad filtering only. The goal is to keep plausible entry-level matches and reject only obvious mismatches.

### Google Sheet

- Stores today's job leads in `Today Intake`.
- Each row is a lightweight decision surface with company, title, URL, location, role category, AI recommendation, and human decision fields.

### Apps Script

- Sets up the `Today Intake` headers and dropdowns.
- Later may help import manually pasted URLs or normalized source rows.

## Human Triage

### Human

- Opens each job link quickly.
- Checks whether the job is plausible for an entry-level application.
- Marks `Decision` as `Apply`, `Maybe`, or `Skip`.
- Adds a short note only when useful.

### AI Agent

- Does not override Aaron's decision.
- May suggest a broad category or note later, but the sheet stays minimal.

### Google Sheet

- Keeps all decisions visible in `Today Intake`.
- Uses simple statuses so the sheet remains fast to update.

## Apply Queue

### Human

- Runs **Job OS > Move Apply Rows to Queue** after triage.
- Reviews the `Apply Queue` before preparing applications.

### Apps Script

- Finds `Today Intake` rows where `Decision` is `Apply` and `Status` has not already moved forward.
- Copies required fields to `Apply Queue`.
- Sets `Status` to `Queued` in `Today Intake`.
- Avoids duplicates by checking `Job URL` in `Apply Queue`.
- Shows an alert with counts for rows found, moved, skipped as duplicate, and skipped for missing URL.

### Google Sheet

- `Apply Queue` becomes the active worklist for application prep.

## Resume Version Selection

### AI Agent

- Selects one of the 10 master resume versions from R1-R10.
- Does not create a unique resume for every job.
- Uses job title, role category, application type, and JD summary when available.

### Google Drive

- Stores the actual master resume files.
- Stores final application documents when Aaron chooses to save them.

### Google Sheet

- Records `Resume` and `Resume Link`.

## Application Drafting

### AI Agent

- Drafts a practical cover letter when needed.
- Drafts short application answers from job info and the selected resume version.
- Keeps drafts editable and reviewable.

### Human

- Reviews all drafts.
- Manually copies/pastes answers into the employer application form.
- Manually uploads the chosen resume.
- Manually submits the application.

### Google Sheet

- Stores the selected resume, resume link, draft text, status, applied date, and notes.

## End Of Day

### Human

- Marks submitted rows as `Applied`.
- Adds applied dates.
- Leaves unfinished rows as `Not Started` or `Drafted` for later review.

### Apps Script

- Runs **Job OS > Generate Daily Summary**.

### Google Sheet

- Writes totals to `Daily Summary`, including jobs found, AI keep count, human decisions, queued applications, and applied count.

### AI Agent

- May summarize the day using the daily summary prompt.
- Does not invent applications or outcomes.
