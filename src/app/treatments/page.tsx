import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { TreatmentsFilterGrid } from "@/components/TreatmentsFilterGrid";
import { VisualIntro } from "@/components/VisualIntro";
export default function TreatmentsIndexPage() {
  return (
    <div>
      <VisualIntro
        label="SPECIALIST HEART CARE"
        title="The right care, for you."
        description="Explore preventive care, heart investigations, and specialist treatments. Your consultation helps determine which approach is right for you."
      />
      <section className="section-padding">
        <div className="container-custom">
          <TreatmentsFilterGrid />
        </div>
      </section>
      <section className="simple-cta">
        <div className="container-custom">
          <div>
            <h2>Let’s talk about your options.</h2>
            <p>Get personal advice or a second opinion from Dr. Sandhu.</p>
          </div>
          <Link className="btn-primary" href="/contact-us">
            Book appointment <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>
    </div>
  );
}
