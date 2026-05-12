import { profile } from "@/data/profile";

export function ContactCTA() {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-xl shadow-slate-100 sm:p-10">
      <p className="text-sm font-medium uppercase tracking-[0.22em] text-sky-700">Connect</p>
      <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
        Open to teams building clearer workflows, better systems, and practical AI-assisted execution.
      </h2>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <a
          href={`mailto:${profile.email}`}
          className="rounded-lg bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
        >
          Email Aaron
        </a>
        <a
          href={profile.linkedin}
          className="rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition hover:border-slate-300 hover:bg-slate-50"
        >
          LinkedIn
        </a>
      </div>
    </section>
  );
}
