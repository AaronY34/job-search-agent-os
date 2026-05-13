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
const focusAreas = ["IT Implementation", "Workflow Automation", "Data Analysis", "AI-assisted Systems"];

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
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#111827] sm:text-4xl">{title}</h2>
      <p className="mt-5 text-base leading-8 text-[#596574]">{description}</p>
    </div>
  );
}

export default function Home() {
  return (
    <main className="site-shell overflow-hidden text-[#111827]">
      <section className="relative mx-auto grid min-h-[92vh] w-full max-w-[1440px] overflow-hidden px-8 pt-40 sm:px-12 lg:grid-cols-[42%_58%] lg:px-0 lg:pt-0">
        <div className="relative z-10 flex flex-col justify-center pb-12 pt-8 lg:min-h-[92vh] lg:pl-[7vw] lg:pr-6 lg:pt-32">
          <p className="max-w-[520px] text-xs font-semibold uppercase tracking-[0.16em] text-[#8a6f52]">
            {profile.positioning}
          </p>
          <h1 className="mt-9 max-w-[500px] text-[clamp(3.25rem,5vw,4.9rem)] font-bold leading-[0.97] tracking-[-0.04em] text-[#0f172a]">
            Reducing
            <br />
            Complexity
            <br />
            Through Systems
          </h1>
          <p className="mt-8 max-w-[480px] text-[22px] leading-[1.5] text-[#334155] sm:text-2xl">
            {profile.subheadline}
          </p>
          <p className="mt-7 max-w-[500px] text-base leading-[1.8] text-[#64748b] sm:text-[17px]">
            {profile.summary}
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href="#systems"
              className="pale-blue-button rounded-lg px-6 py-3.5 text-center text-sm font-semibold transition"
            >
              View Systems
            </a>
            <Link
              href="/projects"
              className="rounded-lg bg-white/70 px-6 py-3.5 text-center text-sm font-semibold text-[#0f172a] shadow-[0_10px_28px_rgba(85,73,57,0.06)] transition hover:bg-white/90"
            >
              View Projects
            </Link>
          </div>
        </div>
        <div className="relative min-h-[56vh] lg:flex lg:h-[92vh] lg:items-end lg:pt-12">
          <HeroSystemMap />
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] bg-[linear-gradient(180deg,rgba(250,250,248,0),rgba(250,250,248,0.86))] px-8 py-11 sm:px-12 lg:px-[7vw]">
        <div className="h-px w-full bg-[#e8e3da]/70" />
        <p className="eyebrow mb-7 mt-7">Focus Areas</p>
        <div className="grid gap-8 md:grid-cols-4">
          {focusAreas.map((area, index) => (
            <div key={area} className="flex items-center gap-4 text-sm text-[#344154]">
              <span className="flex h-9 w-9 items-center justify-center bg-transparent text-[#8ea0b5]">
                0{index + 1}
              </span>
              {area}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] bg-[linear-gradient(180deg,rgba(247,244,239,0.74),rgba(250,250,248,0.52))] px-8 py-24 sm:px-12 lg:px-[7vw]">
        <div className="relative grid gap-12 lg:grid-cols-[34%_66%] lg:items-center">
          <NarrativeHeader
            eyebrow="Philosophy"
            title="Why systems matter."
            description="Complex work often fails not because people cannot do it, but because workflows are fragmented, repetitive, and hard to start. I design systems that bring structure, clarity, and automation to the right places while keeping human judgment at the center."
          />
          <div className="relative min-h-[360px] shadow-[0_18px_55px_rgba(85,73,57,0.055)]">
            <div className="relative h-full min-h-[360px] overflow-hidden">
              <img
                src="/images/architectural-warm-arch.png"
                alt=""
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(247,244,239,0.18)_0%,rgba(247,244,239,0.06)_9%,transparent_24%,transparent_88%,rgba(247,244,239,0.05)_100%),linear-gradient(180deg,rgba(247,244,239,0.04)_0%,transparent_12%,transparent_90%,rgba(250,250,248,0.10)_100%)]" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24 sm:px-10">
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

      <section className="mx-auto max-w-6xl px-6 py-24 sm:px-10">
        <div className="mb-10">
          <NarrativeHeader
            eyebrow="Workflow Transformation"
            title="The repeatable pattern: reduce friction without removing judgment."
            description="The goal is not to automate people away. The goal is to move repetitive work into a clearer system so attention can go toward decisions, quality, and follow-through."
          />
        </div>
        <WorkflowTransformation />
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24 sm:px-10">
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

      <section className="mx-auto max-w-6xl px-6 py-24 sm:px-10">
        <div className="mb-10">
          <NarrativeHeader
            eyebrow="How I Think"
            title="A working style built around clarity, orchestration, and follow-through."
            description="My strongest work happens where business process, technical systems, data, and people overlap."
          />
        </div>
        <ThinkingPrinciples />
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24 sm:px-10">
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
