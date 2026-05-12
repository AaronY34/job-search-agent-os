import type { Project } from "@/data/projects";

type FeaturedSystemProps = {
  project: Project;
};

const systemSteps = ["Track", "Tailor", "Review", "Confirm", "Log"];

export function FeaturedSystem({ project }: FeaturedSystemProps) {
  return (
    <section
      id="systems"
      className="grid gap-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-100 lg:grid-cols-[0.9fr_1.1fr] lg:p-8"
    >
      <div>
        <span className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-sm text-sky-800">
          {project.status}
        </span>
        <p className="mt-6 text-sm font-medium uppercase tracking-[0.22em] text-sky-700">
          Featured System
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
          {project.title}
        </h2>
        <p className="mt-5 text-base leading-8 text-slate-700">{project.summary}</p>
        <p className="mt-5 text-sm leading-7 text-slate-600">
          <span className="text-slate-950">Current progress:</span> {project.currentProgress}
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-sky-50/70 p-4">
        <div className="flex items-center justify-between border-b border-sky-100 pb-3">
          <p className="text-sm text-slate-700">Execution System</p>
          <span className="h-2 w-2 rounded-full bg-sky-500 shadow-[0_0_16px_rgba(14,165,233,0.38)]" />
        </div>
        <div className="mt-5 grid gap-3">
          {systemSteps.map((step, index) => (
            <div key={step} className="grid grid-cols-[80px_1fr] gap-3 text-sm">
              <span className="text-sky-700">0{index + 1}</span>
              <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-700">
                {step}
                <div className="mt-2 h-1.5 overflow-hidden bg-sky-50">
                  <div className="h-full bg-sky-400/70" style={{ width: `${42 + index * 10}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
