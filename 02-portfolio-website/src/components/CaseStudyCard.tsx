import type { Project } from "@/data/projects";

type CaseStudyCardProps = {
  project: Project;
};

export function CaseStudyCard({ project }: CaseStudyCardProps) {
  return (
    <article className="border-t border-ink/15 py-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-semibold text-ink">{project.title}</h2>
        <span className="text-sm text-moss">{project.status}</span>
      </div>
      <p className="mt-3 text-sm leading-7 text-ink/70">{project.summary}</p>
      <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2">
        <div>
          <dt className="font-semibold text-ink">Role</dt>
          <dd className="mt-1 text-ink/70">{project.role}</dd>
        </div>
        <div>
          <dt className="font-semibold text-ink">Current evidence</dt>
          <dd className="mt-1 text-ink/70">{project.outcome}</dd>
        </div>
      </dl>
    </article>
  );
}
