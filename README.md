# Dr. Manjinder Sandhu — redesigned website

A runnable Next.js 15 / React 19 / TypeScript project with a static production export. The redesign retains the original treatment, procedure, biography, pricing, location, blog, video and patient-story content.

## Run locally

Use Node.js 20.9 or newer.

```sh
npm ci
npm run dev
```

Open http://localhost:3000.

## Production preview

```sh
npm run build
npm start
```

`npm start` serves the static export on http://localhost:3000. Set `PORT` to change the port. The included preview server binds to localhost; deploy the `out/` directory to a static host for a public website. No server-side Next.js service is needed.

A built `out/` directory is included in the delivery, so `node scripts/serve.mjs` can also preview it without installing dependencies. `npm run typecheck` checks TypeScript.

## What changed

- Garnet, ivory and sand design system with editorial serif headings and restrained outline icons.
- Rebuilt homepage hierarchy and shared visual treatment across all original routes.
- Treatment search and category filtering, interactive care explorer and next-step guide.
- Visit preparation controls, FAQs, testimonial navigation, scroll reveals and one-time counters.
- Responsive navigation, focus-managed booking dialog, reduced-motion support and inert collapsed location links.
- Corrected fee-page consultation preselection, default location selection, and handling of unsuccessful form API responses.
- No extra runtime dependencies added.

See DESIGN-SYSTEM.md for the design rules and QA.md for validation.

## Appointments and source content

The appointment form retains the original project's Web3Forms destination and public access key. Requests are only confirmed when the API returns success; failures remain visible and phone/WhatsApp alternatives are provided. The production recipient and actual message delivery were not tested by sending a live request. Confirm the destination with the site owner before launch.

Doctor credentials, procedure counts, fees, schedules, testimonials, case studies, medical guidance and photographs originate from the supplied project. They were retained rather than independently verified. The practice should confirm their currency and publication permissions. No new patient testimonials or clinical outcome claims were fabricated.

The source archive's environment file, repository history and hosting cache were excluded from the deliverable.
