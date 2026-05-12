const nodes = [
  { label: "Inputs", x: 18, y: 32 },
  { label: "Workflow", x: 42, y: 22 },
  { label: "Automation", x: 68, y: 38 },
  { label: "Human check", x: 54, y: 62 },
  { label: "Progress", x: 82, y: 72 },
];

export function HeroSystemMap() {
  return (
    <div className="relative min-h-[430px] overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-200">
      <div className="absolute inset-5 overflow-hidden rounded-xl border border-slate-200 bg-sky-50/80">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(14,165,233,0.10)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.10)_1px,transparent_1px)] bg-[size:72px_72px]" />
        <div className="absolute inset-x-0 top-1/2 h-28 -translate-y-1/2 bg-sky-200/35 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/75 blur-xl" />
      </div>
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" aria-hidden="true">
        <path
          d="M18 32 C32 18 50 16 68 38 C62 48 58 55 54 62 C66 62 74 66 82 72"
          fill="none"
          stroke="rgba(14,116,144,0.34)"
          strokeWidth="0.35"
        />
        <path
          d="M18 32 C32 46 42 54 54 62"
          fill="none"
          stroke="rgba(71,85,105,0.2)"
          strokeWidth="0.25"
        />
      </svg>
      <div className="relative h-[390px]">
        {nodes.map((node) => (
          <div
            key={node.label}
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-200 bg-white/90 px-3 py-2 text-xs text-slate-700 shadow-lg shadow-slate-200"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
          >
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-slate-950 shadow-[0_0_16px_rgba(14,165,233,0.28)]" />
            {node.label}
          </div>
        ))}
        <div className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-sky-100 shadow-[0_0_0_12px_rgba(186,230,253,0.55)]">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-lg text-white">
            ↗
          </div>
        </div>
        <p className="absolute bottom-12 left-16 text-4xl font-semibold text-slate-950/10 [writing-mode:vertical-rl] sm:text-5xl">
          Systems Map
        </p>
        <p className="absolute bottom-12 right-16 text-4xl font-semibold text-slate-950 sm:text-5xl">
          Aaron Yang
        </p>
      </div>
      <div className="relative border-t border-slate-200 pt-4 text-xs uppercase tracking-[0.24em] text-slate-500">
        Workflow Orchestration Map
      </div>
    </div>
  );
}
