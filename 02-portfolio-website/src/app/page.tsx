import Link from "next/link";
import { BackgroundTimeline } from "@/components/home/BackgroundTimeline";
import { CapabilityGrid } from "@/components/home/CapabilityGrid";
import { ContactCTA } from "@/components/home/ContactCTA";
import { FeaturedSystem } from "@/components/home/FeaturedSystem";
import { HeroSystemMap } from "@/components/home/HeroSystemMap";
import { ProjectSystemCard } from "@/components/home/ProjectSystemCard";
import { ThinkingPrinciples } from "@/components/home/ThinkingPrinciples";
import { WorkflowTransformation } from "@/components/home/WorkflowTransformation";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";

const jobSearchSystem = projects.find((project) => project.slug === "job-search-agent-os") ?? projects[0];

function NarrativeHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm font-medium uppercase tracking-[0.22em] text-sky-700">{eyebrow}</p>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">{title}</h2>
      <p className="mt-5 text-base leading-8 text-slate-600">{description}</p>
    </div>
  );
}

export default function Home() {
  return (
    <main className="overflow-hidden bg-white text-slate-900">
      <section className="relative mx-auto min-h-[calc(100vh-81px)] w-full max-w-6xl px-6 pb-20 pt-14 sm:px-10">
        <div className="pointer-events-none absolute inset-y-0 left-6 right-6 border-x border-slate-200/70 sm:left-10 sm:right-10" />
        <div className="pointer-events-none absolute inset-x-0 top-[58%] border-t border-slate-200/70" />

        <div className="reveal relative mx-auto flex max-w-4xl flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-500 shadow-sm">
            <span>{profile.subheadline}</span>
            <span className="font-semibold text-sky-700">Explore systems</span>
          </div>
          <p className="mt-8 text-xs font-medium uppercase tracking-[0.24em] text-sky-700">{profile.positioning}</p>
          <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[0.98] tracking-tight text-slate-950 sm:text-7xl">
            {profile.headline}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600">{profile.summary}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href="#systems"
              className="rounded-lg bg-slate-950 px-5 py-3 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
            >
              View Systems
            </a>
            <Link
              href="/projects"
              className="rounded-lg border border-slate-200 bg-white px-5 py-3 text-center text-sm font-semibold text-slate-800 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
            >
              View Projects
            </Link>
            <a
              href={profile.linkedin}
              className="rounded-lg border border-slate-200 bg-white px-5 py-3 text-center text-sm font-semibold text-slate-800 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
            >
              LinkedIn
            </a>
          </div>
        </div>

        <div className="reveal reveal-delay-1 relative mx-auto mt-20 max-w-5xl">
          <HeroSystemMap />
        </div>
      </section>

      <section className="mx-auto max-w-6xl border-t border-slate-200 px-6 py-20 sm:px-10">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <NarrativeHeader
            eyebrow="Core Philosophy"
            title="Messy work becomes manageable when the system around it is visible."
            description="Complex work often fails because the next step is unclear, information is fragmented, and repetitive decisions drain attention. My work focuses on making the workflow inspectable, repeatable, and easier to start."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <article className="border border-sky-100 bg-white/75 p-6 shadow-sm shadow-sky-100/50">
              <h3 className="text-lg font-semibold text-slate-950">Before</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Scattered documents, manual updates, unclear handoffs, duplicated effort, and decisions that reset every time.
              </p>
            </article>
            <article className="border border-sky-200 bg-sky-50/80 p-6 shadow-sm shadow-sky-100/60">
              <h3 className="text-lg font-semibold text-slate-950">After</h3>
              <p className="mt-3 text-sm leading-7 text-slate-700">
                Structured workflows, clear checkpoints, practical automation, tracked progress, and human approval where it matters.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 sm:px-10">
        <div className="mb-10">
          <NarrativeHeader
            eyebrow="What I Build"
            title="Systems that connect business needs, data, people, and execution."
            description="The through-line is implementation: turning requirements and messy processes into tools, dashboards, workflows, documentation, and operating routines."
          />
        </div>
        <CapabilityGrid />
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 sm:px-10">
        <FeaturedSystem project={jobSearchSystem} />
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 sm:px-10">
        <div className="mb-10">
          <NarrativeHeader
            eyebrow="Workflow Transformation"
            title="The repeatable pattern: reduce friction without removing judgment."
            description="The goal is not to automate people away. The goal is to move repetitive work into a clearer system so attention can go toward decisions, quality, and follow-through."
          />
        </div>
        <WorkflowTransformation />
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 sm:px-10">
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <NarrativeHeader
            eyebrow="Selected Projects"
            title="Practical systems, shown by their current state."
            description="These projects stay honest about what exists now, what is in progress, and what evidence still needs to be added."
          />
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          {projects.map((project) => (
            <ProjectSystemCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 sm:px-10">
        <div className="mb-10">
          <NarrativeHeader
            eyebrow="How I Think"
            title="A working style built around clarity, orchestration, and follow-through."
            description="My strongest work happens where business process, technical systems, data, and people overlap."
          />
        </div>
        <ThinkingPrinciples />
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 sm:px-10">
        <div className="mb-10">
          <NarrativeHeader
            eyebrow="Background"
            title="A cross-domain path through business systems, psychology, computer science, and research operations."
            description="This is the context behind the systems approach, kept concise so the homepage remains a narrative rather than a resume dump."
          />
        </div>
        <BackgroundTimeline />
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 sm:px-10">
        <ContactCTA />
      </section>
    </main>
  );
}
