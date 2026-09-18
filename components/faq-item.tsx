import { ChevronDown } from "lucide-react";

type FAQItemProps = {
  question: string;
  answer: string;
  updatedAt: string;
};

export function FAQItem({ question, answer, updatedAt }: FAQItemProps) {
  return (
    <details className="group rounded-xl border border-line bg-white/60 px-4 py-3.5">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
        <span className="text-sm font-medium leading-6 text-ink">{question}</span>
        <ChevronDown
          className="size-4 shrink-0 text-slate-400 transition group-open:rotate-180"
          aria-hidden="true"
        />
      </summary>
      <p className="mt-3 text-[13px] leading-6 text-slate-600">{answer}</p>
      <p className="mt-3 text-[11px] text-slate-400">
        Last updated {updatedAt}
      </p>
    </details>
  );
}
