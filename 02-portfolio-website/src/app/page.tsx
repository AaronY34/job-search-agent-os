import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionHeader } from "@/components/SectionHeader";
import { SkillTag } from "@/components/SkillTag";

export default function Home() {
  const featuredProjects = projects.slice(0, 2);

  return (
    <main className="bg-paper text-ink">
      <section className="mx-auto grid min-h-[calc(100vh-81px)] w-full max-w-6xl gap-12 px-6 py-16 sm:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <SectionHeader
            eyebrow={profile.positioning}
            title={profile.name}
            description={profile.summary}
          />
          <div className="mt-8 flex flex-wrap gap-2">
            {profile.focusAreas.map((area) => (
              <SkillTag key={area} label={area} />
            ))}
          </div>
        </div>

        <div className="border border-ink/15 bg-white/55 p-6">
          <p className="text-sm font-semibold uppercase text-steel">Portfolio Map</p>
          <div className="mt-6 space-y-4">
            {["Implementation", "Automation", "Analysis", "AI Systems"].map((item, index) => (
              <div key={item} className="flex items-center gap-4">
                <span className="flex h-9 w-9 items-center justify-center border border-clay/40 bg-clay/10 text-sm text-clay">
                  0{index + 1}
                </span>
                <span className="text-sm text-ink/75">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16 sm:px-10">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="text-2xl font-semibold">Featured Work</h2>
          <p className="text-sm text-ink/60">All active projects are labeled honestly.</p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </main>
  );
}
