"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/builder", label: "Builder" },
  { href: "/preview", label: "Preview" },
  { href: "/proof", label: "Proof" },
];

export function AppNav() {
  const pathname = usePathname();

  // Don't show AppNav on /rb/* routes (they have their own layout)
  if (pathname?.startsWith("/rb/")) {
    return null;
  }

  return (
    <header className="border-b border-[#2b2118] bg-[#f7f6f3]/95 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link
          href="/"
          className="font-semibold tracking-tight font-serif text-[#2b2118] hover:text-[#8b0000] transition"
        >
          AI Resume Builder
        </Link>
        <nav className="flex items-center gap-1" aria-label="Main">
          {navItems.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`px-3 py-2 text-sm font-medium rounded-md transition ${
                  isActive
                    ? "bg-[#8b0000]/10 text-[#8b0000]"
                    : "text-[#6e6256] hover:text-[#2b2118] hover:bg-[#2b2118]/5"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
