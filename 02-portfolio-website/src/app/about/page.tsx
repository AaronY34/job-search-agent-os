import { SectionHeader } from "@/components/SectionHeader";
import { SkillTag } from "@/components/SkillTag";
import { profile } from "@/data/profile";

export default function AboutPage() {
  return (
    <main className="bg-paper text-ink">
      <section className="mx-auto max-w-6xl px-6 py-16 sm:px-10">
        <SectionHeader
          eyebrow="About"
          title="Practical systems for messy work."
          description="This portfolio is focused on implementation work: clarifying workflows, organizing information, building useful automation, and turning project evidence into something a hiring team can understand."
        />
        <div className="mt-12 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="border-t border-ink/15 pt-6">
            <h2 className="text-xl font-semibold">Working Style</h2>
            <p className="mt-4 text-sm leading-7 text-ink/70">
              I like systems that are simple enough to maintain and clear enough for another person to inspect. The projects here are intentionally labeled by their real state, with unfinished work marked as in progress.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Focus Areas</h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {profile.skills.map((skill) => (
                <SkillTag key={skill} label={skill} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
