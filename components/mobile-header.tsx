"use client";

import Link from "next/link";
import { Headphones, HelpCircle, Menu, MessageSquarePlus, X } from "lucide-react";
import { useState } from "react";

export function MobileHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-white/90 px-4 py-3 backdrop-blur lg:hidden">
      <div className="flex h-9 items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="grid size-8 place-items-center rounded-full bg-undp text-[11px] font-medium text-white">
            P
          </div>
          <span>
            <span className="block text-sm font-medium text-ink">
              UniPods AI
            </span>
            <span className="text-[10px] text-slate-500">
              UNDP Hackathon Assistant
            </span>
          </span>
        </Link>
        <button
          type="button"
          className="grid size-9 place-items-center rounded-lg text-slate-600 hover:bg-slate-100"
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? <X className="size-[18px]" /> : <Menu className="size-[18px]" />}
        </button>
      </div>
      {isOpen && (
        <nav className="mt-3 grid gap-1 border-t border-line pt-3">
          <Link
            href="/"
            className="flex h-10 items-center gap-3 rounded-lg px-3 text-sm text-slate-600 hover:bg-slate-100"
            onClick={() => setIsOpen(false)}
          >
            <MessageSquarePlus className="size-[17px]" aria-hidden="true" />
            New Chat
          </Link>
          <Link
            href="/faq"
            className="flex h-10 items-center gap-3 rounded-lg px-3 text-sm text-slate-600 hover:bg-slate-100"
            onClick={() => setIsOpen(false)}
          >
            <HelpCircle className="size-[17px]" aria-hidden="true" />
            FAQ
          </Link>
          <Link
            href="/support"
            className="flex h-10 items-center gap-3 rounded-lg px-3 text-sm text-slate-600 hover:bg-slate-100"
            onClick={() => setIsOpen(false)}
          >
            <Headphones className="size-[17px]" aria-hidden="true" />
            Support
          </Link>
        </nav>
      )}
    </header>
  );
}
