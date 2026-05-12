# Progress Tracking Agent

## Goal

Generate concise daily progress logs inside this GitHub repository.

This is the first automation coding practice project inside Job Search Agent OS. V1 intentionally avoids Google Sheets, Google Drive writes, OpenAI, and extra dependencies. It uses lightweight session notes plus deterministic Git evidence so progress logs stay human-readable, reviewable, and easy to commit.

## Current Workflow

Codex work sessions should update a short session note before finishing meaningful work:

```text
docs/progress/session-notes/YYYY-MM-DD.md
```

GitHub Actions can then generate the final daily log automatically. To run the generator manually from the repository root:

```bash
python3 01-progress-tracking-agent/src/main.py
```

The script creates a daily log:

```text
docs/progress/daily/YYYY-MM-DD.md
```

It also updates the index:

```text
docs/progress/progress-index.md
```

## What The Script Does

1. Reads Git commits for the selected date.
2. Reads `docs/progress/session-notes/YYYY-MM-DD.md` if it exists.
3. Detects working tree files modified on the selected date.
4. Generates a short markdown daily log.
5. Saves the log under `docs/progress/daily/`.
6. Updates `docs/progress/progress-index.md`.
7. Refuses to overwrite an existing daily log unless `--force` is passed.

## Status Rules

- `Done`: commits exist for the selected date.
- `Partial`: no commits exist, but working tree files were modified on the selected date.
- `No Activity`: no commits or modified working tree files were detected.

The script does not invent progress. It uses session notes first, then commit messages, then changed file areas as fallback evidence. If no session note exists, the log is less reflective because Git cannot know the useful idea or context behind the work.

## Daily Log Format

Generated logs are intentionally short:

```text
# Daily Log — YYYY-MM-DD

One concise paragraph.

## Achieved
- 3-5 concrete outcomes max.

## Next
- One next step.

## Technical Evidence
- Included only as a short source summary when evidence exists.
```

## Optional Flags

```bash
python3 01-progress-tracking-agent/src/main.py --date 2026-05-10
python3 01-progress-tracking-agent/src/main.py --force
python3 01-progress-tracking-agent/src/main.py --project-root /path/to/job-search-agent-os
```

See `01-progress-tracking-agent/docs/usage.md` for details.

## Current Files

- `src/main.py` generates markdown daily logs from Git evidence.
- `docs/usage.md` explains manual usage, session notes, and commit steps.
- `docs/github-actions-automation.md` explains the cloud automation workflow.
- `requirements.txt` records that V1 has no third-party Python dependencies.
- `../../docs/progress/daily/.gitkeep` keeps the daily log folder in Git.
- `../../docs/progress/session-notes/session-note-template.md` gives Codex a standard session note shape.
- `../../docs/progress/progress-index.md` links to generated daily logs.

## Later V2 Ideas

- Add AI-assisted summary generation after the session-note workflow is reliable.
- Add Google Sheet export after local markdown logs are stable.
- Add tests if the script grows beyond simple deterministic file generation.
