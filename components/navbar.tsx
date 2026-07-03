"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/experience", label: "Experience" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-navy-border bg-navy/80 backdrop-blur-md">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6"
      >
        <Link
          href="/"
          className="font-mono text-lg font-bold text-aqua transition-opacity hover:opacity-80"
          aria-label="Adem Şems Asha — home"
        >
          AA<span className="text-heading">.</span>
        </Link>

        <ul className="hidden items-center gap-8 sm:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "font-mono text-sm transition-colors duration-300 hover:text-aqua",
                  pathname === link.href ? "text-aqua" : "text-heading"
                )}
                aria-current={pathname === link.href ? "page" : undefined}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          className="text-heading transition-colors hover:text-aqua sm:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-6 w-6" aria-hidden /> : <Menu className="h-6 w-6" aria-hidden />}
        </button>
      </nav>

      {open ? (
        <ul className="border-t border-navy-border bg-navy px-6 py-4 sm:hidden">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "block py-3 font-mono text-sm transition-colors hover:text-aqua",
                  pathname === link.href ? "text-aqua" : "text-heading"
                )}
                aria-current={pathname === link.href ? "page" : undefined}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </header>
  );
}
