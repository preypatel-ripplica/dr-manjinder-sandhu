import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, Activity, Stethoscope, Check } from "lucide-react";
import { getTreatments } from "@/lib/cms";
import { treatments as localTreatments } from "@/data/treatments";
import { buildHreflang } from "@/lib/seo";
import type { Metadata } from "next";
import { careVisuals } from "@/data/care-visuals";
import { VisualIntro } from "@/components/VisualIntro";
import { FAQAccordion } from "@/components/FAQAccordion";
import { TransradialRecoveryTimeline } from "@/components/TransradialRecoveryTimeline";

export async function generateStaticParams() {
  const treatmentsList = await getTreatments().catch(() => localTreatments);
  const map = new Map<string, string>();
  localTreatments.forEach((t) => map.set(t.slug.toLowerCase(), t.slug));
  (treatmentsList || []).forEach((t) => map.set(t.slug.toLowerCase(), t.slug));
  return Array.from(map.values()).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cleanSlug = (slug || "").trim().toLowerCase();
  const treatmentsList = await getTreatments().catch(() => localTreatments);
  let treatment = treatmentsList.find((t) => t.slug.toLowerCase() === cleanSlug);
  if (!treatment) {
    treatment = localTreatments.find((t) => t.slug.toLowerCase() === cleanSlug);
  }

  const metadata = buildHreflang(`/treatments/${cleanSlug}/`);
  return {
    ...metadata,
    title: treatment ? `${treatment.title} | Dr. Manjinder Sandhu` : undefined,
    description: treatment?.shortDescription,
  };
}

export default async function TreatmentDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cleanSlug = (slug || "").trim().toLowerCase();
  const treatmentsList = await getTreatments().catch(() => localTreatments);
  
  // Merge CMS and local treatments list, prioritizing CMS version for duplicate slugs
  const map = new Map<string, typeof localTreatments[0]>();
  localTreatments.forEach((item) => map.set(item.slug.toLowerCase(), item));
  (treatmentsList || []).forEach((item) => map.set(item.slug.toLowerCase(), item));
  const list = Array.from(map.values());

  const tData = map.get(cleanSlug);

  if (!tData) {
    notFound();
  }

  const defaultVisual = {
    image: "/images/radial-angioplasty-and-tenting.png",
    alt: tData.title,
    title: tData.title,
    summary: tData.shortDescription,
    focus: "Cardiovascular Care",
    approach: "Specialist Treatment",
  };

  const v = careVisuals[cleanSlug] || defaultVisual;

  const treatmentFaqs = [
    ...(tData.faqs || []),
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
        label={`${tData.category} CARDIOLOGY`}
        title={tData.title}
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
            <p className="care-detail-lead">{tData.shortDescription}</p>
            <div className="care-disclosures">
              {[
                {
                  title: "Understanding the treatment",
                  content: <p>{tData.fullOverview}</p>,
                },
                {
                  title: "Who may benefit?",
                  content: (
                    <ul>
                      {tData.whoNeedsIt.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ),
                },
                {
                  title: "What happens during treatment?",
                  content: <p>{tData.procedureSummary}</p>,
                },
                {
                  title: "Recovery & follow-up",
                  content: <p>{tData.recoveryTimeline}</p>,
                },
                {
                  title: "Benefits of this approach",
                  content: (
                    <ul>
                      {tData.benefits.map((item) => (
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

      {cleanSlug === "radial-angiography-angioplasty" && (
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
            {list
              .filter((r) => r.slug.toLowerCase() !== cleanSlug)
              .slice(0, 3)
              .map((r) => {
                const rVis = careVisuals[r.slug] || {
                  image: "/images/radial-angioplasty-and-tenting.png",
                  alt: r.title,
                  title: r.title,
                  summary: r.shortDescription,
                };

                return (
                  <Link key={r.id} href={`/treatments/${r.slug}`}>
                    <img
                      src={rVis.image}
                      alt={rVis.alt}
                      width={600}
                      height={350}
                      loading="lazy"
                    />
                    <span className="eyebrow-pill">{r.category}</span>
                    <h3>
                      {rVis.title} <ArrowUpRight size={19} />
                    </h3>
                    <p>{rVis.summary}</p>
                  </Link>
                );
              })}
          </div>
        </div>
      </section>
    </div>
  );
}

