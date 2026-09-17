import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { procedures } from "@/data/procedures";
import { ProcedureStepper } from "@/components/ProcedureStepper";
import { Clock, ShieldCheck, ArrowRight, Heart } from "lucide-react";

export function generateStaticParams() {
  return procedures.map((p) => ({
    slug: p.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProcedureDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const procedure = procedures.find((p) => p.slug === slug);

  if (!procedure) {
    notFound();
  }

  return (
    <div>
      {/* Header Banner */}
      <section style={{ backgroundColor: "var(--bg-soft)", padding: "4rem 0", borderBottom: "1px solid var(--border-color)" }}>
        <div className="container-custom">
          <div style={{ maxWidth: "800px" }}>
            <span className="eyebrow-pill" style={{ marginBottom: "0.75rem" }}>
              INTERACTIVE 7-STAGE PROCEDURE GUIDE
            </span>
            <h1 style={{ fontSize: "2.5rem", color: "var(--secondary)", lineHeight: 1.2, marginBottom: "0.5rem" }}>
              {procedure.title}
            </h1>
            <p style={{ fontSize: "1.1rem", color: "var(--primary)", fontWeight: 600, marginBottom: "1rem" }}>
              {procedure.subtitle}
            </p>
            <p style={{ fontSize: "1rem", color: "var(--text-body)", lineHeight: 1.6, marginBottom: "1.5rem" }}>
              {procedure.overview}
            </p>

            <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", fontSize: "0.875rem", color: "var(--secondary)", fontWeight: 600 }}>
              <span style={{ display: "flex", alignItems: "center", gap: "0.4rem", backgroundColor: "#ffffff", padding: "0.4rem 0.9rem", borderRadius: "var(--radius-pill)", border: "1px solid var(--border-color)" }}>
                <Clock size={16} style={{ color: "var(--primary)" }} /> Cath Lab Time: {procedure.estimatedTotalTime}
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "0.4rem", backgroundColor: "#ffffff", padding: "0.4rem 0.9rem", borderRadius: "var(--radius-pill)", border: "1px solid var(--border-color)" }}>
                <ShieldCheck size={16} style={{ color: "var(--primary)" }} /> Stay: {procedure.hospitalStay}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main 7-Stage Vertical Stepper Interactive Section */}
      <section className="section-padding" style={{ backgroundColor: "var(--bg-page)" }}>
        <div className="container-custom">
          <ProcedureStepper stages={procedure.stages} procedureTitle={procedure.title} />
        </div>
      </section>

      {/* Bottom Cross Link */}
      <section className="section-padding section-soft" style={{ borderTop: "1px solid var(--border-color)", textAlign: "center" }}>
        <div className="container-custom">
          <h2 style={{ fontSize: "1.75rem", color: "var(--secondary)", marginBottom: "0.5rem" }}>
            Explore All Cardiology Treatments
          </h2>
          <p style={{ color: "var(--text-body)", fontSize: "0.95rem", marginBottom: "1.75rem" }}>
            Discover our complete interventional, preventive, and structural cardiology offerings.
          </p>
          <Link href="/treatments" className="btn-primary" style={{ padding: "0.85rem 2rem" }}>
            <span>Browse All Treatments</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
