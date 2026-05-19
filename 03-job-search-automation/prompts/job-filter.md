# Job Filter Prompt

Use this prompt for rough daily filtering only. Keep the filter broad. Reject only jobs that are obviously poor matches.

## Input

- Job title:
- Company:
- Location:
- Remote type:
- Application type:
- Estimated level:
- Role category:
- Job description or summary:

## Task

Decide whether this job should stay in Aaron's daily intake list.

Aaron is an entry-level job seeker targeting practical tech, business systems, operations, implementation, data/reporting, IT support, project coordination, and analyst-style roles.

## Rules

- Keep broad matches.
- Keep jobs that look entry-level, junior, coordinator, analyst, associate, support, implementation, operations, or systems-related.
- Reject jobs that clearly require senior experience, heavy specialized credentials Aaron does not have, unrelated physical labor, commission-only sales, unpaid roles, or obvious spam.
- Do not be overly strict.
- Do not invent missing information.

## Output

Return:

```json
{
  "ai_keep": "Yes or No",
  "role_category": "",
  "estimated_level": "",
  "reason": ""
}
```
