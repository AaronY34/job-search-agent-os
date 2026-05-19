# Status Rules

## Principle

Use only the statuses that directly help Aaron move through the day.

## Decision

- `Apply`: prepare this application.
- `Maybe`: revisit if there is time.
- `Skip`: do not apply.
- Blank: not reviewed yet.

## Status

- `Not Started`: no prep has happened yet.
- `Queued`: moved from `Today Intake` to `Apply Queue`.
- `Drafted`: application materials have been drafted.
- `Applied`: Aaron manually submitted the application.
- `Skipped`: Aaron decided not to apply.

## Rules

- The script can set `Queued`.
- Aaron controls final `Applied`.
- The system never auto-submits applications.
- Do not add more statuses unless the daily workflow clearly needs them.

