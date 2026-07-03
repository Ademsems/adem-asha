# ademasha.com

Personal website for **Adem Şems Asha** — Founder at DunajMedia, Senior
Marketing Consultant at Fekra Communications.

Built with Next.js 15 (App Router), TypeScript, Tailwind CSS, Framer Motion,
and shadcn-style UI primitives. Contact form email via Resend.

## Local setup

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Environment variables

Copy `.env.example` to `.env.local` and fill in the values:

| Variable | Required | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | For contact form email | API key from [resend.com](https://resend.com). Without it the site still builds and runs — the form shows a friendly fallback with the direct email address. |
| `CONTACT_FROM_EMAIL` | No | Verified sender address once the domain is verified in Resend, e.g. `Adem Asha <hello@ademasha.com>`. Defaults to `Adem Asha Website <onboarding@resend.dev>`. |

Contact form submissions are sent to `ademsems93@gmail.com`.

## Replacing the CV PDF

The "view my CV" button opens `/cv-adem-asha.pdf`. To update the CV, replace:

```
public/cv-adem-asha.pdf
```

keeping the same filename. If the file is removed, the CV section degrades
gracefully to a "CV available on request" note — nothing breaks.

## Content updates

All page copy (hero, about, services, highlights, experience entries,
education) lives in [`content/site.ts`](content/site.ts). Components render
from this typed data, so edits there propagate everywhere.

## OG image

`public/og-image.png` is generated from a branded template. To regenerate
(e.g. after a copy change), run:

```bash
node scripts/generate-og.mjs
```

## Deploying to Vercel

1. Push this repository to GitHub.
2. In Vercel: **Add New → Project**, import the GitHub repo. Framework preset
   "Next.js" is detected automatically — no build settings needed.
3. Add the environment variables (`RESEND_API_KEY`, optionally
   `CONTACT_FROM_EMAIL`) under **Project → Settings → Environment Variables**.
4. Point the `ademasha.com` domain to the project under
   **Project → Settings → Domains**.
5. Once the domain is verified in Resend, set `CONTACT_FROM_EMAIL` to an
   address on that domain so contact emails stop using the
   `onboarding@resend.dev` placeholder.

## Checks

```bash
npm run lint   # ESLint
npm run build  # production build
```
