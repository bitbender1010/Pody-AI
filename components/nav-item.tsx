"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type NavItemProps = {
  href: string;
  icon: LucideIcon;
  label: string;
};

export function NavItem({ href, icon: Icon, label }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "flex h-10 items-center gap-2.5 rounded-lg px-3 text-sm font-normal transition",
        isActive
          ? "bg-[#F2F6F8] text-ink"
          : "text-slate-600 hover:bg-slate-100/80 hover:text-ink",
      )}
    >
      <Icon className="size-[17px]" strokeWidth={1.8} aria-hidden="true" />
      <span>{label}</span>
    </Link>
  );
}
