import { capabilities } from "@/data/profile";

export function CapabilityGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {capabilities.map((capability, index) => (
        <article
          key={capability.title}
          className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100 transition duration-300 hover:-translate-y-1 hover:border-sky-200 hover:shadow-lg hover:shadow-slate-200"
        >
          <p className="text-sm text-sky-700">0{index + 1}</p>
          <h3 className="mt-4 text-xl font-semibold text-slate-950">{capability.title}</h3>
          <p className="mt-3 text-sm leading-7 text-slate-600">{capability.description}</p>
        </article>
      ))}
    </div>
  );
}
