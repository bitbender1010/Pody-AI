"use client";

import { useRef, useState, type ReactNode } from "react";
import { PanelLeft } from "lucide-react";
import { MobileHeader } from "@/components/mobile-header";
import { Sidebar } from "@/components/sidebar";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  const [collapsed, setCollapsed] = useState(false);
  const reopenRef = useRef<HTMLButtonElement>(null);
  const collapseRef = useRef<HTMLButtonElement>(null);

  function toggleSidebar() {
    setCollapsed(!collapsed);
    requestAnimationFrame(() => {
      (collapsed ? collapseRef : reopenRef).current?.focus();
    });
  }
  return (
    <div className="min-h-screen bg-cloud text-ink">
      <div className="flex min-h-screen bg-cloud">
        <Sidebar collapsed={collapsed} onToggle={toggleSidebar} toggleRef={collapseRef} />
        {collapsed && (
          <button ref={reopenRef} type="button" onClick={toggleSidebar}
            aria-label="Expand sidebar" aria-expanded={false} aria-controls="desktop-sidebar" title="Expand sidebar"
            className="fixed left-3 top-3 z-30 hidden size-9 place-items-center rounded-md bg-cloud text-slate-500 hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-undp lg:grid">
            <PanelLeft className="size-[17px]" aria-hidden="true" />
          </button>
        )}
        <div className="flex min-w-0 flex-1 flex-col">
          <MobileHeader />
          {children}
        </div>
      </div>
    </div>
  );
}
