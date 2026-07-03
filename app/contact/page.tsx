import type { Metadata } from "next";
import { MapPin } from "lucide-react";
import { LinkedinIcon } from "@/components/icons/linkedin";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";
import { SafeImage } from "@/components/safe-image";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.name} — digital marketing consultant and founder of DunajMedia, based in ${site.location}.`,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `Contact · ${site.name}`,
    description: `Get in touch with ${site.name} — digital marketing consultant and founder of DunajMedia.`,
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <Reveal direction="up">
        <h1 className="text-3xl font-bold text-heading sm:text-4xl">Get in touch</h1>
        <p className="mt-4 max-w-2xl">
          Whether it&apos;s a new website, a marketing question, or a role
          you&apos;d like to discuss — my inbox is open. I usually reply within
          a day or two.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-12 md:grid-cols-[1fr_1.4fr]">
        <Reveal direction="left">
          <ul className="space-y-6">
            <li>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 text-heading transition-colors hover:text-aqua"
              >
                <LinkedinIcon className="h-5 w-5 text-aqua" aria-hidden />
                <span className="text-sm">LinkedIn</span>
              </a>
            </li>
            <li className="flex items-center gap-3 text-heading">
              <MapPin className="h-5 w-5 text-aqua" aria-hidden />
              <span className="text-sm">{site.location}</span>
            </li>
          </ul>
          <SafeImage
            src="/images/adem-contact.jpg"
            alt="Adem Şems Asha, digital marketing consultant in Bratislava"
            sizes="(min-width: 768px) 340px, 100vw"
            containerClassName="mt-10 aspect-square w-full max-w-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-aqua/50 hover:shadow-glow"
          />
        </Reveal>

        <Reveal direction="right">
          <ContactForm />
        </Reveal>
      </div>
    </div>
  );
}
