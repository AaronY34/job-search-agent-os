# Resume Version Selector Prompt

Use this prompt to select one master resume version from R1-R10.

## Resume Versions

- R1 Systems Analyst
- R2 Business Analyst
- R3 Project Coordinator
- R4 Implementation Coordinator
- R5 IT Support / Infrastructure Analyst
- R6 Data / Reporting Analyst
- R7 Operations / Process Improvement
- R8 ERP / CRM / Business Systems
- R9 Healthcare IT / Public Sector
- R10 General Entry-Level Tech / Ops Hybrid

## Input

- Company:
- Job title:
- Role category:
- Application type:
- Location:
- Job description summary:
- Notable keywords:

## Task

Choose the closest master resume version for this job.

## Rules

- Select only one primary resume version.
- Optionally provide one backup resume version.
- Do not create a new resume version.
- Do not rewrite the resume.
- Prefer practical fit over perfect precision.

## Output

Return:

```json
{
  "selected_resume_id": "",
  "target_role": "",
  "confidence": "High, Medium, or Low",
  "reason": "",
  "backup_resume_id": ""
}
```
