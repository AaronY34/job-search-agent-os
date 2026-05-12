import type { Project } from "@/data/projects";

type ProjectSystemCardProps = {
  project: Project;
};

export function ProjectSystemCard({ project }: ProjectSystemCardProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-100 transition duration-300 hover:-translate-y-1 hover:border-sky-200 hover:shadow-lg hover:shadow-slate-200">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm text-sky-700">{project.category}</p>
          <h3 className="mt-2 text-xl font-semibold text-slate-950">{project.title}</h3>
        </div>
        <span className="rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs text-sky-800">
          {project.status}
        </span>
      </div>
      <dl className="mt-5 space-y-4 text-sm leading-6">
        <div>
          <dt className="text-slate-950">Problem</dt>
          <dd className="mt-1 text-slate-600">{project.problem}</dd>
        </div>
        <div>
          <dt className="text-slate-950">Role</dt>
          <dd className="mt-1 text-slate-600">{project.role}</dd>
        </div>
        <div>
          <dt className="text-slate-950">Tools</dt>
          <dd className="mt-2 flex flex-wrap gap-2">
            {project.tools.map((tool) => (
              <span key={tool} className="rounded-full border border-sky-100 bg-sky-50 px-2.5 py-1 text-xs text-slate-600">
                {tool}
              </span>
            ))}
          </dd>
        </div>
        <div>
          <dt className="text-slate-950">Current progress</dt>
          <dd className="mt-1 text-slate-600">{project.currentProgress}</dd>
        </div>
      </dl>
    </article>
  );
}
