import React from "react";
import { VisualIntro } from "@/components/VisualIntro";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProcedures } from "@/lib/cms";
import { buildHreflang } from "@/lib/seo";
import type { Metadata } from "next";
import { ProcedureStepper } from "@/components/ProcedureStepper";
import { Clock, ShieldCheck, ArrowRight, Heart } from "lucide-react";

export async function generateStaticParams() {
  const procedures = await getProcedures();
  return procedures.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const procedures = await getProcedures();
  const procedure = procedures.find((p) => p.slug === slug);

  const metadata = buildHreflang(`/procedures/${slug}/`);
  return {
    ...metadata,
    title: procedure ? `${procedure.title} | Dr. Manjinder Sandhu` : undefined,
    description: procedure?.overview,
  };
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProcedureDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const procedures = await getProcedures();
  const procedure = procedures.find((p) => p.slug === slug);

  if (!procedure) {
    notFound();
  }

  return (
    <div>
      {/* Header Banner */}
      <VisualIntro
        label="YOUR PROCEDURE GUIDE"
        title={procedure.title}
        description={procedure.subtitle}
      >
        <div className="procedure-quick-facts">
          <span>
            <Clock size={18} /> Procedure: {procedure.estimatedTotalTime}
          </span>
          <span>
            <ShieldCheck size={18} /> Hospital stay: {procedure.hospitalStay}
          </span>
        </div>
        <a className="text-link" href="#procedure-stages">
          Explore each stage ↓
        </a>
      </VisualIntro>

      {/* Main 7-Stage Vertical Stepper Interactive Section */}
      <section
        className="section-padding"
        style={{ backgroundColor: "var(--bg-page)" }}
      >
        <div className="container-custom">
          <div id="procedure-stages" />
          <ProcedureStepper
            stages={procedure.stages}
            procedureTitle={procedure.title}
          />
        </div>
      </section>

      {/* Bottom Cross Link */}
      <section
        className="section-padding section-soft"
        style={{
          borderTop: "1px solid var(--border-color)",
          textAlign: "center",
        }}
      >
        <div className="container-custom">
          <h2
            style={{
              fontSize: "1.75rem",
              color: "var(--secondary)",
              marginBottom: "0.5rem",
            }}
          >
            Explore All Cardiology Treatments
          </h2>
          <p
            style={{
              color: "var(--text-body)",
              fontSize: "1rem",
              marginBottom: "1.75rem",
            }}
          >
            Discover our complete interventional, preventive, and structural
            cardiology offerings.
          </p>
          <Link
            href="/treatments"
            className="btn-primary"
            style={{ padding: "0.85rem 2rem" }}
          >
            <span>Browse All Treatments</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
