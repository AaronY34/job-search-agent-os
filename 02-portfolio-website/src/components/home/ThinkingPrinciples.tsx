import { thinkingPrinciples } from "@/data/profile";

export function ThinkingPrinciples() {
  return (
    <div className="grid gap-3 md:grid-cols-5">
      {thinkingPrinciples.map((principle, index) => (
        <div key={principle} className="border-t border-sky-200 pt-4">
          <p className="text-sm text-sky-700">0{index + 1}</p>
          <p className="mt-3 text-sm leading-6 text-slate-600">{principle}</p>
        </div>
      ))}
    </div>
  );
}
