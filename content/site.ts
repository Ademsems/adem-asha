/**
 * Single source of truth for all site content. Components render from this
 * data with safe defaults, so updating copy never requires touching JSX.
 */

export type ExperienceEntry = {
  company: string;
  role: string;
  period: string;
  location: string;
  summary?: string;
  bullets: string[];
  cta?: { label: string; href: string };
};

export type ServiceCard = {
  title: string;
  description: string;
  href?: string;
  external?: boolean;
};

export const site = {
  name: "Adem Şems Asha",
  url: "https://ademasha.com",
  headline:
    "Founder at DunajMedia · Senior Marketing Consultant at Fekra Communications",
  location: "Bratislava, Slovakia",
  linkedin: "https://www.linkedin.com/in/adem-%C5%9Fems-asha/",
  dunajmedia: "https://dunajmedia.sk",
  cvPath: "/cv-adem-asha.pdf",

  intro:
    "11+ years in digital marketing — SEO, content strategy, and campaign management across Central Europe, the Middle East, and Turkey.",

  about: [
    "I've spent over a decade in digital marketing, leading SEO, content strategy, and campaign management for clients across Central Europe, the Middle East, and Turkey.",
    "I'm the founder of DunajMedia, a web design agency building professional, SEO-optimised websites for Slovak businesses — law firms, medical clinics, and local service companies that need a strong online presence.",
    "Alongside the agency, I work as a Senior Marketing Consultant at Fekra Communications, leading digital strategy and content for major international clients including GoDaddy and Gorilla Energy.",
  ],

  services: [
    {
      title: "Web Design & Development",
      description:
        "Professional, SEO-optimised websites for Slovak businesses through DunajMedia — from brief to launch, including copywriting, SEO setup, and client handover.",
      href: "https://dunajmedia.sk",
      external: true,
    },
    {
      title: "Digital Marketing Strategy & SEO",
      description:
        "Data-driven marketing strategy and search engine optimisation that grows organic visibility — built on 11+ years of experience across three markets.",
    },
    {
      title: "Content & Campaign Management",
      description:
        "End-to-end content operations and campaign management across Facebook, Instagram, YouTube, LinkedIn, TikTok, and Twitter for international brands.",
    },
  ] satisfies ServiceCard[],

  highlights: [
    {
      title: "GoDaddy at Fekra Communications",
      description:
        "Leading content strategy, SEO, and social media for one of the world's biggest web platforms.",
    },
    {
      title: "Gorilla Energy at Fekra Communications",
      description:
        "Driving digital strategy and content campaigns for a major international energy drink brand.",
    },
    {
      title: "Founded DunajMedia in 2026",
      description:
        "A web design agency building professional, SEO-optimised websites for Slovak businesses.",
    },
    {
      title: "11+ years across three markets",
      description:
        "Digital marketing experience spanning Central Europe, the Middle East, and Turkey.",
    },
  ],

  experience: [
    {
      company: "DunajMedia",
      role: "Founder",
      period: "February 2026 – Present",
      location: "Bratislava, Slovakia",
      summary:
        "Web design agency focused on the Slovak market: professional, SEO-optimised websites for law firms, medical clinics, and local service companies.",
      bullets: [
        "Designs and develops custom websites tailored to Slovak businesses and their local market.",
        "Manages projects end-to-end: brief to launch, including copywriting, SEO setup, and client handover.",
        "Publishes educational content on the DunajMedia blog for Slovak business owners.",
      ],
      cta: { label: "Visit dunajmedia.sk", href: "https://dunajmedia.sk" },
    },
    {
      company: "Fekra Communications",
      role: "Senior Marketing Consultant",
      period: "August 2021 – Present",
      location: "Remote",
      bullets: [
        "Leads digital marketing strategy and content operations for international clients, notably GoDaddy (content strategy, SEO, social media across platforms).",
        "Content campaigns across Facebook, Instagram, YouTube, LinkedIn, TikTok, and Twitter.",
        "SEO strategy and content optimisation for organic visibility; landing page creation and conversion rate optimisation.",
        "Uses Google Analytics and social data to drive campaign decisions; produced instructional video content and newsletter campaigns.",
      ],
    },
    {
      company: "Tarabya British Schools",
      role: "Marketing Consultant",
      period: "August 2019 – July 2021",
      location: "Istanbul, Turkey",
      bullets: [
        "Developed and implemented a comprehensive marketing strategy that significantly increased visibility and enrollment.",
        "Market research on the target demographic to sharpen campaigns; managed social media presence and community growth; coordinated with admissions on promotional materials.",
      ],
    },
    {
      company: "hoponturkey",
      role: "Content Strategy Lead",
      period: "June 2019 – May 2021",
      location: "Istanbul, Turkey",
      bullets: [
        "Directed content strategy positioning Hop On Turkey as a leading travel-industry voice; managed a team of content creators (travel blogs, destination guides, promotional videos); implemented SEO best practices driving organic growth.",
      ],
    },
    {
      company: "WealthGate",
      role: "Digital Marketing Specialist",
      period: "June 2018 – May 2020",
      location: "Cyprus",
      bullets: [
        "Email marketing campaigns, client content optimisation, and ongoing trend/competitor analysis with actionable recommendations.",
      ],
    },
    {
      company: "NTV",
      role: "B2B Digital Marketing Manager",
      period: "January 2017 – June 2018",
      location: "Cyprus",
      bullets: [
        "Brand marketing strategies boosting subscriber acquisition and retention; audience-tailored content; strategic product marketing positioning NTV as an IPTV leader.",
      ],
    },
  ] satisfies ExperienceEntry[],

  education: {
    school: "Girne American University",
    degree: "BASc, International Business Management",
    period: "2012–2016",
  },
} as const;

export type Site = typeof site;
