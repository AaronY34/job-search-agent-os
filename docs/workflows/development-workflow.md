# Development Workflow

## Purpose

This document defines the standard development workflow for Job Search Agent OS across Mac and PC.

The workflow uses:

- GitHub for source control and synchronization
- Codex for local coding, editing, review, and repository-aware work
- ChatGPT for planning, brainstorming, drafting, and higher-level reasoning
- Vercel for portfolio website deployment
- GitHub Actions for automated progress log generation

## 1. System Architecture Overview

Job Search Agent OS is organized around one GitHub repository with three main subprojects:

- `01-progress-tracking-agent`: Generates local markdown progress logs from session notes and Git evidence.
- `02-portfolio-website`: Hosts the personal portfolio website for profile, projects, resume, and contact.
- `03-job-search-automation`: Future human-in-the-loop job search automation system.

Supporting documentation lives under `docs/`, and shared reusable materials live under `shared/`.

Non-code assets such as resumes, cover letters, screenshots, exported PDFs, and portfolio media belong in the Google Drive project folder unless there is a clear reason to commit optimized web assets.

## 2. Source-Of-Truth Philosophy

GitHub is the source of truth.

Mac and PC are temporary working environments. Either machine may be ahead or behind at any moment, but the repository on GitHub is the canonical version once changes are committed and pushed.

Practical rules:

- Pull from GitHub before starting work.
- Commit meaningful changes locally.
- Push completed work to GitHub before switching devices.
- Treat uncommitted local changes as temporary and at risk.
- Do not rely on chat history as project memory. Store important decisions in repository docs or session notes.

## 3. Start-Of-Session Workflow

At the start of a work session:

1. Open the local repository.
2. Check the current branch:

   ```bash
   git branch --show-current
   ```

3. Check local changes:

   ```bash
   git status --short
   ```

4. Pull the latest remote changes:

   ```bash
   git pull
   ```

5. Read the current source-of-truth docs:

   - `README.md`
   - `AGENTS.md`
   - `docs/architecture.md`
   - `project-roadmap.md`
   - latest files in `docs/progress/daily/`
   - latest files in `docs/progress/session-notes/`

6. Identify the active subproject and task before editing.

## 4. Codex Startup Procedure

When starting Codex in this repository:

1. Ask Codex to read the repository structure and source-of-truth docs before making changes.
2. Confirm the current active task.
3. Confirm whether Codex should edit files or only summarize state.
4. Keep changes scoped to the requested subproject.
5. After meaningful changes, have Codex update the current session note at:

   ```text
   docs/progress/session-notes/YYYY-MM-DD.md
   ```

Codex should not auto-submit job applications, make final resume decisions, or create new external dependencies unless explicitly instructed.

## 5. During-Work Workflow

During active work:

- Work in small, reviewable steps.
- Prefer existing project structure and patterns.
- Keep source code, scripts, docs, and local notes in the repository.
- Keep non-code assets in Google Drive unless they are optimized web assets that should ship with the site.
- Avoid adding framework complexity before it is needed.
- Keep unfinished work clearly labeled as `In Progress`, `Research`, or `Planned`.
- Do not invent metrics, companies, results, or credentials.
- Record important decisions in docs or session notes.

Before finishing a session, review:

```bash
git status --short
```

## 6. Commit/Push Procedure

Before committing:

1. Review changed files:

   ```bash
   git status --short
   ```

2. Review the diff:

   ```bash
   git diff
   ```

3. Run relevant checks when available:

   ```bash
   npm run build
   ```

   or:

   ```bash
   python3 -B 01-progress-tracking-agent/src/main.py --help
   ```

4. Stage only intended files:

   ```bash
   git add <files>
   ```

5. Commit with a clear message:

   ```bash
   git commit -m "Add development workflow SOP"
   ```

6. Push to GitHub:

   ```bash
   git push
   ```

## 7. Cross-Device Synchronization Procedure

Before switching from Mac to PC, or PC to Mac:

1. Finish or pause the current task cleanly.
2. Update the session note if meaningful work happened.
3. Commit changes.
4. Push to GitHub.
5. On the other machine, run:

   ```bash
   git pull
   ```

6. Check status:

   ```bash
   git status --short
   ```

If there are uncommitted changes on the second machine, decide whether to commit, stash, or discard them before pulling.

## 8. Git Conflict Recovery Basics

If `git pull` reports a conflict:

1. Stop and read the conflict message.
2. Check status:

   ```bash
   git status
   ```

3. Open each conflicted file.
4. Look for conflict markers:

   ```text
   <<<<<<<
   =======
   >>>>>>>
   ```

5. Decide what content to keep:

   - Keep local changes if they are newer and correct.
   - Keep remote changes if GitHub is newer and correct.
   - Merge both sides when both contain useful information.

6. Remove all conflict markers.
7. Run checks if the file affects code.
8. Stage the resolved files:

   ```bash
   git add <resolved-files>
   ```

9. Complete the merge:

   ```bash
   git commit
   ```

When unsure, do not force push. Ask for review before continuing.

## 9. Deployment Workflow

The portfolio website is deployed through Vercel from the GitHub repository.

Standard deployment flow:

1. Make changes in `02-portfolio-website/`.
2. Run a local build when possible:

   ```bash
   npm run build
   ```

3. Commit and push to GitHub.
4. Let Vercel build from the connected GitHub repository.
5. Review the Vercel deployment preview or production URL.
6. If deployment fails, read the Vercel build log and fix the repository source rather than editing deployment output.

Vercel project settings should use:

- Project root: `02-portfolio-website`
- Framework: Next.js
- Build command: default Next.js build

## 10. Daily Log Automation Workflow

Daily progress logging is handled by `01-progress-tracking-agent`.

Inputs:

- Session notes in `docs/progress/session-notes/YYYY-MM-DD.md`
- Git commits
- Modified file evidence

Outputs:

- Daily log: `docs/progress/daily/YYYY-MM-DD.md`
- Index: `docs/progress/progress-index.md`

Manual run:

```bash
python3 -B 01-progress-tracking-agent/src/main.py --force
```

Workflow:

1. Keep session notes concise and factual.
2. Run the progress tracker when a daily log needs to be generated or refreshed.
3. Review the generated daily log.
4. Commit the daily log and progress index when they read correctly.
5. Let GitHub Actions handle scheduled or automated runs when configured.

## 11. Recommended Commit Message Style

Use short, specific, action-oriented commit messages.

Recommended format:

```text
Verb object/context
```

Examples:

- `Add development workflow SOP`
- `Polish portfolio homepage layout`
- `Update progress tracker daily summary format`
- `Fix Vercel dependency versions`
- `Document portfolio content rules`

Prefer one clear sentence over vague messages such as:

- `updates`
- `fix stuff`
- `changes`
- `work`

## 12. Emergency Recovery Procedure

If the repository feels broken:

1. Stop editing.
2. Check status:

   ```bash
   git status
   ```

3. Save any important uncommitted work by committing it or copying the content into a temporary local note.
4. Fetch the latest remote state:

   ```bash
   git fetch
   ```

5. Compare local branch to remote:

   ```bash
   git log --oneline --decorate --graph --all -20
   ```

6. Do not run destructive commands such as `git reset --hard` unless you are certain local changes are no longer needed.
7. If a dependency install or build is broken, inspect the exact error first.
8. If Vercel is broken but local build works, compare Node/package versions and Vercel project root settings.
9. If local state is confusing, use GitHub as the recovery anchor and decide whether local uncommitted work should be preserved.

Emergency principle:

GitHub is the recovery point. Local machines are replaceable working copies.
