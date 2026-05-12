import { ProjectCard } from "@/components/ProjectCard";
import { SectionHeader } from "@/components/SectionHeader";
import { projects } from "@/data/projects";

export default function ProjectsPage() {
  return (
    <main className="bg-paper text-ink">
      <section className="mx-auto max-w-6xl px-6 py-16 sm:px-10">
        <SectionHeader
          eyebrow="Projects"
          title="A project portfolio built around implementation evidence."
          description="These projects are listed as current portfolio material. Items that are not finished are clearly marked as in progress or research."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </main>
  );
}
