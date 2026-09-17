import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { caseStudies } from "@/data/case-studies";
import { CheckCircle2, ShieldCheck, ArrowRight, Calendar } from "lucide-react";

export function generateStaticParams() {
  return caseStudies.map((cs) => ({
    slug: cs.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function CaseStudyDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const caseItem = caseStudies.find((cs) => cs.slug === slug);

  if (!caseItem) {
    notFound();
  }

  return (
    <div>
      <section style={{ backgroundColor: "var(--bg-soft)", padding: "4rem 0", borderBottom: "1px solid var(--border-color)" }}>
        <div className="container-custom">
          <div style={{ maxWidth: "800px" }}>
            <span className="eyebrow-pill" style={{ marginBottom: "0.75rem" }}>
              CASE STUDY • {caseItem.patientAgeGender}
            </span>
            <h1 style={{ fontSize: "2.25rem", color: "var(--secondary)", lineHeight: 1.25, marginBottom: "0.75rem" }}>
              {caseItem.condition}
            </h1>
            <p style={{ fontSize: "1.1rem", color: "var(--primary)", fontWeight: 700 }}>
              Procedure Performed: {caseItem.procedurePerformed}
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding" style={{ backgroundColor: "var(--bg-page)" }}>
        <div className="container-reading">
          <div style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.4rem", color: "var(--secondary)", marginBottom: "0.75rem" }}>Clinical Summary</h2>
            <p style={{ fontSize: "1rem", color: "var(--text-body)", lineHeight: 1.7 }}>{caseItem.summary}</p>
          </div>

          <div style={{ backgroundColor: "var(--bg-soft)", padding: "1.5rem", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)", marginBottom: "2rem" }}>
            <h3 style={{ fontSize: "1.1rem", color: "var(--secondary)", marginBottom: "0.5rem" }}>Primary Anatomical Challenge</h3>
            <p style={{ fontSize: "0.95rem", color: "var(--text-body)" }}>{caseItem.keyChallenge}</p>
          </div>

          <div style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.4rem", color: "var(--secondary)", marginBottom: "0.75rem" }}>Interventional Strategy & Outcome</h2>
            <p style={{ fontSize: "1rem", color: "var(--text-body)", lineHeight: 1.7 }}>{caseItem.outcome}</p>
          </div>

          <div style={{ backgroundColor: "var(--primary-light)", padding: "1.75rem", borderRadius: "var(--radius-lg)", border: "1px solid var(--primary-tag-bg)", marginBottom: "2.5rem" }}>
            <h3 style={{ fontSize: "1rem", color: "var(--primary)", fontWeight: 700, marginBottom: "0.5rem" }}>Patient Feedback</h3>
            <p style={{ fontStyle: "italic", color: "var(--secondary)", fontSize: "1.05rem", lineHeight: 1.6 }}>
              &ldquo;{caseItem.testimonialSnippet}&rdquo;
            </p>
          </div>

          <div style={{ textAlign: "center" }}>
            <Link href="/contact-us" className="btn-primary" style={{ padding: "0.85rem 2rem" }}>
              <Calendar size={18} /> Request Clinical Review with Dr. Sandhu
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
