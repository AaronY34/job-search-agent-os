import { backgroundTimeline } from "@/data/profile";

export function BackgroundTimeline() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {backgroundTimeline.map((item) => (
        <article key={`${item.label}-${item.title}`} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-100">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-sky-700">{item.label}</p>
          <h3 className="mt-3 text-lg font-semibold text-slate-950">{item.title}</h3>
          <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
        </article>
      ))}
    </div>
  );
}
