"use client";

import { useEffect, useRef, useState } from "react";
import { usePanelMotion } from "@/hooks/usePanelMotion";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, CalendarDays, RotateCcw } from "lucide-react";

type Choice = {
  title: string;
  detail: string;
  next: "appointment" | "guide" | "call";
};

const startingPoints: Choice[] = [
  {
    title: "A new heart-health concern",
    detail: "I would like to arrange a first consultation and discuss a concern.",
    next: "appointment",
  },
  {
    title: "A report or test to review",
    detail: "I have an ECG, echo, angiography, or another report to discuss.",
    next: "appointment",
  },
  {
    title: "Treatment or a second opinion",
    detail: "I would like to understand an existing diagnosis or recommendation.",
    next: "guide",
  },
  {
    title: "A follow-up appointment",
    detail: "I am returning for a review or ongoing care.",
    next: "appointment",
  },
  {
    title: "I’m not sure where to start",
    detail: "I would like help finding the right next step.",
    next: "appointment",
  },
];

const preferences: Choice[] = [
  {
    title: "Book a consultation",
    detail: "Choose a location and send a request to the appointment desk.",
    next: "appointment",
  },
  {
    title: "Understand my options",
    detail: "Explore the treatments and care information available here.",
    next: "guide",
  },
  {
    title: "Speak with the team",
    detail: "Call or message the appointment desk for practical help.",
    next: "call",
  },
];

export function CarePathFinder() {
  const [step, setStep] = useState(1);
  const panelRef = usePanelMotion(step);
  const previousStep = useRef(step);
  useEffect(() => {
    if (previousStep.current === step) return;
    previousStep.current = step;
    const heading = panelRef.current?.querySelector<HTMLElement>("h3");
    if (!heading) return;
    heading.focus({ preventScroll: true });
    const top = heading.getBoundingClientRect().top;
    if (top < 140 || top > window.innerHeight * .65) {
      heading.scrollIntoView({ block: "start", behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
    }
  }, [step, panelRef]);
  const [startingPoint, setStartingPoint] = useState<Choice | null>(null);
  const [preference, setPreference] = useState<Choice | null>(null);
  const recommendation = preference?.next || startingPoint?.next || "appointment";

  function reset() {
    setStep(1);
    setStartingPoint(null);
    setPreference(null);
  }

  return (
    <section className="care-path-section" aria-labelledby="care-path-heading">
      <div className="container-custom">
        <div className="care-path-heading">
          <span className="eyebrow-pill">FIND YOUR STARTING POINT</span>
          <h2 id="care-path-heading">Not sure which step feels right?</h2>
          <p>A quick guide for finding the right conversation to have next.</p>
        </div>
        <div className="care-path-shell">
          <div className="care-path-topline">
            <span>Step {step} of 3</span>
            <button type="button" onClick={reset} className="care-path-reset">
              <RotateCcw size={15} /> Start over
            </button>
          </div>
          <div className="care-path-progress" aria-hidden="true">
            <span style={{ width: `${(step / 3) * 100}%` }} />
          </div>

          <div ref={panelRef} className="care-path-stage">
          {step === 1 && (
            <div className="care-path-content" key="starting-point">
              <h3 tabIndex={-1}>What brings you here today?</h3>
              <div className="care-path-options">
                {startingPoints.map((choice) => (
                  <button
                    key={choice.title}
                    type="button"
                    aria-pressed={startingPoint?.title === choice.title}
                    className={startingPoint?.title === choice.title ? "is-selected" : ""}
                    onClick={() => setStartingPoint(choice)}
                  >
                    <strong>{choice.title}</strong>
                    <span>{choice.detail}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="care-path-content" key="preference">
              <h3 tabIndex={-1}>What would help most right now?</h3>
              <div className="care-path-options care-path-options-compact">
                {preferences.map((choice) => (
                  <button
                    key={choice.title}
                    type="button"
                    aria-pressed={preference?.title === choice.title}
                    className={preference?.title === choice.title ? "is-selected" : ""}
                    onClick={() => setPreference(choice)}
                  >
                    <strong>{choice.title}</strong>
                    <span>{choice.detail}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="care-path-result" key="result" aria-live="polite">
              <div>
                <span className="eyebrow-pill">A helpful next step</span>
                <h3 tabIndex={-1}>
                  {recommendation === "guide"
                    ? "Explore your care options."
                    : recommendation === "call" ? "Speak with our appointment team." : "Let’s arrange a conversation."}
                </h3>
                <p>
                  {recommendation === "guide"
                    ? "Browse treatment information, then contact the appointment desk when you are ready to discuss your own care."
                    : recommendation === "call" ? "Call the appointment desk for help with locations, availability and planning your visit." : "Send an appointment request and the team will help confirm the most suitable location and time."}
                </p>
              </div>
              {recommendation === "guide" ? (
                <Link className="btn-primary" href="/treatments">
                  Explore treatments <ArrowUpRight size={18} />
                </Link>
              ) : (
                <a className="btn-primary" href={recommendation === "call" ? "tel:+918130370096" : "#appointments"}>
                  {recommendation === "call" ? "Call the team" : "Book appointment"} <CalendarDays size={18} />
                </a>
              )}
            </div>
          )}

          </div>
          <div className="care-path-actions">
            {step > 1 ? (
              <button type="button" className="btn-outline" onClick={() => setStep(step - 1)}>
                <ArrowLeft size={17} /> Back
              </button>
            ) : (
              <span />
            )}
            {step < 3 && (
              <button
                type="button"
                className="btn-primary"
                disabled={step === 1 ? !startingPoint : !preference}
                onClick={() => setStep(step + 1)}
              >
                Continue <ArrowRight size={17} />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
