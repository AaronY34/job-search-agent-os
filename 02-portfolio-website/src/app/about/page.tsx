import { SectionHeader } from "@/components/SectionHeader";
import { SkillTag } from "@/components/SkillTag";
import { thinkingPrinciples } from "@/data/profile";

const reflectionBlocks = [
  {
    title: "I look for the workflow underneath the problem.",
    body:
      "A messy task usually has a hidden structure: inputs, handoffs, decisions, repeated checks, and moments where people lose momentum. I like making that structure visible enough that it can be improved.",
  },
  {
    title: "Systems should reduce friction without removing judgment.",
    body:
      "Automation is most useful when it handles the repetitive pieces and gives people better context for the decisions that still need care. That human-in-the-loop idea is central to how I think about AI-assisted work.",
  },
  {
    title: "My background sits between people, data, and implementation.",
    body:
      "Psychology helped me think about behavior and decision-making. Business IT gave me implementation language. Computer science and research work gave me tools for structuring information, experiments, and technical workflows.",
  },
];

export default function AboutPage() {
  return (
    <main className="bg-white text-slate-900">
      <section className="relative mx-auto max-w-6xl px-6 py-20 sm:px-10">
        <div className="pointer-events-none absolute inset-y-0 left-6 right-6 border-x border-slate-200/70 sm:left-10 sm:right-10" />
        <div className="relative">
          <SectionHeader
            eyebrow="About"
            title="Understanding the person behind the systems."
            description="I am drawn to the space where human behavior, business operations, data, and technical systems overlap. The work that interests me most is not just building a tool; it is understanding why a workflow feels heavy, where execution breaks down, and how to turn that into something people can actually use."
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl border-t border-slate-200 px-6 py-20 sm:px-10">
        <div className="grid gap-6 lg:grid-cols-3">
          {reflectionBlocks.map((block) => (
            <article key={block.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100">
              <h2 className="text-xl font-semibold tracking-tight text-slate-950">{block.title}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">{block.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 sm:px-10">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-sky-700">Working Model</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">
              Turning ambiguous work into executable systems.
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-600">
              Reducing complexity is not about making work simplistic. It is about giving people a clear path through it: what matters, what repeats, what can be automated, what needs review, and how progress should be tracked.
            </p>
          </div>
          <div className="grid gap-3">
            {thinkingPrinciples.map((principle, index) => (
              <div key={principle} className="rounded-2xl border border-sky-100 bg-sky-50/70 p-5">
                <p className="text-sm text-sky-700">0{index + 1}</p>
                <p className="mt-2 text-sm leading-7 text-slate-700">{principle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20 sm:px-10">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-100 sm:p-8">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-sky-700">Focus Areas</p>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950">
            The through-line is implementation: systems that help people move from intention to execution.
          </h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {[
              "Workflow mapping",
              "ERP/CRM implementation",
              "Data analysis",
              "Dashboard planning",
              "AI-assisted execution",
              "Process documentation",
              "Bilingual stakeholder support",
              "Human-in-the-loop systems",
            ].map((skill) => (
              <SkillTag key={skill} label={skill} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
