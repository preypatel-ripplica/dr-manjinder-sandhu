"use client";
import { useState } from "react";
import { usePanelMotion } from "@/hooks/usePanelMotion";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
const steps = [
  {
    label: "Before your visit",
    title: "Arrive with a little clarity.",
    text: "The appointment desk will confirm your location and time. Keep your existing health information together for the consultation.",
    items: [
      "Previous prescriptions and reports",
      "A list of your current medicines",
      "The questions you want to ask",
    ],
    image: "/images/patient-care.jpg",
    alt: "A couple reviewing information together",
  },
  {
    label: "Your consultation",
    title: "Time to listen. Space to ask.",
    text: "Discuss your concerns and medical history with Dr. Sandhu. Your existing reports help shape a conversation about your options.",
    items: [
      "Talk through your concerns",
      "Review your existing investigations",
      "Discuss the next steps together",
    ],
    image: "/images/dr-sandhu-office.png",
    alt: "Dr. Sandhu in his consultation room",
  },
  {
    label: "Your next steps",
    title: "Leave knowing what comes next.",
    text: "Keep your consultation notes and prescriptions together. Contact the appointment desk when you need to arrange a follow-up.",
    items: [
      "Keep your care plan handy",
      "Note any advised investigations",
      "Arrange your follow-up appointment",
    ],
    image: "/images/heart-consultation-warm.jpg",
    alt: "Illustrative clinician using a phone to review care information",
  },
];
export function VisitJourney() {
  const [active, setActive] = useState(0);
  const panelRef = usePanelMotion(active);
  const step = steps[active];
  return (
    <section className="section-padding journey-section">
      <div className="container-custom">
        <div className="section-heading">
          <div>
            <span className="eyebrow-pill">YOUR VISIT, MADE SIMPLE</span>
            <h2>Know what to expect.</h2>
          </div>
          <p>Three steps. A more reassuring experience.</p>
        </div>
        <div
          className="journey-controls"
          role="group"
          aria-label="Explore your visit"
        >
          {steps.map((s, i) => (
            <button
              key={s.label}
              aria-pressed={active === i}
              aria-controls="visit-panel"
              onClick={() => setActive(i)}
            >
              <span>0{i + 1}</span>
              {s.label}
            </button>
          ))}
        </div>
        <div
        ref={panelRef}
          className="journey-panel"
          id="visit-panel"
          aria-live="polite"
          aria-atomic="true"
        >
          <img
            key={step.image}
            src={step.image}
            alt={step.alt}
            width={800}
            height={600}
            loading="lazy"
          />
          <div className="panel-copy" key={active}>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
            <ul>
              {step.items.map((item) => (
                <li key={item}>
                  <Check size={17} />
                  {item}
                </li>
              ))}
            </ul>
            <Link className="text-link" href="/contact-us">
              Plan your visit <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
