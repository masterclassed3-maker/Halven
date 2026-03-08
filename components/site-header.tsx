"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/stats", label: "Stats" },
  { href: "/farm", label: "Farm" },
  { href: "/truths", label: "Truths" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-900 bg-black/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="group">
          <div className="flex flex-col">
            <span className="text-lg font-semibold tracking-[0.18em] text-white transition group-hover:text-neutral-200">
              HALVEN
            </span>
            <span className="text-[11px] uppercase tracking-[0.22em] text-neutral-500">
              Scarcity. Emissions. Signal.
            </span>
          </div>
        </Link>

        <nav className="flex items-center gap-2 rounded-2xl border border-neutral-900 bg-neutral-950/80 p-1">
          {navItems.map((item) => {
            const active = isActive(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                  active
                    ? "bg-white text-black"
                    : "text-neutral-300 hover:bg-neutral-900 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}