"use client";
import { useState } from "react";
import { usePanelMotion } from "@/hooks/usePanelMotion";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { testimonials } from "@/data/testimonials";
export function PatientReel() {
  const [index, setIndex] = useState(0);
  const panelRef = usePanelMotion(index);
  const current = testimonials[index];
  function move(n: number) {
    setIndex((i) => (i + n + testimonials.length) % testimonials.length);
  }
  return (
    <div
      className="patient-reel"
      role="region"
      aria-roledescription="carousel"
      aria-label="Patient experiences"
    >
      <div className="reel-art" aria-hidden="true"><span className="review-monogram">“</span><p>Care that makes<br />a difference.</p><span>INDIVIDUAL EXPERIENCES.<br />PERSONAL JOURNEYS.</span></div>
      <div className="reel-content" ref={panelRef}>
        <div
          className="panel-copy"
          key={index}
          aria-live="polite"
          aria-atomic="true"
        >
          <span className="eyebrow-pill">{current.procedureTag}</span>
          <Quote className="reel-quote" size={30} />
          <blockquote>“{current.text}”</blockquote>
          <p className="reel-author">
            <strong>{current.name}</strong>
            <span>{current.location}</span>
          </p>
        </div>
        <div className="reel-controls">
          <button onClick={() => move(-1)} aria-label="Previous testimonial">
            <ArrowLeft size={19} />
          </button>
          <button onClick={() => move(1)} aria-label="Next testimonial">
            <ArrowRight size={19} />
          </button>
          <span>
            {index + 1} / {testimonials.length}
          </span>
          <div className="reel-dots">
            {testimonials.map((r, i) => (
              <button
                key={r.id}
                aria-label={`Show review ${i + 1}`}
                aria-pressed={index === i}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
