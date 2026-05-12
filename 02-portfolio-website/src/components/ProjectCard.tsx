import type { Project } from "@/data/projects";
import { SkillTag } from "./SkillTag";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="border border-ink/15 bg-white/60 p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-steel">{project.category}</p>
          <h2 className="mt-2 text-xl font-semibold text-ink">{project.title}</h2>
        </div>
        <span className="border border-moss/30 bg-moss/10 px-3 py-1 text-sm text-moss">
          {project.status}
        </span>
      </div>
      <p className="mt-4 text-sm leading-7 text-ink/70">{project.summary}</p>
      <p className="mt-4 text-sm leading-7 text-ink/70">
        <span className="font-semibold text-ink">Current output:</span> {project.outcome}
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        {project.focus.map((item) => (
          <SkillTag key={item} label={item} />
        ))}
      </div>
    </article>
  );
}
