type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionHeader({ eyebrow, title, description }: SectionHeaderProps) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? (
        <p className="text-sm font-semibold uppercase text-moss">{eyebrow}</p>
      ) : null}
      <h1 className="mt-3 text-3xl font-semibold leading-tight text-ink sm:text-5xl">
        {title}
      </h1>
      {description ? <p className="mt-5 text-base leading-8 text-ink/70">{description}</p> : null}
    </div>
  );
}
