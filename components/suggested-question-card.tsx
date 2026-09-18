import type { LucideIcon } from "lucide-react";

type SuggestedQuestionCardProps = {
  question: string;
  answer: string;
  icon: LucideIcon;
};

export function SuggestedQuestionCard({
  question,
  answer,
  icon: Icon,
}: SuggestedQuestionCardProps) {
  return (
    <button
      className="group flex min-h-14 w-full items-center gap-2 rounded-lg border border-line/60 bg-white/60 px-3 py-2 text-left transition hover:border-slate-300 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-undp"
      type="button"
      title={answer}
    >
      <span
        className="grid size-4 shrink-0 place-items-center text-slate-500"
      >
        <Icon className="size-4" strokeWidth={1.8} aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1 text-[13px] font-normal leading-[1.45] text-slate-700">
        {question}
      </span>
    </button>
  );
}
