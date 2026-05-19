# Google Sheet Schema

## Overview

Google Sheets is the main UI for the Daily Job Application Operating System. The sheet should be fast to scan and easy to update during a high-volume application day.

The foundation keeps only four tabs:

- `Today Intake`
- `Apply Queue`
- `Resume Versions`
- `Daily Summary`

## Today Intake

Daily job lead inbox. Aaron only needs enough information to decide whether to apply.

Columns:

1. Date
2. Source
3. Company
4. Job Title
5. Job URL
6. Location
7. Category
8. Decision
9. Status
10. Resume
11. Notes

Use:

- `Decision`: Aaron marks `Apply`, `Maybe`, or `Skip`.
- `Status`: the script marks `Queued`; Aaron can later use `Applied` or `Skipped`.
- `Resume`: optional R1-R10 selection.

## Apply Queue

Application preparation list. Only `Apply` rows should move here.

Columns:

1. Queue Date
2. Company
3. Job Title
4. Job URL
5. Category
6. Resume
7. Resume Link
8. Drafts
9. Status
10. Applied Date
11. Notes

Use:

- `Resume Link`: link to the chosen master resume in Google Drive.
- `Drafts`: cover letter draft and short application answers can be pasted here for now.
- `Status`: `Not Started`, `Drafted`, `Applied`, or `Skipped`.

## Resume Versions

Reference table for the 10 master resume versions.

Columns:

1. Resume
2. Target Role
3. Drive File Link
4. Keywords

The actual resume files live in Google Drive.

## Daily Summary

Simple daily counts.

Columns:

1. Date
2. Metric
3. Value

The script writes:

- Jobs found today
- Marked Apply
- Marked Maybe
- Marked Skip
- Queued today
- Applied today

