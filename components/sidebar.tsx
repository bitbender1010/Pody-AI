"use client";

import { Headphones, HelpCircle, MessageSquarePlus, PanelLeft } from "lucide-react";
import { NavItem } from "@/components/nav-item";
import { RecentChats } from "@/components/recent-chats";
import type { Ref } from "react";
import Link from "next/link";
import Image from "next/image";
import podyLogo from "@/public/pody-bot.png";
import { cn } from "@/lib/utils";
import { InstallAppButton } from "@/components/pwa-provider";

export function Sidebar({ collapsed, onToggle, toggleRef }: {
  collapsed: boolean;
  onToggle: () => void;
  toggleRef: Ref<HTMLButtonElement>;
}) {
  return (
    <aside id="desktop-sidebar" className={cn("sticky top-0 hidden h-dvh w-[260px] shrink-0 overflow-y-auto overscroll-contain border-r border-line bg-white/70 px-4 py-5 [scrollbar-color:#D8DADC_transparent] [scrollbar-width:thin]", !collapsed && "lg:block")}>
      <div className="flex items-start justify-between">
        <Link href="/" className="block min-w-0" aria-label="Pody Bot home">
          <Image src={podyLogo} alt="Pody Bot" className="h-auto w-[120px] max-w-full" sizes="160px" priority />
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
      <InstallAppButton />

      <div className="mt-8">
        <RecentChats />
      </div>
    </aside>
  );
}
