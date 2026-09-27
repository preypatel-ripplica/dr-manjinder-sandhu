"use client";

import { VisualIntro } from "@/components/VisualIntro";
import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Calendar,
} from "lucide-react";
import { procedures } from "@/data/procedures";
import { BookingModal } from "@/components/BookingModal";

export default function ProceduresIndexPage() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  return (
    <div>
      {/* Page Hero Header */}
      <VisualIntro
        label="HEART CARE / PROCEDURES"
        title="Your treatment, step by step."
        description="Explore what happens before, during and after a procedure. Choose a guide to walk through each stage at your own pace."
        image="/images/heart-consultation.jpg"
        alt="Blood pressure assessment"
      />

      <section className="section-padding">
        <div className="container-custom procedure-cards">
          {procedures.map((proc, i) => (
            <article className="procedure-guide-card" key={proc.id}>
              <img
                src={
                  i % 2 === 0
                    ? "/images/heart-consultation.jpg"
                    : "/images/patient-care.jpg"
                }
                alt={
                  i % 2 === 0
                    ? "A blood pressure assessment"
                    : "An older couple at home"
                }
                width={700}
                height={450}
                loading="lazy"
              />
              <div>
                <span className="eyebrow-pill">
                  {proc.stages.length} STAGES · {proc.category}
                </span>
                <h2>{proc.title}</h2>
                <p>{proc.overview}</p>
                <dl>
                  <div>
                    <dt>Procedure time</dt>
                    <dd>{proc.estimatedTotalTime}</dd>
                  </div>
                  <div>
                    <dt>Hospital stay</dt>
                    <dd>{proc.hospitalStay}</dd>
                  </div>
                </dl>
                <Link href={`/procedures/${proc.slug}`} className="text-link">
                  Explore the walkthrough <ArrowRight size={17} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
      />
    </div>
  );
}
