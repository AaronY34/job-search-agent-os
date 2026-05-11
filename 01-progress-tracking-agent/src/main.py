#!/usr/bin/env python3
"""Generate deterministic daily diary logs from repo evidence."""

from __future__ import annotations

import argparse
import subprocess
from dataclasses import dataclass
from datetime import date, datetime, time
from pathlib import Path


STATUS_NO_ACTIVITY = "No Activity"
STATUS_PARTIAL = "Partial"
STATUS_DONE = "Done"
SESSION_SECTIONS = ("Planned", "Tried", "Made", "Learned", "Friction", "Next", "Evidence")


@dataclass(frozen=True)
class Commit:
    sha: str
    subject: str


@dataclass(frozen=True)
class SessionNote:
    path: str
    sections: dict[str, list[str]]


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Generate a markdown daily diary log from session notes and Git evidence."
    )
    parser.add_argument(
        "--date",
        default=date.today().isoformat(),
        help="Log date in YYYY-MM-DD format. Defaults to today.",
    )
    parser.add_argument(
        "--force",
        action="store_true",
        help="Overwrite an existing daily log for the selected date.",
    )
    parser.add_argument(
        "--project-root",
        default="",
        help="Path to the repository root. Defaults to auto-detection from the current directory.",
    )
    return parser.parse_args()


def parse_log_date(value: str) -> date:
    try:
        return datetime.strptime(value, "%Y-%m-%d").date()
    except ValueError as exc:
        raise SystemExit("Date must use YYYY-MM-DD format.") from exc


def run_git(project_root: Path, args: list[str]) -> list[str]:
    result = subprocess.run(
        ["git", "-C", str(project_root), *args],
        check=False,
        capture_output=True,
        text=True,
    )
    if result.returncode != 0:
        message = result.stderr.strip() or result.stdout.strip()
        raise RuntimeError(f"Git command failed: git {' '.join(args)}\n{message}")
    return [line for line in result.stdout.splitlines() if line.strip()]


def resolve_project_root(requested_root: str) -> Path:
    if requested_root:
        root = Path(requested_root).expanduser().resolve()
    else:
        result = subprocess.run(
            ["git", "rev-parse", "--show-toplevel"],
            check=False,
            capture_output=True,
            text=True,
        )
        if result.returncode == 0 and result.stdout.strip():
            root = Path(result.stdout.strip()).resolve()
        else:
            root = Path.cwd().resolve()

    try:
        inside_work_tree = run_git(root, ["rev-parse", "--is-inside-work-tree"])
    except RuntimeError as exc:
        raise SystemExit(f"{root} is not a Git work tree or Git is unavailable.\n{exc}") from exc

    if inside_work_tree[:1] != ["true"]:
        raise SystemExit(f"{root} is not a Git work tree.")

    return root


def day_bounds(log_date: date) -> tuple[str, str]:
    start = datetime.combine(log_date, time.min).isoformat()
    end = datetime.combine(log_date, time.max).isoformat()
    return start, end


def get_commits(project_root: Path, log_date: date) -> list[Commit]:
    since, until = day_bounds(log_date)
    lines = run_git(
        project_root,
        ["log", f"--since={since}", f"--until={until}", "--pretty=format:%h%x09%s"],
    )
    commits: list[Commit] = []
    for line in lines:
        sha, _, subject = line.partition("\t")
        if sha and subject:
            commits.append(Commit(sha=sha.strip(), subject=subject.strip()))
    return commits


def get_commit_files(project_root: Path, log_date: date) -> list[str]:
    since, until = day_bounds(log_date)
    lines = run_git(
        project_root,
        ["log", f"--since={since}", f"--until={until}", "--pretty=format:", "--name-only"],
    )
    return sorted(set(line.strip() for line in lines if line.strip()))


def get_candidate_working_files(project_root: Path) -> list[str]:
    lines = run_git(project_root, ["status", "--porcelain", "--untracked-files=all"])
    files: list[str] = []
    for line in lines:
        if len(line) < 4:
            continue
        path_text = line[3:].strip()
        if " -> " in path_text:
            path_text = path_text.split(" -> ", 1)[1].strip()
        path_text = path_text.strip('"')
        if path_text:
            files.append(path_text)
    return sorted(set(files))


def was_modified_on(path: Path, log_date: date) -> bool:
    if not path.exists() or path.is_dir():
        return False
    modified_at = datetime.fromtimestamp(path.stat().st_mtime).date()
    return modified_at == log_date


def get_modified_files(project_root: Path, log_date: date) -> list[str]:
    files = []
    for relative_path in get_candidate_working_files(project_root):
        absolute_path = project_root / relative_path
        if was_modified_on(absolute_path, log_date):
            files.append(relative_path)
    return sorted(set(files))


def clean_bullet(line: str) -> str:
    return line.strip().lstrip("-* ").strip()


def parse_session_sections(content: str) -> dict[str, list[str]]:
    sections: dict[str, list[str]] = {section: [] for section in SESSION_SECTIONS}
    current_section = ""

    for raw_line in content.splitlines():
        line = raw_line.strip()
        if line.startswith("## "):
            heading = line[3:].strip()
            current_section = heading if heading in sections else ""
            continue
        if not current_section:
            continue
        value = clean_bullet(line)
        if value:
            sections[current_section].append(value)

    return sections


def read_session_note(project_root: Path, log_date: date) -> SessionNote | None:
    relative_path = Path("docs") / "progress" / "session-notes" / f"{log_date.isoformat()}.md"
    note_path = project_root / relative_path
    if not note_path.exists():
        return None

    content = note_path.read_text(encoding="utf-8").strip()
    if not content:
        return None

    sections = parse_session_sections(content)
    if not any(sections.values()):
        return None

    return SessionNote(path=relative_path.as_posix(), sections=sections)


def unique_sorted(values: list[str]) -> list[str]:
    return sorted(set(value for value in values if value.strip()))


def bullet_list(values: list[str], empty_text: str = "None detected.") -> str:
    if not values:
        return f"- {empty_text}"
    return "\n".join(f"- {value}" for value in values)


def commit_list(commits: list[Commit]) -> str:
    if not commits:
        return "- None"
    return "\n".join(f"- `{commit.sha}` — {commit.subject}" for commit in commits)


def changed_area(path_text: str) -> str:
    parts = path_text.split("/")
    if len(parts) == 1:
        return "repository root"
    if parts[0] == "docs" and len(parts) >= 3:
        return "/".join(parts[:3])
    if parts[0].startswith(("01-", "02-", "03-")) and len(parts) >= 2:
        return "/".join(parts[:2])
    return parts[0]


def summarize_changed_areas(files: list[str]) -> list[str]:
    if not files:
        return []
    if len(files) <= 4:
        return files

    area_counts: dict[str, int] = {}
    for file_path in files:
        area = changed_area(file_path)
        area_counts[area] = area_counts.get(area, 0) + 1

    return [
        f"{area} ({count} file{'s' if count != 1 else ''})"
        for area, count in sorted(area_counts.items())
    ]


def section_values(session_note: SessionNote | None, section: str) -> list[str]:
    if not session_note:
        return []
    return session_note.sections.get(section, [])


def fallback_made(commits: list[Commit], changed_areas: list[str]) -> list[str]:
    if commits:
        return [commit.subject for commit in commits[:5]]
    if changed_areas:
        return [f"Updated {area}" for area in changed_areas]
    return []


def fallback_next(session_note: SessionNote | None, status: str) -> str:
    note_next = section_values(session_note, "Next")
    if note_next:
        return note_next[0]
    if status == STATUS_DONE:
        return "Review the generated daily log and commit it if it reads accurately."
    if status == STATUS_PARTIAL:
        return "Finish or commit the in-progress work, then rerun the tracker."
    return "Choose the next project task and record a session note after meaningful progress."


def determine_status(session_note: SessionNote | None, commits: list[Commit], files: list[str]) -> str:
    if commits or section_values(session_note, "Made"):
        return STATUS_DONE
    if session_note or files:
        return STATUS_PARTIAL
    return STATUS_NO_ACTIVITY


def first_values(*groups: list[str], limit: int) -> list[str]:
    values: list[str] = []
    seen: set[str] = set()
    for group in groups:
        for value in group:
            normalized = value.strip()
            key = normalized.lower()
            if normalized and key not in seen:
                values.append(normalized)
                seen.add(key)
            if len(values) == limit:
                return values
    return values


def build_summary(
    session_note: SessionNote | None,
    planned: list[str],
    made: list[str],
    learned: list[str],
    commits: list[Commit],
    changed_areas: list[str],
) -> str:
    if session_note:
        sentences = []
        if made:
            made_items = [lower_first(value) for value in made[:2]]
            if len(made_items) == 1:
                sentences.append(f"Today I worked on {made_items[0]}.")
            else:
                sentences.append(f"Today I worked on {made_items[0]}, and I also worked on {made_items[1]}.")
        if planned:
            sentences.append(f"The main focus was to {lower_first(planned[0])}.")
        if learned:
            sentences.append(f"A useful takeaway was that {lower_first(learned[0])}.")
        if sentences:
            return " ".join(sentences)

    if commits:
        return ensure_period(f"Today I made progress through {sentence_join([commit.subject for commit in commits[:2]])}")
    if changed_areas:
        return ensure_period(f"Today I worked on {sentence_join(changed_areas[:3])}")
    return "No progress activity was detected for this date."


def should_include_technical_evidence(
    session_note: SessionNote | None,
    commits: list[Commit],
    changed_areas: list[str],
) -> bool:
    return bool(session_note or commits or changed_areas)


def technical_evidence(
    session_note: SessionNote | None,
    commits: list[Commit],
    changed_areas: list[str],
) -> str:
    lines = ["## Technical Evidence"]
    if session_note:
        lines.extend(["", f"- Session note: `{session_note.path}`"])
    if commits:
        commit_text = "; ".join(f"`{commit.sha}` — {commit.subject}" for commit in commits[:3])
        extra = f" and {len(commits) - 3} more" if len(commits) > 3 else ""
        lines.append(f"- Commits: {commit_text}{extra}")
    if changed_areas:
        lines.append(f"- Changed areas: {sentence_join(changed_areas[:5])}")
    return "\n".join(lines)


def render_log(
    log_date: date,
    session_note: SessionNote | None,
    commits: list[Commit],
    commit_files: list[str],
    modified_files: list[str],
) -> tuple[str, str]:
    files = unique_sorted(commit_files + modified_files)
    changed_areas = summarize_changed_areas(files)
    status = determine_status(session_note, commits, files)

    planned = section_values(session_note, "Planned")
    made = first_values(
        section_values(session_note, "Made"),
        section_values(session_note, "Evidence"),
        fallback_made(commits, changed_areas),
        limit=5,
    )
    learned = section_values(session_note, "Learned")
    next_step = fallback_next(session_note, status)
    summary = build_summary(
        session_note=session_note,
        planned=planned,
        made=made,
        learned=learned,
        commits=commits,
        changed_areas=changed_areas,
    )

    sections = [
        f"# Daily Log — {log_date.isoformat()}",
        "",
        summary,
        "",
        "## Achieved",
        bullet_list(made, empty_text="No concrete outcomes detected."),
        "",
        "## Next",
        f"- {next_step}",
    ]

    if should_include_technical_evidence(session_note, commits, changed_areas):
        sections.extend(["", technical_evidence(session_note, commits, changed_areas)])

    return "\n".join(sections) + "\n", status


def sentence_join(values: list[str]) -> str:
    clean_values = [value.rstrip(".") for value in values if value.strip()]
    if not clean_values:
        return "no recorded items"
    if len(clean_values) == 1:
        return clean_values[0]
    if len(clean_values) == 2:
        return f"{clean_values[0]} and {clean_values[1]}"
    return ", ".join(clean_values[:-1]) + f", and {clean_values[-1]}"


def lower_first(value: str) -> str:
    value = value.strip().rstrip(".")
    if not value:
        return value
    return value[0].lower() + value[1:]


def ensure_period(value: str) -> str:
    value = value.strip()
    if not value:
        return value
    if value[-1] in ".!?":
        return value
    return f"{value}."


def write_log(project_root: Path, log_date: date, content: str, force: bool) -> Path:
    output_dir = project_root / "docs" / "progress" / "daily"
    output_dir.mkdir(parents=True, exist_ok=True)
    output_path = output_dir / f"{log_date.isoformat()}.md"

    if output_path.exists() and not force:
        raise SystemExit(f"{output_path} already exists. Re-run with --force to overwrite it.")

    output_path.write_text(content, encoding="utf-8")
    return output_path


def update_index(project_root: Path, log_date: date, status: str) -> Path:
    index_path = project_root / "docs" / "progress" / "progress-index.md"
    index_path.parent.mkdir(parents=True, exist_ok=True)

    entry = f"- [{log_date.isoformat()}](daily/{log_date.isoformat()}.md) - {status}"
    if index_path.exists():
        lines = index_path.read_text(encoding="utf-8").splitlines()
    else:
        lines = ["# Progress Index", "", "Daily generated progress logs.", ""]

    lines = [line for line in lines if not line.startswith(f"- [{log_date.isoformat()}]")]
    lines.append(entry)

    header = lines[:4]
    entries = sorted(
        [line for line in lines[4:] if line.startswith("- [")],
        reverse=True,
    )
    index_path.write_text("\n".join(header + entries) + "\n", encoding="utf-8")
    return index_path


def main() -> int:
    args = parse_args()
    log_date = parse_log_date(args.date)
    project_root = resolve_project_root(args.project_root)

    session_note = read_session_note(project_root, log_date)
    commits = get_commits(project_root, log_date)
    commit_files = get_commit_files(project_root, log_date)
    modified_files = get_modified_files(project_root, log_date)

    content, status = render_log(
        log_date=log_date,
        session_note=session_note,
        commits=commits,
        commit_files=commit_files,
        modified_files=modified_files,
    )
    output_path = write_log(project_root, log_date, content, args.force)
    index_path = update_index(project_root, log_date, status)

    print(f"Daily progress log written: {output_path}")
    print(f"Progress index updated: {index_path}")
    print(f"Status: {status}")
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except FileNotFoundError as exc:
        if exc.filename == "git":
            raise SystemExit("Git was not found. Install Git and run this script inside the repository.")
        raise
