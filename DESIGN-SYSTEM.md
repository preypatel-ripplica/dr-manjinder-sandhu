# Garnet & Ivory

A warm, editorial identity for Dr. Manjinder Sandhu. Restrained garnet communicates the requested red direction; ivory and sand keep large surfaces calm. Photography shows the doctor and practical care contexts, with no invented medical illustrations or stock-photo testimonial collage.

## Foundations

| Role | Token / value | Use |
|---|---|---|
| Brand | `--primary: #873b46` | Primary actions, selected controls, emphasis |
| Brand hover | `--primary-hover: #6b2833` | Hover and active feedback |
| Ink | `--secondary: #302c2c` | Headings |
| Body | `--text-body: #625b59` | Reading text |
| Muted | `--text-muted: #726967` | Supporting text |
| Ivory | `--bg-page: #fffdfa` | Page background |
| Sand | `--bg-soft: #f5f1eb` | Alternating sections |
| Rose | `--bg-rose-tint: #f7ebe8` | Gentle highlights |
| Border | `--border-color: #e3dcd5` | Dividers and fields |

Display type: Georgia, with italic emphasis for selected human-focused phrases. Body: Avenir Next, Avenir, Segoe UI, system sans-serif. Local fonts avoid render-blocking font requests. Body copy generally 14–17px; editorial headings scale fluidly. Reading-width content is limited to 760px.

Spacing tokens: 4, 8, 12, 16, 24, 32, 48, 64, 96px. Desktop sections use 100px vertical spacing, mobile 64px. Containers max out at 1280px with 40px desktop / 22px mobile padding.

Radii: 6px small, 12px medium, 20px large, 28px extra large, pill controls. Portrait arches are reserved for major introductions. Shadows are subtle warm ink; surfaces rely primarily on space and borders.

## Components

- Pill-shaped primary actions use garnet with white text; secondary actions use outline or text links with a directional arrow.
- Lucide outline icons use consistent small sizes and restrained strokes. Icons supplement visible labels.
- Cards contain a single topic and clear action. Avoid decorating every paragraph with an icon.
- Forms use persistent labels, native input semantics, visible focus, required-field validation and clear success/error feedback.
- Treatment pages retain medical explanations inside expandable, numbered sections. Do not replace clinical detail with promotional summaries.
- Navigation separates treatment discovery, doctor information, practical visit information, and the heart journal.
- The homepage moves from reassurance to treatment discovery, doctor background, next-step guidance, visit preparation, experiences, FAQs, and booking.

## Responsive behavior

At 960px, navigation switches to an expandable menu; complex layouts simplify. At 700px, content stacks, treatment selectors use a two-column grid, and the hero becomes vertical. The layout avoids horizontal card carousels for essential information. Tables and long treatment names must fit at 390px.

## Motion and accessibility

Scroll reveals use IntersectionObserver and the Web Animations API without hiding content before JavaScript. Counters animate once. Hover feedback is short, disclosure transitions are restrained, and interactive panels announce changes. Reduced-motion preferences suppress animation. Dialogs trap focus and restore it; collapsed menus and location panels are inert. No autoplaying testimonial carousel. Keyboard-visible focus and a skip link remain available.

Implementation: `src/app/redesign.css` is the final design layer on top of retained page/component layout rules in `globals.css`. Global tokens also restyle existing inline token-based components.

## Readability and interaction revision

Body and patient guidance now use 17px, controls and secondary reading text 16px, supporting metadata 14px, and decorative section labels 12px. Legacy inline text below 14px has been increased. Mobile forms retain a 16px minimum.

The wordmark is a typographic signature with a garnet surname, italic prefix and restrained rule. The heart symbol has been removed. Navigation links have no default underline. Primary buttons use a 14px radius, subtle lower edge, moving arrow and distinct hover/pressed states. Interactive cards, selectors and disclosure controls have visible borders and selection indicators.

Route changes use a 120ms exit and 420ms entrance. Section anchors ease over 450–850ms and can be interrupted by wheel, touch or keyboard input; ordinary scrolling remains native. Interactive treatment, visit, recovery, procedure and testimonial panels transition their size and content over 380ms. The care guide focuses and reveals each new question. All added motion respects reduced-motion preferences.
