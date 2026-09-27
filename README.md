<<<<<<< HEAD
# Dr. Manjinder Sandhu — Senior Interventional Cardiologist Website

> **Official Website & Clinical Patient Portal for Dr. Manjinder Sandhu**  
> *Principal Director – Cardiology, Atrius Cardiac Care • Fortis Memorial Research Institute (FMRI), Gurugram*

---

## 🌟 Overview

This repository contains the Phase 1 web application for **Dr. Manjinder Sandhu**, a renowned Senior Interventional Cardiologist with over 33 years of clinical excellence in **Radial Wrist Angioplasty, TAVR/TAVI Non-Surgical Valve Replacements, Pacemaker/ICD Implants, and Complex Calcified CTO Stenting**.

Built with **Next.js 15 (App Router)**, **TypeScript**, and **Vanilla CSS Design System**, the platform delivers a fast, responsive, patient-reassuring user experience with 100% static HTML prerendering (`output: 'export'`).

---

## ✨ Key Features & Interactive Components

- 🩺 **Transradial Recovery Timeline (`TransradialRecoveryTimeline.tsx`):**  
  Interactive 4-stage stepper (Hour 0 ➔ Hour 2 ➔ Hour 6 ➔ Hour 24) comparing Dr. Sandhu's 99% Wrist-Access Technique with traditional groin entry (immediate walking capability vs flat bedrest).

- 📜 **Scroll Reel Testimonials (`scroll-reel-testimonials.tsx`):**  
  Fluid 3D card reel showcasing patient recovery stories, verified ratings, and video patient testimonials.

- 🚨 **Reassuring Symptom Triage Widget (`SymptomTriageWidget.tsx`):**  
  Interactive patient guidance tool for chest pain, breathlessness, and palpitations, routing directly to the clinical helpline.

- 🏥 **4 Hospital Consultation Centers:**  
  Integrated clinic location details for Fortis FMRI Sector 44 Gurugram, Kalyani Hospital Sector 14, Fortis Manesar, and Fortis Vasant Kunj Delhi.

- ⚡ **60fps Hardware-Accelerated Motion (`ScrollReveal.tsx`):**  
  Zero-lag scroll reveal animations powered by GPU layer compositing (`translate3d` and custom `cubic-bezier(0.22, 1, 0.36, 1)` easing).

- 🏷️ **Context-Aware Logo System:**  
  Automatic brand logo switching (Dark/Black logo asset for light Header canvas, White logo asset for dark Navy Footer).

---

## 🚀 Getting Started

### Prerequisites

- **Node.js:** v18.0.0 or higher
- **npm:** v9.0.0 or higher

### Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/preypatel-ripplica/dr-manjinder-sandhu.git
   cd dr-manjinder-sandhu
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Run Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Build Production Static Export:**
   ```bash
   npm run build
   ```
   Generates 29 prerendered static pages in the `/out` directory ready for deployment on GitHub Pages, Vercel, Netlify, or Nginx.

---

## 📁 Project Structure

```
dr-manjinder-sandhu/
├── public/
│   └── images/               # Cutout assets & doctor photography
├── src/
│   ├── app/                  # Next.js App Router pages (Home, About, Expertise, Treatments, Procedures, Blogs, Contact)
│   ├── components/           # Reusable UI components & interactive widgets
│   │   ├── Header.tsx        # Navigation header with dark logo asset & helpline CTA
│   │   ├── Footer.tsx        # 4-column footer with white logo & social links
│   │   ├── ScrollReveal.tsx  # Global 60fps scroll animation engine
│   │   ├── SymptomTriageWidget.tsx
│   │   └── TransradialRecoveryTimeline.tsx
│   └── data/                 # CMS-shaped local data collections (clinics, treatments, procedures, blogs, testimonials)
├── next.config.ts            # Next.js static export configuration
├── tsconfig.json             # TypeScript compiler settings
└── README.md
```

---

## 📞 Patient Care & Emergency Desk

- **Direct Helpline:** `+91-8130370096`
- **WhatsApp Desk:** `8130370096`
- **Group Practice:** Atrius Cardiac Care (Gurugram & Delhi NCR)

---

## 📄 License & Medical Disclaimer

© 2026 **Dr. Manjinder Sandhu • Atrius Cardiac Care**. All rights reserved.  
*Medical Disclaimer: Content is provided for patient awareness and educational purposes and does not replace direct clinical consultation.*
=======
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
>>>>>>> ea53e95 (Update website design, SEO files, and content)
