"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { Download, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface InstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

type Installation = {
  installed: boolean;
  ready: boolean;
  install: () => Promise<void>;
  requestInstallInvitation: (options?: { force?: boolean }) => void;
};

const InstallContext = createContext<Installation | null>(null);
const INVITATION_KEY = "pody-install-invitation-seen-v1";

export function usePwaInstall() {
  const context = useContext(InstallContext);
  if (!context) throw new Error("usePwaInstall must be used inside PwaProvider");
  return context;
}

export function PwaProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [installed, setInstalled] = useState(false);
  const [ios, setIos] = useState(false);
  const [promptEvent, setPromptEvent] = useState<InstallPromptEvent | null>(null);
  const [dialogMode, setDialogMode] = useState<"invitation" | "help" | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const seen = useRef(false);
  const dialog = useRef<HTMLDialogElement>(null);

  const rememberInvitation = useCallback(() => {
    seen.current = true;
    try {
      localStorage.setItem(INVITATION_KEY, "1");
    } catch {
      /* Storage may be disabled. */
    }
  }, []);

  useEffect(() => {
    const standalone = window.matchMedia("(display-mode: standalone)");
    const navigatorWithStandalone = navigator as Navigator & { standalone?: boolean };
    const updateDisplayMode = () => {
      if (standalone.matches || navigatorWithStandalone.standalone) setInstalled(true);
    };
    updateDisplayMode();
    setIos(
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
        (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
    );
    try {
      seen.current = localStorage.getItem(INVITATION_KEY) === "1";
    } catch {
      /* Use session memory. */
    }
    setReady(true);

    const beforeInstall = (event: Event) => {
      event.preventDefault();
      setPromptEvent(event as InstallPromptEvent);
    };
    const didInstall = () => {
      setInstalled(true);
      setPromptEvent(null);
      setDialogMode(null);
      rememberInvitation();
    };
    window.addEventListener("beforeinstallprompt", beforeInstall);
    window.addEventListener("appinstalled", didInstall);
    standalone.addEventListener("change", updateDisplayMode);

    if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch((reason) => {
        console.error("Offline support could not be registered:", reason);
      });
    }
    return () => {
      window.removeEventListener("beforeinstallprompt", beforeInstall);
      window.removeEventListener("appinstalled", didInstall);
      standalone.removeEventListener("change", updateDisplayMode);
    };
  }, [rememberInvitation]);

  const requestInstallInvitation = useCallback(
    (options?: { force?: boolean }) => {
      if (!ready || installed) return;
      if (!options?.force && seen.current) return;
      if (!promptEvent && !ios) {
        if (options?.force) {
          setDialogMode("help");
        }
        return;
      }
      rememberInvitation();
      setDialogMode("invitation");
    },
    [ready, installed, promptEvent, ios, rememberInvitation]
  );

  useEffect(() => {
    requestInstallInvitation();
  }, [requestInstallInvitation]);

  useEffect(() => {
    if (installed) setDialogMode(null);
  }, [installed]);

  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    if (dialogMode) {
      if (!element.open) {
        element.showModal();
      }
    } else {
      if (element.open) {
        element.close();
      }
    }
  }, [dialogMode]);

  async function install() {
    if (installed || busy) return;
    rememberInvitation();
    setError("");
    if (!promptEvent) {
      setDialogMode("help");
      return;
    }
    setBusy(true);
    setPromptEvent(null);
    try {
      await promptEvent.prompt();
      await promptEvent.userChoice;
      // appinstalled / standalone detection confirms installation, not the user's choice alone.
      setDialogMode(null);
    } catch {
      setError("The install prompt could not open. Try your browser's install menu instead.");
      setDialogMode("help");
    } finally {
      setBusy(false);
    }
  }

  return (
    <InstallContext.Provider value={{ installed, ready, install, requestInstallInvitation }}>
      {children}
      <dialog
        ref={dialog}
        aria-labelledby="install-title"
        aria-describedby="install-description"
        onCancel={() => setDialogMode(null)}
        onClose={() => setDialogMode(null)}
        onClick={(e) => {
          if (e.target === dialog.current) setDialogMode(null);
        }}
        className="fixed inset-0 m-auto w-[calc(100%-32px)] max-w-sm rounded-xl border border-line bg-white p-5 text-ink shadow-soft backdrop:bg-black/30"
      >
        <div className="flex items-center justify-between gap-3">
          <h2 id="install-title" className="text-base font-medium">
            Install Pody Bot
          </h2>
          <button
            type="button"
            aria-label="Close installation"
            title="Close installation"
            onClick={() => setDialogMode(null)}
            className="grid size-8 place-items-center rounded-md text-slate-500 hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-undp"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        </div>
        <p id="install-description" className="mt-3 text-sm leading-6 text-slate-600">
          {dialogMode === "help"
            ? ios
              ? "Open your browser's Share menu, choose Add to Home Screen, then tap Add. If the option is missing, open this page in Safari."
              : "Open your browser's menu and look for Install Pody Bot, Install app, or Add to Home Screen. If no option is available, try Chrome or Edge."
            : "Add Pody Bot to your home screen for quick access. You can keep using it in your browser too."}
        </p>
        {error && (
          <p role="alert" className="mt-2 text-xs text-red-600">
            {error}
          </p>
        )}
        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={() => setDialogMode(null)}
            className="rounded-md px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-undp"
          >
            {dialogMode === "help" ? "Done" : "Not now"}
          </button>
          {dialogMode === "invitation" && (
            <button
              type="button"
              disabled={busy}
              onClick={() => void install()}
              className="flex items-center gap-2 rounded-md bg-ink px-3 py-2 text-sm text-white hover:bg-slate-800 disabled:opacity-50 focus-visible:outline focus-visible:outline-undp"
            >
              <Download className="size-4" aria-hidden="true" />
              Install
            </button>
          )}
        </div>
      </dialog>
    </InstallContext.Provider>
  );
}

export function InstallAppButton({
  className,
  onSelect,
}: {
  className?: string;
  onSelect?: () => void;
}) {
  const { ready, installed, install } = usePwaInstall();
  if (!ready || installed) return null;
  return (
    <button
      type="button"
      onClick={() => {
        onSelect?.();
        void install();
      }}
      className={cn(
        "mt-1 flex h-10 w-full items-center gap-2.5 rounded-lg px-3 text-sm text-slate-600 hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-undp",
        className
      )}
    >
      <Download className="size-[17px]" aria-hidden="true" />
      Install Pody Bot
    </button>
  );
}
