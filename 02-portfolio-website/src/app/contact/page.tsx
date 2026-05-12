import { SectionHeader } from "@/components/SectionHeader";
import { profile } from "@/data/profile";

export default function ContactPage() {
  return (
    <main className="bg-paper text-ink">
      <section className="mx-auto max-w-6xl px-6 py-16 sm:px-10">
        <SectionHeader
          eyebrow="Contact"
          title="Open to implementation, workflow, data, and AI-assisted systems roles."
          description="This page is ready for final contact details once the preferred public email, LinkedIn, and resume links are selected."
        />
        <div className="mt-10 border-t border-ink/15 pt-6 text-sm leading-7 text-ink/70">
          <p>
            <span className="font-semibold text-ink">Positioning:</span> {profile.positioning}
          </p>
          <p>
            <span className="font-semibold text-ink">Location:</span> {profile.location}
          </p>
          <p>
            <span className="font-semibold text-ink">Email:</span> {profile.email}
          </p>
        </div>
      </section>
    </main>
  );
}
