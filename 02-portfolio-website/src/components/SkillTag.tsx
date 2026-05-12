type SkillTagProps = {
  label: string;
};

export function SkillTag({ label }: SkillTagProps) {
  return (
    <span className="inline-flex border border-ink/15 bg-white/55 px-3 py-1 text-sm text-ink/75">
      {label}
    </span>
  );
}
