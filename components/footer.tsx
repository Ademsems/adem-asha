import { LinkedinIcon } from "@/components/icons/linkedin";
import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-navy-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-8 sm:flex-row sm:justify-between">
        <p className="font-mono text-sm text-body">
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
        <a
          href={site.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Adem Şems Asha on LinkedIn"
          className="text-body transition-all duration-300 hover:-translate-y-0.5 hover:text-aqua"
        >
          <LinkedinIcon className="h-5 w-5" aria-hidden />
        </a>
      </div>
    </footer>
  );
}
