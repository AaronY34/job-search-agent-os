# Implementation Roadmap

## Phase 1: Google Sheet + Apps Script Foundation

Build the operating surface.

- Define Google Sheet tabs and columns.
- Add Apps Script custom menu.
- Add sheet setup, headers, frozen rows, formatting, and dropdowns.
- Move `Apply` rows from `Today Intake` to `Apply Queue`.
- Generate daily summary counts.
- Keep everything credential-free.

## Phase 2: Manual URL Intake

Add a simple manual intake path.

- Let Aaron paste job URLs or small batches of job rows.
- Normalize basic fields into `Today Intake`.
- Keep parsing optional and reviewable.

## Phase 3: Gmail Job Alert Intake

Use job alert emails as a practical source.

- Parse LinkedIn and Indeed alert emails from Gmail.
- Extract job title, company, URL, location, and source.
- Write candidates into `Today Intake`.
- Avoid sending email or changing mailbox state without approval.

## Phase 4: Company/ATS Source List Scanner

Scan selected public sources.

- Use a source inventory for company career pages and ATS pages.
- Add a source tab only if managing sources in the sheet becomes useful.
- Prioritize Greenhouse, Lever, and Ashby where public pages are stable.
- Keep source scanning narrow and easy to debug.

## Phase 5: Apply Queue Package Generation

Prepare application materials for selected rows.

- Select R1-R10 resume versions.
- Draft cover letters when needed.
- Draft short application answers.
- Store links or drafts in Google Sheet and Google Drive.

## Phase 6: Daily Summary And Refinement

Improve the daily operating loop.

- Summarize intake, queue, and applied counts.
- Identify bottlenecks.
- Refine source quality.
- Keep the workflow fast enough for 20-30 applications per day.
