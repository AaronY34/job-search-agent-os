import { SectionHeader } from "@/components/SectionHeader";
import { profile } from "@/data/profile";

export default function ContactPage() {
  return (
    <main className="bg-white text-slate-900">
      <section className="relative mx-auto max-w-6xl px-6 py-20 sm:px-10">
        <div className="pointer-events-none absolute inset-y-0 left-6 right-6 border-x border-slate-200/70 sm:left-10 sm:right-10" />
        <div className="relative">
          <SectionHeader
            eyebrow="Contact"
            title="Open to teams building clearer workflows and better execution systems."
            description="A simple way to connect for implementation, workflow automation, data analysis, operations, research coordination, or AI-assisted systems work."
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl border-t border-slate-200 px-6 py-20 sm:px-10">
        <div className="grid gap-5 md:grid-cols-3">
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100 md:col-span-2">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-sky-700">Positioning</p>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950">{profile.positioning}</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Best fit: roles or collaborations that need someone comfortable with messy workflows, structured implementation, data-informed operations, and human-centered automation.
            </p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-sky-700">Location</p>
            <p className="mt-4 text-sm leading-7 text-slate-600">{profile.location}</p>
          </article>
        </div>

        <div className="mt-5 rounded-3xl border border-sky-100 bg-sky-50/70 p-6 sm:p-8">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-950">Connect with Aaron</h2>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href={`mailto:${profile.email}`}
              className="rounded-lg bg-slate-950 px-5 py-3 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
            >
              Email Aaron
            </a>
            <a
              href={profile.linkedin}
              className="rounded-lg border border-slate-200 bg-white px-5 py-3 text-center text-sm font-semibold text-slate-800 transition hover:border-slate-300 hover:bg-slate-50"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
