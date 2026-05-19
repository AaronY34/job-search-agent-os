# Resume Version Strategy

## Principle

Use 8-10 master resume versions instead of generating a unique resume for every job.

This keeps daily applications fast, consistent, and easier for Aaron to review. The AI Agent should select the closest master resume version, not rewrite the resume from scratch for every posting.

## Master Resume Versions

| Resume ID | Target Role |
| --- | --- |
| R1 | Systems Analyst |
| R2 | Business Analyst |
| R3 | Project Coordinator |
| R4 | Implementation Coordinator |
| R5 | IT Support / Infrastructure Analyst |
| R6 | Data / Reporting Analyst |
| R7 | Operations / Process Improvement |
| R8 | ERP / CRM / Business Systems |
| R9 | Healthcare IT / Public Sector |
| R10 | General Entry-Level Tech / Ops Hybrid |

## Selection Inputs

The selector should use:

- Job title.
- Role category.
- Application type.
- Job description summary when available.
- Required tools, systems, or domain keywords.

## Selection Output

The selector should return:

- `selected_resume_id`
- `target_role`
- `confidence`
- `reason`
- `backup_resume_id` when useful

## Rules

- Prefer the closest existing master resume version.
- Do not create a new resume version unless a repeated pattern appears across many jobs.
- Do not make final resume edits without Aaron's approval.
- Keep the selected resume visible in Google Sheets.
