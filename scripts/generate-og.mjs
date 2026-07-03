// Generates public/og-image.png (1200x630 branded card).
// Run with: node scripts/generate-og.mjs  (requires the `sharp` dev dependency)
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#0A192F"/>
  <rect x="24" y="24" width="1152" height="582" rx="16" fill="none" stroke="#233554" stroke-width="2"/>
  <rect x="80" y="200" width="72" height="6" rx="3" fill="#64FFDA"/>
  <text x="80" y="300" font-family="Segoe UI, Arial, sans-serif" font-size="72" font-weight="700" fill="#CCD6F6">Adem Şems Asha</text>
  <text x="80" y="370" font-family="Segoe UI, Arial, sans-serif" font-size="30" fill="#64FFDA">Founder at DunajMedia · Senior Marketing Consultant</text>
  <text x="80" y="430" font-family="Segoe UI, Arial, sans-serif" font-size="26" fill="#8892B0">11+ years in digital marketing — SEO, content strategy, campaigns</text>
  <text x="80" y="540" font-family="Consolas, monospace" font-size="24" fill="#8892B0">ademasha.com</text>
  <circle cx="1050" cy="150" r="60" fill="none" stroke="#64FFDA" stroke-width="2" opacity="0.35"/>
  <circle cx="1050" cy="150" r="90" fill="none" stroke="#64FFDA" stroke-width="1.5" opacity="0.18"/>
  <circle cx="1050" cy="150" r="120" fill="none" stroke="#64FFDA" stroke-width="1" opacity="0.1"/>
</svg>`;

await sharp(Buffer.from(svg))
  .png()
  .toFile(path.join(root, "public", "og-image.png"));

console.log("Generated public/og-image.png");
