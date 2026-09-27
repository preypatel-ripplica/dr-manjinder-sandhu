"use client";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { doctorProfile } from "@/data/doctor-profile";
import { BookingModal } from "@/components/BookingModal";
export default function AboutUsPage() {
  const [bookingOpen, setBookingOpen] = useState(false);
  return (
    <div>
      <section className="section-padding about-intro">
        <div className="container-custom doctor-intro-grid">
          <div className="doctor-photo">
            <img
              src="/images/dr-sandhu-office.png"
              alt="Dr. Manjinder Sandhu in his consultation room"
              width="800"
              height="800"
              fetchPriority="high"
            />
          </div>
          <div className="doctor-intro-copy">
            <span className="eyebrow-pill">MEET YOUR DOCTOR</span>
            <h1>Dr. Manjinder Sandhu</h1>
            <p className="doctor-role">
              Senior Interventional Cardiologist
              <br />
              Principal Director – Cardiology
            </p>
            <p>
              Specialist knowledge. An attentive ear. A commitment to helping
              you understand your heart health.
            </p>
            <p>
              An alumnus of AFMC Pune and PGIMER Chandigarh, Dr. Sandhu brings
              decades of experience in complex coronary and structural heart
              procedures. His career spans the Indian Armed Forces Medical
              Services and leadership of specialist cardiac teams.
            </p>
            <p>
              He brings a personal approach to specialist care across Gurugram,
              Manesar, and Delhi.
            </p>
            <button
              className="btn-primary"
              onClick={() => setBookingOpen(true)}
            >
              Book appointment <ArrowUpRight size={17} />
            </button>
          </div>
        </div>
      </section>
      <section className="section-padding section-soft">
        <div className="container-custom qualifications-grid">
          <div>
            <span className="eyebrow-pill">EDUCATION & TRAINING</span>
            <h2>
              A foundation of
              <br />
              clinical expertise.
            </h2>
          </div>
          <ul className="qualification-list">
            {doctorProfile.qualifications.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ul>
        </div>
      </section>
      <section className="section-padding">
        <div className="container-custom">
          <div className="section-heading">
            <div>
              <span className="eyebrow-pill">PROFESSIONAL JOURNEY</span>
              <h2>A career dedicated to care.</h2>
            </div>
          </div>
          <div className="career-list">
            {doctorProfile.careerTimeline.map((item) => (
              <article key={item.period}>
                <span>{item.period}</span>
                <div>
                  <h3>{item.role}</h3>
                  <p>{item.institution}</p>
                  <p>{item.highlights}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section-padding section-soft">
        <div className="container-custom">
          <span className="eyebrow-pill">THE APPROACH</span>
          <h2>Putting the person first.</h2>
          <div className="values-grid">
            {doctorProfile.coreValues.map((value, i) => (
              <article key={value.title}>
                <span className="value-number">0{i + 1}</span>
                <h3>
                  {
                    [
                      "Considered advice",
                      "Care that listens",
                      "Modern expertise",
                    ][i]
                  }
                </h3>
                <p>{value.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />
    </div>
  );
}
