import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "@/app/globals.css";
import { AppShell } from "@/components/app-shell";

export const metadata: Metadata = {
  applicationName: "Pody AI",
  appleWebApp: { capable: true, title: "Pody AI", statusBarStyle: "default" },
  icons: { icon: "/icons/icon-192.png", apple: "/icons/apple-touch-icon.png" },
  title: "Pody AI | UniPods AI",
  description: "UNDP Hackathon Assistant for the UniPods AI Innovation Programme.",
};

export const viewport: Viewport = { themeColor: "#FCFCFB" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
