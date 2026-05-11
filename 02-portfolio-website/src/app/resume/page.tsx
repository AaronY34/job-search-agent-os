import { SectionHeader } from "@/components/SectionHeader";
import { SkillTag } from "@/components/SkillTag";
import { profile } from "@/data/profile";

export default function ResumePage() {
  return (
    <main className="bg-paper text-ink">
      <section className="mx-auto max-w-6xl px-6 py-16 sm:px-10">
        <SectionHeader
          eyebrow="Resume"
          title="Resume content will stay evidence-based."
          description="This page is a web resume shell. It is ready for real experience, education, certifications, and downloadable PDF links when those assets are selected."
        />
        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1fr]">
          <section>
            <h2 className="text-xl font-semibold">Current Highlights</h2>
            <ul className="mt-5 space-y-4 text-sm leading-7 text-ink/70">
              {profile.resumeHighlights.map((item) => (
                <li key={item} className="border-l-2 border-clay/70 pl-4">
                  {item}
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-semibold">Skill Areas</h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {profile.skills.map((skill) => (
                <SkillTag key={skill} label={skill} />
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
