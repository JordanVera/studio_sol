# Fiore — independent florist template (non-ecommerce)

A configurable Next.js 16 App Router project with TypeScript, Tailwind CSS 4, shadcn/Radix dialog components, Framer Motion, and responsive Next Image photography. This is the inquiry-only version: visitors request flowers through the contact form.

## Setup

Use Node 22.13+ and the pnpm version declared in `package.json`.

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Open http://localhost:3000.

| Script | Command |
| --- | --- |
| Development | `pnpm dev` |
| Production build | `pnpm build` |
| Production server | `pnpm start` |
| Lint | `pnpm lint` |

Deploy to any Node host or Vercel.

## Personalize

Edit `src/siteConfig.ts` for business name, location, phone, address, hours, service ZIP codes, and website URL. Edit `src/lib/content.ts` for arrangements and stories; theme tokens and responsive styles are in `src/app/globals.css`. Replace the editorial story, testimonials, and brand wordmark in `src/components/florist/` with approved business content. Set `demo: false` only after replacing sample details to enable indexing and local-business schema. This template intentionally starts noindex.

Reusable components: Header, Footer, ContactCTA, ArrangementCard, Catalog, Gallery/lightbox, ContactForm, Home. Routes: `/`, `/flowers`, `/gallery`, `/about`, `/contact`, `/stories`, `/stories/[slug]`.

## Email inquiries

Set `RESEND_API_KEY`, `CONTACT_FROM_EMAIL` (verified sender), and `CONTACT_TO_EMAIL` on the deployment platform. The contact endpoint validates inputs, includes a spam honeypot and same-origin checks, and sends a plain-text email with reply-to. Missing configuration returns an honest unavailable state, never a simulated success. Before public launch add provider/edge rate limiting or a CAPTCHA appropriate for your traffic; this starter does not promise durable spam throttling.

## Gallery and optional integrations

An `instagram-feed` mount point is present on `/gallery` for a future approved feed provider. The footer links to Instagram; replace it with the business profile. The map currently shows the Portland service area. SMS, subscriptions, uploads, and dark mode are not enabled.

## Photography & sample content

Photos are reference/demo content from third-party pages. Reuse rights are not verified. Replace with your own or licensed photos before public commercial launch. Sources:

- hero.jpg / bouquet-2.jpg: https://www.ayaflowersla.com/products/no-019-rosy-dream
- bouquet-1.jpg: https://www.gracerosefarm.com/products/purity
- bouquet-3.jpg: https://www.guernseyflowersbypost.co.uk/products/orange-tulip-flowers
- bouquet-4.jpg: https://www.rosaprima.com/catalog/aurora-gardens
- studio.jpg: https://www.kocker.com.br/produto/avental-sebastian-caqui.html

Names, address, testimonials, studio story, and arrangements are illustrative. Next Image uses responsive sizes and the standard Next.js image optimizer. Image dimensions are reserved to limit layout shift.

## Accessibility and verification

Semantic navigation, skip link, labeled forms, keyboard-operable controls, focus indicators, Radix lightbox focus management, reduced-motion support, and responsive breakpoints are included. Run `pnpm exec tsc --noEmit` and `pnpm build`. Exercise filtering, lightbox/Escape, arrangement request links, and email delivery. A Lighthouse 90+ score and full WCAG AA conformance require auditing the final branded site and real integrations; they are targets, not certified results.
