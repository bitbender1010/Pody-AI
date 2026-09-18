"use client";

import { Headphones, HelpCircle, MessageSquarePlus, PanelLeft } from "lucide-react";
import { NavItem } from "@/components/nav-item";
import { RecentChats } from "@/components/recent-chats";
import type { Ref } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Sidebar({ collapsed, onToggle, toggleRef }: {
  collapsed: boolean;
  onToggle: () => void;
  toggleRef: Ref<HTMLButtonElement>;
}) {
  return (
    <aside id="desktop-sidebar" className={cn("sticky top-0 hidden h-dvh w-[260px] shrink-0 overflow-y-auto overscroll-contain border-r border-line bg-white/70 px-4 py-5 [scrollbar-color:#D8DADC_transparent] [scrollbar-width:thin]", !collapsed && "lg:block")}>
      <div className="flex items-start justify-between">
        <Link href="/" className="flex min-w-0 items-center gap-2.5">
          <div className="grid size-8 shrink-0 place-items-center rounded-full bg-undp text-[11px] font-medium text-white">
            P
          </div>
          <span>
            <span className="block text-sm font-medium text-ink">
              UniPods AI
            </span>
            <span className="block truncate text-[10px] text-slate-500">
              UNDP Hackathon Assistant
            </span>
          </span>
        </Link>
        <button
          ref={toggleRef}
          type="button"
          onClick={onToggle}
          aria-expanded={!collapsed}
          aria-controls="desktop-sidebar"
          className="grid size-8 shrink-0 place-items-center rounded-md text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-undp"
          aria-label="Collapse sidebar"
          title="Collapse sidebar"
        >
          <PanelLeft className="size-[17px]" aria-hidden="true" />
        </button>
      </div>

      <nav className="mt-9 space-y-1">
        <NavItem href="/" icon={MessageSquarePlus} label="New Chat" />
        <NavItem href="/faq" icon={HelpCircle} label="FAQ" />
        <NavItem href="/support" icon={Headphones} label="Support" />
      </nav>

      <div className="mt-8">
        <RecentChats />
      </div>
    </aside>
  );
}
