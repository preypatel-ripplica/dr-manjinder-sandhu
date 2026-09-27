import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";
import { PatientReel } from "@/components/PatientReel";
export default function TestimonialsPage() {
  return (
    <div>
      <PageIntro
        label="PATIENT EXPERIENCES"
        title="Care, in their own words."
        description="Patients and families share their experiences of care with Dr. Sandhu."
      />
      <section className="section-padding">
        <div className="container-custom">
          <PatientReel />
          <div className="section-end-link">
            <Link href="/patient-stories" className="text-link">
              Patient stories
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
