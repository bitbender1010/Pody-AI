"use client";

import Link from "next/link";
import Image from "next/image";
import podyLogo from "@/public/pody-bot.png";
import { Headphones, HelpCircle, Menu, MessageSquarePlus, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { RecentChats } from "@/components/recent-chats";
import { InstallAppButton } from "@/components/pwa-provider";

export function MobileHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const drawerRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const drawer = drawerRef.current;
    if (!isOpen) {
      drawer?.close();
      return;
    }
    drawer?.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => { if (desktop.matches) setIsOpen(false); };
    desktop.addEventListener("change", closeOnDesktop);
    closeOnDesktop();
    return () => {
      document.body.style.overflow = previousOverflow;
      desktop.removeEventListener("change", closeOnDesktop);
      drawer?.close();
    };
  }, [isOpen]);

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-white/90 px-4 py-3 backdrop-blur lg:hidden">
      <div className="flex h-9 items-center gap-3">
        <button
          type="button"
          className="grid size-9 place-items-center rounded-lg text-slate-600 hover:bg-slate-100"
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? <X className="size-[18px]" /> : <Menu className="size-[18px]" />}
        </button>
        <Link href="/" className="block min-w-0" aria-label="Pody Bot home">
          <Image src={podyLogo} alt="Pody Bot" className="h-auto w-[120px] max-w-full" sizes="120px" priority />
        </Link>
      </div>
      <dialog
        ref={drawerRef}
        id="mobile-navigation"
        aria-label="Navigation"
        onCancel={() => setIsOpen(false)}
        className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overflow-y-auto overscroll-contain border-0 bg-white px-4 py-3 text-ink backdrop:bg-black/25 open:animate-drawer-in motion-reduce:animate-none"
      >
        <div className="flex h-9 items-center gap-3">
          <button type="button" aria-label="Close navigation" title="Close navigation" onClick={() => setIsOpen(false)}
            className="grid size-9 shrink-0 place-items-center rounded-lg text-slate-600 hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-undp">
            <X className="size-[18px]" aria-hidden="true" />
          </button>
          <Link href="/" className="block min-w-0" aria-label="Pody Bot home" onClick={() => setIsOpen(false)}>
            <Image src={podyLogo} alt="Pody Bot" className="h-auto w-[120px] max-w-full" sizes="120px" />
          </Link>
        </div>
        <nav className="mt-6 grid gap-1">
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
        <InstallAppButton onSelect={() => setIsOpen(false)} />
        <div className="mt-8">
          <RecentChats onSelect={() => setIsOpen(false)} />
        </div>
      </dialog>
    </header>
  );
}
