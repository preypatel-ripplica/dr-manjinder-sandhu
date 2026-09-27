<<<<<<< HEAD
import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { treatments } from "@/data/treatments";
import { FAQAccordion } from "@/components/FAQAccordion";
import { CheckCircle2, Clock, Calendar, ArrowRight, ShieldCheck, Activity, Stethoscope } from "lucide-react";

export function generateStaticParams() {
  return treatments.map((t) => ({
    slug: t.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function TreatmentDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const treatment = treatments.find((t) => t.slug === slug);

  if (!treatment) {
    notFound();
  }

  const relatedTreatments = treatments.filter((t) => t.slug !== slug).slice(0, 3);

  return (
    <div>
      {/* Detail Hero Header */}
      <section style={{ backgroundColor: "var(--bg-soft)", padding: "4rem 0", borderBottom: "1px solid var(--border-color)" }}>
        <div className="container-custom">
          <div style={{ maxWidth: "800px" }}>
            <span className="eyebrow-pill" style={{ marginBottom: "0.75rem" }}>
              {treatment.category.toUpperCase()} CARDIOLOGY
            </span>
            <h1 style={{ fontSize: "2.5rem", color: "var(--secondary)", lineHeight: 1.2, marginBottom: "0.75rem" }}>
              {treatment.title}
            </h1>
            <p style={{ fontSize: "1.15rem", color: "var(--primary)", fontWeight: 600, marginBottom: "1.25rem" }}>
              {treatment.tagline}
            </p>
            <p style={{ fontSize: "1rem", color: "var(--text-body)", lineHeight: 1.6 }}>
              {treatment.shortDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <section className="section-padding" style={{ backgroundColor: "var(--bg-page)" }}>
        <div className="container-custom">
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "3.5rem" }} className="detail-grid">
            
            {/* Left Main Article Column */}
            <div>
              {/* Full Overview */}
              <div style={{ marginBottom: "3rem" }}>
                <h2 style={{ fontSize: "1.6rem", color: "var(--secondary)", marginBottom: "1rem" }}>
                  Treatment Overview & Clinical Rationale
                </h2>
                <p style={{ color: "var(--text-body)", fontSize: "1rem", lineHeight: 1.7, whiteSpace: "pre-line" }}>
                  {treatment.fullOverview}
                </p>
              </div>

              {/* Who Needs It Checklist */}
              <div style={{
                backgroundColor: "var(--bg-soft)",
                border: "1px solid var(--border-color)",
                borderRadius: "var(--radius-lg)",
                padding: "2rem",
                marginBottom: "3rem"
              }}>
                <h3 style={{ fontSize: "1.3rem", color: "var(--secondary)", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <ShieldCheck size={22} style={{ color: "var(--primary)" }} /> Who Needs This Treatment?
                </h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {treatment.whoNeedsIt.map((item, idx) => (
                    <li key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", fontSize: "0.925rem", color: "var(--secondary)" }}>
                      <CheckCircle2 size={18} style={{ color: "var(--primary)", flexShrink: 0, marginTop: "2px" }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Procedure Summary & Recovery */}
              <div style={{ marginBottom: "3rem" }}>
                <h2 style={{ fontSize: "1.5rem", color: "var(--secondary)", marginBottom: "1rem" }}>
                  The Clinical Procedure
                </h2>
                <p style={{ color: "var(--text-body)", fontSize: "0.975rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                  {treatment.procedureSummary}
                </p>

                <h3 style={{ fontSize: "1.25rem", color: "var(--secondary)", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <Clock size={20} style={{ color: "var(--primary)" }} /> Expected Recovery Timeline
                </h3>
                <p style={{ color: "var(--text-body)", fontSize: "0.95rem", lineHeight: 1.6 }}>
                  {treatment.recoveryTimeline}
                </p>
              </div>

              {/* Key Benefits List */}
              <div style={{ marginBottom: "3rem" }}>
                <h3 style={{ fontSize: "1.3rem", color: "var(--secondary)", marginBottom: "1rem" }}>
                  Key Benefits & Safety Profile
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="benefits-grid">
                  {treatment.benefits.map((b, i) => (
                    <div key={i} className="card-surface" style={{ padding: "1.25rem" }}>
                      <div style={{ fontWeight: 700, color: "var(--secondary)", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                        <CheckCircle2 size={16} style={{ color: "var(--primary)" }} /> {b}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQ Accordion */}
              {treatment.faqs && treatment.faqs.length > 0 && (
                <FAQAccordion items={treatment.faqs} title={`Frequently Asked Questions about ${treatment.title}`} />
              )}
            </div>

            {/* Right Sidebar Booking & Doctor Note Card */}
            <div>
              <div className="card-surface" style={{ padding: "2rem", backgroundColor: "var(--bg-soft)", position: "sticky", top: "100px" }}>
                <div className="circular-icon-badge" style={{ marginBottom: "1rem" }}>
                  <Stethoscope size={30} />
                </div>

                <h3 style={{ fontSize: "1.25rem", color: "var(--secondary)", marginBottom: "0.3rem" }}>
                  Consult Dr. Manjinder Sandhu
                </h3>
                <p style={{ fontSize: "0.85rem", color: "var(--primary)", fontWeight: 700, marginBottom: "1rem" }}>
                  Senior Interventional Cardiologist • 33+ Yrs Exp
                </p>

                <p style={{ fontSize: "0.875rem", color: "var(--text-body)", lineHeight: 1.5, marginBottom: "1.5rem" }}>
                  Seek an expert clinical evaluation, angiogram review, or radial stenting opinion at Atrius Cardiac Care centers across Gurugram and Delhi NCR.
                </p>

                <Link href="/contact-us" className="btn-primary" style={{ width: "100%", justifyContent: "center", marginBottom: "0.75rem" }}>
                  <Calendar size={16} /> Book Appointment
                </Link>

                <a href="tel:+918130370096" className="btn-outline" style={{ width: "100%", justifyContent: "center" }}>
                  Call Hospital Desk
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Treatments Navigation */}
      <section className="section-padding section-soft" style={{ borderTop: "1px solid var(--border-color)" }}>
        <div className="container-custom">
          <h2 style={{ fontSize: "1.75rem", color: "var(--secondary)", marginBottom: "2rem", textAlign: "center" }}>
            Related <span style={{ color: "var(--primary)" }}>Cardiology Treatments</span>
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
            {relatedTreatments.map((rel) => (
              <div key={rel.id} className="card-surface" style={{ padding: "1.75rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <span className="eyebrow-pill" style={{ fontSize: "0.7rem", marginBottom: "0.5rem" }}>{rel.category} CARDIOLOGY</span>
                  <h3 style={{ fontSize: "1.2rem", color: "var(--secondary)", marginBottom: "0.4rem" }}>{rel.title}</h3>
                  <p style={{ color: "var(--text-body)", fontSize: "0.875rem", lineHeight: 1.5, marginBottom: "1.25rem" }}>{rel.shortDescription}</p>
                </div>
                <Link href={`/treatments/${rel.slug}`} className="btn-outline" style={{ justifyContent: "center" }}>
                  <span>View Details</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            ))}
=======
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, Activity, Stethoscope, Check } from "lucide-react";
import { treatments } from "@/data/treatments";
import { careVisuals } from "@/data/care-visuals";
import { VisualIntro } from "@/components/VisualIntro";
import { FAQAccordion } from "@/components/FAQAccordion";
import { TransradialRecoveryTimeline } from "@/components/TransradialRecoveryTimeline";
export function generateStaticParams() {
  return treatments.map((t) => ({ slug: t.slug }));
}
export default async function TreatmentDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const t = treatments.find((t) => t.slug === slug);
  if (!t) notFound();
  const v = careVisuals[slug];
  const treatmentFaqs = [
    ...t.faqs,
    {
      question: "How is the right treatment option decided?",
      answer:
        "Dr. Sandhu reviews your symptoms, medical history, examination and relevant reports before discussing the options that fit your individual situation.",
    },
    {
      question: "What should I bring to my consultation?",
      answer:
        "Please bring previous prescriptions, test reports, scan or angiography reports, and a list of the medicines you currently take.",
    },
    {
      question: "Can I request a second opinion?",
      answer:
        "Yes. You can book a consultation or second opinion and bring your existing reports for review.",
    },
    {
      question: "How do I arrange my appointment?",
      answer:
        "Send an appointment request through the form, call the appointment desk, or use WhatsApp. The team will confirm the time and location with you.",
    },
  ].slice(0, 5);
  return (
    <div>
      <VisualIntro
        label={`${t.category} CARDIOLOGY`}
        title={t.title}
        description={v.summary}
        image={v.image}
        alt={v.alt}
      >
        <Link className="btn-primary" href="/contact-us">
          Book a consultation <ArrowUpRight size={17} />
        </Link>
        <Link
          className="quiet-link hero-secondary-link"
          href="#treatment-details"
        >
          About this treatment ↓
        </Link>
      </VisualIntro>
      <div className="container-custom">
        <dl className="care-at-glance">
          <div>
            <Activity size={24} />
            <dt>The focus</dt>
            <dd>{v.focus}</dd>
          </div>
          <div>
            <Stethoscope size={24} />
            <dt>The approach</dt>
            <dd>{v.approach}</dd>
          </div>
          <div>
            <Check size={24} />
            <dt>Your next step</dt>
            <dd>Personal assessment</dd>
          </div>
        </dl>
      </div>
      <section className="section-padding" id="treatment-details">
        <div className="container-custom care-detail-layout">
          <div>
            <span className="eyebrow-pill">ABOUT THIS TREATMENT</span>
            <h2>What you need to know.</h2>
            <p className="care-detail-lead">{t.shortDescription}</p>
            <div className="care-disclosures">
              {[
                {
                  title: "Understanding the treatment",
                  content: <p>{t.fullOverview}</p>,
                },
                {
                  title: "Who may benefit?",
                  content: (
                    <ul>
                      {t.whoNeedsIt.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ),
                },
                {
                  title: "What happens during treatment?",
                  content: <p>{t.procedureSummary}</p>,
                },
                {
                  title: "Recovery & follow-up",
                  content: <p>{t.recoveryTimeline}</p>,
                },
                {
                  title: "Benefits of this approach",
                  content: (
                    <ul>
                      {t.benefits.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ),
                },
              ].map((item, i) => (
                <details key={item.title} open={i === 0}>
                  <summary>
                    <span>0{i + 1}</span>
                    {item.title}
                  </summary>
                  <div>{item.content}</div>
                </details>
              ))}
            </div>
          </div>
          <aside className="care-doctor-card">
            <img
              src="/images/dr-sandhu-office.png"
              alt="Dr. Manjinder Sandhu"
              loading="lazy"
              width={800}
              height={650}
            />
            <div>
              <span className="eyebrow-pill">PERSONAL GUIDANCE</span>
              <h3>Let’s talk about your care.</h3>
              <p>
                Bring your reports and questions to a consultation with Dr.
                Sandhu.
              </p>
              <Link className="text-link" href="/contact-us">
                Book appointment <ArrowUpRight size={17} />
              </Link>
            </div>
          </aside>
        </div>
      </section>
      {slug === "radial-angiography-angioplasty" && (
        <section className="section-padding section-soft">
          <div className="container-custom">
            <TransradialRecoveryTimeline />
          </div>
        </section>
      )}
      <section className="section-padding">
        <div className="container-custom care-faq-layout">
          <div>
            <span className="eyebrow-pill">A LITTLE MORE CLARITY</span>
            <h2>
              Your questions,
              <br />
              answered.
            </h2>
          </div>
          <FAQAccordion
            items={treatmentFaqs}
            title="About this treatment"
            showPricingDisclaimer={false}
          />
        </div>
      </section>
      <section className="section-padding section-soft">
        <div className="container-custom">
          <div className="section-heading">
            <h2>More treatments</h2>
            <Link href="/treatments" className="quiet-link">
              All treatments <ArrowUpRight size={17} />
            </Link>
          </div>
          <div className="related-care-grid">
            {treatments
              .filter((r) => r.slug !== slug)
              .slice(0, 3)
              .map((r) => (
                <Link key={r.id} href={`/treatments/${r.slug}`}>
                  <img
                    src={careVisuals[r.slug].image}
                    alt={careVisuals[r.slug].alt}
                    width={600}
                    height={350}
                    loading="lazy"
                  />
                  <span className="eyebrow-pill">{r.category}</span>
                  <h3>
                    {careVisuals[r.slug].title} <ArrowUpRight size={19} />
                  </h3>
                  <p>{careVisuals[r.slug].summary}</p>
                </Link>
              ))}
>>>>>>> ea53e95 (Update website design, SEO files, and content)
          </div>
        </div>
      </section>
    </div>
  );
}
