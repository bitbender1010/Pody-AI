import Link from "next/link";
import { recentChats } from "@/data/recents";

export function RecentChats() {
  return (
    <div className="border-t border-line pt-5">
      <h2 className="px-2 text-[11px] font-medium uppercase tracking-[0.08em] text-slate-400">Recents</h2>
      <div className="mt-2 space-y-0.5">
        {recentChats.map((chat) => (
          <Link
            href="/"
            key={chat.title}
            className="block rounded-lg px-2 py-2.5 transition hover:bg-slate-100/80"
          >
            <span className="block min-w-0">
              <span className="block truncate text-[13px] font-normal text-slate-700">
                {chat.title}
              </span>
              <span className="mt-0.5 block text-[11px] text-slate-400">
                {chat.time}
              </span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
