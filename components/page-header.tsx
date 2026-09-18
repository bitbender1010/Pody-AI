type PageHeaderProps = {
  title: string;
  description: string;
};

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="mx-auto w-full max-w-[800px]">
      <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-slate-400">
        UniPods AI
      </p>
      <h1 className="font-display mt-2 text-[32px] leading-tight text-ink sm:text-[36px]">
        {title}
      </h1>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
        {description}
      </p>
    </div>
  );
}
