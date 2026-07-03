import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { LinkedinIcon } from "@/components/icons/linkedin";
import { site } from "@/content/site";

const pageLinks = [
  { href: "/", label: "Home" },
  { href: "/experience", label: "Experience" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-navy-border">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <nav
          aria-label="Footer"
          className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between"
        >
          <ul className="flex flex-wrap items-center justify-center gap-6">
            {pageLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-mono text-sm text-heading transition-colors duration-300 hover:text-aqua"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="flex items-center gap-6">
            <li>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-mono text-sm text-heading transition-all duration-300 hover:-translate-y-0.5 hover:text-aqua"
              >
                <LinkedinIcon className="h-4 w-4" aria-hidden />
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href={site.dunajmedia}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-mono text-sm text-heading transition-all duration-300 hover:-translate-y-0.5 hover:text-aqua"
              >
                <ExternalLink className="h-4 w-4" aria-hidden />
                DunajMedia
              </a>
            </li>
          </ul>
        </nav>
        <p className="mt-8 text-center font-mono text-sm text-body">
          powered by{" "}
          <a
            href={site.dunajmedia}
            target="_blank"
            rel="noopener noreferrer"
            className="text-aqua transition-opacity duration-300 hover:opacity-80"
          >
            DunajMedia
          </a>
        </p>
      </div>
    </footer>
  );
}
