import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ExternalLink, FileText } from "lucide-react";
import { LinkedinIcon } from "@/components/icons/linkedin";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Reveal } from "@/components/reveal";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `${site.name} — Digital Marketing Consultant & Founder of DunajMedia`,
  description: `${site.intro} Founder of DunajMedia, Senior Marketing Consultant at Fekra Communications. Based in ${site.location}.`,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${site.name} — Digital Marketing Consultant & Founder of DunajMedia`,
    description: site.intro,
    url: "/",
  },
};

function cvExists() {
  try {
    return fs.existsSync(path.join(process.cwd(), "public", "cv-adem-asha.pdf"));
  } catch {
    return false;
  }
}

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: "Founder at DunajMedia · Senior Marketing Consultant at Fekra Communications",
  url: site.url,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bratislava",
    addressCountry: "SK",
  },
  sameAs: [site.linkedin, site.dunajmedia],
};

export default function HomePage() {
  const hasCv = cvExists();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      {/* Hero */}
      <section className="mx-auto flex max-w-6xl flex-col justify-center px-6 py-24 sm:py-32">
        <Reveal direction="up">
          <p className="font-mono text-aqua">Hi, my name is</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-heading sm:text-6xl">
            {site.name}.
          </h1>
          <p className="mt-3 text-xl font-medium text-body sm:text-2xl">{site.headline}</p>
          <p className="mt-6 max-w-2xl text-body">
            {site.intro} Based in {site.location}.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a href="#cv" className={buttonVariants({ variant: "default" })}>
              view my CV
            </a>
            <Link href="/contact" className={buttonVariants({ variant: "solid" })}>
              Get in touch
            </Link>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Adem Şems Asha on LinkedIn"
              className="text-body transition-all duration-300 hover:-translate-y-0.5 hover:text-aqua"
            >
              <LinkedinIcon className="h-6 w-6" aria-hidden />
            </a>
          </div>
        </Reveal>
      </section>

      {/* About */}
      <section className="mx-auto max-w-6xl px-6 py-16" aria-labelledby="about-heading">
        <Reveal direction="left">
          <h2 id="about-heading" className="text-2xl font-bold text-heading sm:text-3xl">
            <span className="font-mono text-lg text-aqua">01.</span> About
          </h2>
          <div className="mt-6 max-w-3xl space-y-4">
            {site.about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <a
            href={site.dunajmedia}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-6 inline-flex items-center gap-2 font-mono text-sm text-aqua transition-opacity hover:opacity-80"
          >
            See what DunajMedia can build for your business → dunajmedia.sk
            <ExternalLink
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden
            />
          </a>
        </Reveal>
      </section>

      {/* What I do */}
      <section className="mx-auto max-w-6xl px-6 py-16" aria-labelledby="services-heading">
        <Reveal direction="right">
          <h2 id="services-heading" className="text-2xl font-bold text-heading sm:text-3xl">
            <span className="font-mono text-lg text-aqua">02.</span> What I do
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {site.services.map((service, i) => {
            const card = (
              <Card className="h-full hover:-translate-y-1.5 hover:border-aqua/50 hover:shadow-glow">
                <CardHeader>
                  <CardTitle className="flex items-start justify-between gap-2">
                    {service.title}
                    {service.external ? (
                      <ExternalLink className="h-4 w-4 shrink-0 text-aqua" aria-hidden />
                    ) : null}
                  </CardTitle>
                  <CardDescription className="mt-2 leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            );
            return (
              <Reveal key={service.title} direction={i % 2 === 0 ? "left" : "right"} delay={i * 0.1}>
                {service.href ? (
                  <a
                    href={service.href}
                    target={service.external ? "_blank" : undefined}
                    rel={service.external ? "noopener noreferrer" : undefined}
                    className="block h-full"
                    aria-label={`${service.title} — DunajMedia website`}
                  >
                    {card}
                  </a>
                ) : (
                  card
                )}
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* CV */}
      <section id="cv" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-16" aria-labelledby="cv-heading">
        <Reveal direction="left">
          <h2 id="cv-heading" className="text-2xl font-bold text-heading sm:text-3xl">
            <span className="font-mono text-lg text-aqua">03.</span> My CV
          </h2>
          <p className="mt-4 max-w-2xl">
            The full picture — every role, market, and campaign from the last decade.
          </p>
          <div className="mt-6">
            {hasCv ? (
              <a
                href={site.cvPath}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({ variant: "default", size: "lg" })}
              >
                <FileText className="h-5 w-5" aria-hidden />
                view my CV
              </a>
            ) : (
              <p className="font-mono text-sm">
                CV available on request —{" "}
                <Link href="/contact" className="text-aqua transition-opacity hover:opacity-80">
                  contact me
                </Link>
              </p>
            )}
          </div>
        </Reveal>
      </section>

      {/* Highlights */}
      <section className="mx-auto max-w-6xl px-6 py-16" aria-labelledby="highlights-heading">
        <Reveal direction="right">
          <h2 id="highlights-heading" className="text-2xl font-bold text-heading sm:text-3xl">
            <span className="font-mono text-lg text-aqua">04.</span> Highlights
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {site.highlights.map((highlight, i) => (
            <Reveal key={highlight.title} direction={i % 2 === 0 ? "left" : "right"} delay={(i % 2) * 0.1}>
              <Card className="h-full p-6 hover:-translate-y-1.5 hover:border-aqua/50 hover:shadow-glow">
                <h3 className="font-semibold text-heading">{highlight.title}</h3>
                <p className="mt-2 text-sm leading-relaxed">{highlight.description}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="mx-auto max-w-6xl px-6 py-24 text-center" aria-labelledby="cta-heading">
        <Reveal direction="up">
          <h2 id="cta-heading" className="text-2xl font-bold text-heading sm:text-3xl">
            Have a project in mind?
          </h2>
          <p className="mx-auto mt-4 max-w-xl">
            Whether you need a new website, a sharper marketing strategy, or a
            consultant who has done it across three markets — let&apos;s talk.
          </p>
          <div className="mt-8">
            <Link href="/contact" className={buttonVariants({ variant: "solid", size: "lg" })}>
              Get in touch
              <ArrowRight className="h-5 w-5" aria-hidden />
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
