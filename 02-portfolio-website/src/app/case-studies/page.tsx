import { CaseStudyCard } from "@/components/CaseStudyCard";
import { SectionHeader } from "@/components/SectionHeader";
import { caseStudies } from "@/data/projects";

export default function CaseStudiesPage() {
  return (
    <main className="bg-paper text-ink">
      <section className="mx-auto max-w-6xl px-6 py-16 sm:px-10">
        <SectionHeader
          eyebrow="Case Studies"
          title="Case study drafts for the work that needs deeper explanation."
          description="These are structured as case study candidates. They avoid fake metrics and will be expanded as real evidence, screenshots, and notes become available."
        />
        <div className="mt-10">
          {caseStudies.map((project) => (
            <CaseStudyCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </main>
  );
}
