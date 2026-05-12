type SkillTagProps = {
  label: string;
};

export function SkillTag({ label }: SkillTagProps) {
  return (
    <span className="inline-flex rounded-full border border-sky-100 bg-sky-50 px-3 py-1 text-sm text-slate-600">
      {label}
    </span>
  );
}
