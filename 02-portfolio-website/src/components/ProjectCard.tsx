import type { Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100 transition duration-300 hover:-translate-y-1 hover:border-sky-200 hover:shadow-lg hover:shadow-slate-200">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-sky-700">{project.category}</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">{project.title}</h2>
        </div>
        <span className="rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-sm text-sky-800">
          {project.status}
        </span>
      </div>
      <p className="mt-5 text-sm leading-7 text-slate-600">{project.summary}</p>
      <dl className="mt-6 grid gap-4 text-sm leading-6 sm:grid-cols-2">
        <div>
          <dt className="font-semibold text-slate-950">Problem</dt>
          <dd className="mt-1 text-slate-600">{project.problem}</dd>
        </div>
        <div>
          <dt className="font-semibold text-slate-950">Approach</dt>
          <dd className="mt-1 text-slate-600">{project.role}</dd>
        </div>
        <div>
          <dt className="font-semibold text-slate-950">Tools / workflows</dt>
          <dd className="mt-2 flex flex-wrap gap-2">
            {project.tools.map((tool) => (
              <span key={tool} className="rounded-full border border-sky-100 bg-sky-50 px-2.5 py-1 text-xs text-slate-600">
                {tool}
              </span>
            ))}
          </dd>
        </div>
        <div>
          <dt className="font-semibold text-slate-950">Current progress</dt>
          <dd className="mt-1 text-slate-600">{project.currentProgress}</dd>
        </div>
      </dl>
    </article>
  );
}
