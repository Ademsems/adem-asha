import type { Metadata } from "next";
import { ExternalLink, GraduationCap, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/reveal";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Experience",
  description: `Career history of ${site.name}: Founder of DunajMedia, Senior Marketing Consultant at Fekra Communications, and 11+ years of digital marketing roles across Central Europe, the Middle East, and Turkey.`,
  alternates: { canonical: "/experience" },
  openGraph: {
    title: `Experience · ${site.name}`,
    description: `Career history of ${site.name} — 11+ years of digital marketing across three markets.`,
    url: "/experience",
  },
};

export default function ExperiencePage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <Reveal direction="up">
        <h1 className="text-3xl font-bold text-heading sm:text-4xl">Experience</h1>
        <p className="mt-4 max-w-2xl">
          11+ years in digital marketing across Central Europe, the Middle
          East, and Turkey — from IPTV brands in Cyprus to founding a web
          design agency in Bratislava.
        </p>
      </Reveal>

      <div className="relative mt-16">
        {/* Vertical timeline line */}
        <div
          className="absolute top-0 bottom-0 left-4 w-px bg-navy-border md:left-1/2"
          aria-hidden
        />

        <ol className="space-y-12">
          {site.experience.map((entry, i) => {
            const fromLeft = i % 2 === 0;
            return (
              <li key={`${entry.company}-${entry.role}`} className="relative">
                {/* Timeline dot */}
                <span
                  className="absolute top-8 left-4 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-aqua bg-navy md:left-1/2"
                  aria-hidden
                />
                <Reveal
                  direction={fromLeft ? "left" : "right"}
                  className={`pl-12 md:w-1/2 md:pl-0 ${
                    fromLeft ? "md:pr-12" : "md:ml-auto md:pl-12"
                  }`}
                >
                  <Card className="p-6 hover:-translate-y-1.5 hover:border-aqua/50 hover:shadow-glow">
                    <p className="font-mono text-xs text-aqua">{entry.period}</p>
                    <h2 className="mt-2 text-xl font-semibold text-heading">
                      {entry.company}
                    </h2>
                    <p className="mt-1 font-medium text-heading/80">{entry.role}</p>
                    <p className="mt-1 flex items-center gap-1.5 text-sm">
                      <MapPin className="h-3.5 w-3.5 text-aqua" aria-hidden />
                      {entry.location}
                    </p>
                    {entry.summary ? (
                      <p className="mt-4 text-sm leading-relaxed">{entry.summary}</p>
                    ) : null}
                    <ul className="mt-4 space-y-2">
                      {entry.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-2 text-sm leading-relaxed">
                          <span className="mt-1 text-aqua" aria-hidden>
                            ▹
                          </span>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                    {entry.cta ? (
                      <a
                        href={entry.cta.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group mt-5 inline-flex items-center gap-2 font-mono text-sm text-aqua transition-opacity hover:opacity-80"
                      >
                        {entry.cta.label}
                        <ExternalLink
                          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                          aria-hidden
                        />
                      </a>
                    ) : null}
                  </Card>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Education */}
      <section className="mt-20" aria-labelledby="education-heading">
        <Reveal direction="up">
          <h2 id="education-heading" className="text-2xl font-bold text-heading sm:text-3xl">
            Education
          </h2>
          <Card className="mt-6 flex items-start gap-4 p-6 hover:-translate-y-1 hover:border-aqua/50 hover:shadow-glow">
            <GraduationCap className="mt-1 h-6 w-6 shrink-0 text-aqua" aria-hidden />
            <div>
              <h3 className="text-lg font-semibold text-heading">
                {site.education.school}
              </h3>
              <p className="mt-1">{site.education.degree}</p>
              <p className="mt-1 font-mono text-xs text-aqua">{site.education.period}</p>
            </div>
          </Card>
        </Reveal>
      </section>
    </div>
  );
}
