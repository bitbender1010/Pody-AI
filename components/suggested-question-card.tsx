import type { LucideIcon } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const tones = {
  blue: "bg-blue-50 text-blue-600",
  green: "bg-emerald-50 text-emerald-600",
  violet: "bg-violet-50 text-violet-600",
};

type SuggestedQuestionCardProps = {
  question: string;
  answer: string;
  icon: LucideIcon;
  tone: keyof typeof tones;
  onSelect: () => void;
};

export function SuggestedQuestionCard({
  question,
  answer,
  icon: Icon,
  tone,
  onSelect,
}: SuggestedQuestionCardProps) {
  return (
    <button
      className="group flex h-full min-h-[80px] w-full items-start gap-2.5 rounded-[16px] border border-line bg-white px-3 py-3.5 text-left transition hover:border-slate-300 hover:bg-slate-50/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-undp"
      type="button"
      onClick={onSelect}
      title={answer}
    >
      <span
        className={cn("grid size-9 shrink-0 place-items-center rounded-full", tones[tone])}
      >
        <Icon className="size-[18px]" strokeWidth={1.8} aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1 text-[13px] font-normal leading-5 text-ink">
        {question}
      </span>
      <ChevronRight className="size-4 shrink-0 self-center text-slate-400" aria-hidden="true" />
    </button>
  );
}
