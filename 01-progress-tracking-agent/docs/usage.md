# Progress Tracking Agent Usage

The final daily log is generated automatically by GitHub Actions. Codex should maintain lightweight session notes after meaningful work sessions so the daily log reads like a project diary instead of a file list.

Session notes live here:

```text
docs/progress/session-notes/YYYY-MM-DD.md
```

Use this template:

```text
docs/progress/session-notes/session-note-template.md
```

Run the generator manually from the repository root:

```bash
python3 01-progress-tracking-agent/src/main.py
```

This creates:

```text
docs/progress/daily/YYYY-MM-DD.md
```

It also updates:

```text
docs/progress/progress-index.md
```

## Optional Flags

Use a specific date:

```bash
python3 01-progress-tracking-agent/src/main.py --date 2026-05-10
```

Overwrite an existing log:

```bash
python3 01-progress-tracking-agent/src/main.py --force
```

Run against a specific repository root:

```bash
python3 01-progress-tracking-agent/src/main.py --project-root /path/to/job-search-agent-os
```

Flags can be combined:

```bash
python3 01-progress-tracking-agent/src/main.py --date 2026-05-10 --force --project-root /path/to/job-search-agent-os
```

## Session Notes

The tracker uses evidence in this priority order:

1. `docs/progress/session-notes/YYYY-MM-DD.md`
2. Git commit messages for the selected date
3. Files modified on the selected date

Codex should update the session note automatically before finishing a meaningful project session. The note should stay concise and should not contain secrets or long raw file lists.

If no session note exists, the tracker falls back to commit messages and changed file areas. That fallback is useful, but less human, because Git cannot know what was planned, tried, or learned.

## Status Rules

- `Done`: at least one Git commit exists for the selected date.
- `Partial`: no commits exist, but working tree files were modified on the selected date.
- `No Activity`: no commits or modified working tree files were detected for the selected date.

## Commit The Generated Log

GitHub Actions can commit the generated log automatically. If you run the tracker manually, review the generated markdown file, then commit the log, index, and any session note changes:

```bash
git add docs/progress/daily/YYYY-MM-DD.md docs/progress/progress-index.md docs/progress/session-notes/YYYY-MM-DD.md
git commit -m "Add daily progress log for YYYY-MM-DD"
```
