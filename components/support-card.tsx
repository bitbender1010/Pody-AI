import type { LucideIcon } from "lucide-react";

type SupportCardProps = {
  title: string;
  label: string;
  value: string;
  href: string;
  description: string;
  icon: LucideIcon;
};

export function SupportCard({
  title,
  label,
  value,
  href,
  description,
  icon: Icon,
}: SupportCardProps) {
  return (
    <article className="rounded-xl border border-line bg-white/60 p-4">
      <div className="flex items-start gap-3">
        <div className="grid size-9 place-items-center rounded-lg bg-blue-50/70 text-undp">
          <Icon className="size-4" aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <h2 className="text-sm font-medium text-ink">{title}</h2>
          <p className="mt-0.5 text-xs text-slate-500">{label}</p>
        </div>
      </div>
      <a
        href={href}
        className="mt-4 block break-words text-[13px] font-medium text-undp hover:underline"
      >
        {value}
      </a>
      <p className="mt-2.5 text-[13px] leading-6 text-slate-600">{description}</p>
    </article>
  );
}
