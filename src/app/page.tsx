"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Heart,
  Award,
  Users,
  Activity,
  Phone,
  Calendar,
  ChevronRight,
  ShieldCheck,
  Stethoscope,
  Zap,
  Star,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  MapPin,
  Clock,
  ClipboardCheck,
  Wind,
  Send
} from "lucide-react";
import { doctorProfile } from "@/data/doctor-profile";
import { testimonials } from "@/data/testimonials";
import { blogs } from "@/data/blogs";
import { clinicLocations } from "@/data/clinics";
import { SymptomTriageWidget } from "@/components/SymptomTriageWidget";
import { TreatmentsCarousel } from "@/components/TreatmentsCarousel";
import { TransradialRecoveryTimeline } from "@/components/TransradialRecoveryTimeline";
import { ScrollReelTestimonials } from "@/components/ui/scroll-reel-testimonials";
import { VideoCard } from "@/components/VideoCard";
import { BookingModal } from "@/components/BookingModal";
import { ScrollReveal } from "@/components/ScrollReveal";

const reelTestimonials = [
  {
    quote: "Dr. Sandhu performed my radial angioplasty through the wrist. I was walking around my room within 2 hours and discharged the very next morning with zero pain!",
    author: "Ramesh Sharma (72 yrs), Gurugram",
    image: "https://cdn.prod.website-files.com/64abefce59d5dabbeb3b31ae/65e9b7e09e40e989b274bc36_couple%20testimonial-p-800.jpg",
    alt: "Ramesh Sharma Patient Testimonial"
  },
  {
    quote: "My 81-year-old mother underwent TAVR keyhole valve replacement under Dr. Sandhu. No chest cut, no open surgery, and she is breathing comfortably again.",
    author: "Sunita Verma & Family, Delhi",
    image: "https://cdn.prod.website-files.com/64abefce59d5dabbeb3b31ae/65813943632d5c150916e657_Manjinger%20Photo%202%20(1)-p-800.png",
    alt: "Sunita Verma Family Testimonial"
  },
  {
    quote: "After being told my 100% calcified blockage was impossible to stent elsewhere, Dr. Sandhu used Shockwave Lithotripsy and placed stents perfectly through my wrist.",
    author: "Harish Gupta (68 yrs), Manesar",
    image: "https://cdn.prod.website-files.com/64abefce59d5dabbeb3b31ae/65e18fc30f874ae6504460cc_homepage-p-800.jpg",
    alt: "Harish Gupta Patient Testimonial"
  }
];

export default function HomePage() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [ctaForm, setCtaForm] = useState({
    fullName: "",
    phone: "",
    clinic: "Fortis FMRI, Sector 44, Gurugram",
    message: ""
  });
  const [ctaSubmitted, setCtaSubmitted] = useState(false);

  const handleCtaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ctaForm.fullName || !ctaForm.phone) return;
    setCtaSubmitted(true);
  };

  const primaryClinic = clinicLocations[0]; // FMRI Sector 44

  return (
    <div>
      {/* Scroll Reveal IntersectionObserver Controller */}
      <ScrollReveal />

      {/* 1. HERO SECTION (Modeled on Dr. Vikram Barua Kaushik Website Hero) */}
      <section className="vikram-hero-wrapper reveal-section">
        <div className="container-custom">
          <div className="vikram-hero-card">
            
            {/* Left Copy Column */}
            <div className="vikram-hero-copy">
              <span className="eyebrow-pill" style={{ marginBottom: "1.25rem" }}>
                <Heart size={14} fill="var(--primary)" /> ATRIUS CARDIAC CARE
              </span>

              <h1 style={{
                fontSize: "3rem",
                color: "var(--secondary)",
                lineHeight: 1.15,
                marginBottom: "1.25rem",
                fontWeight: 700,
                letterSpacing: "-0.02em"
              }}>
                Dr. Manjinder Sandhu: <span style={{ color: "var(--primary)" }}>patient-first cardiac care</span>
              </h1>

              <p style={{
                fontSize: "1.1rem",
                color: "var(--text-body)",
                lineHeight: 1.6,
                marginBottom: "2.25rem",
                maxWidth: "560px"
              }}>
                Specialist interventional cardiology care in Gurugram & Delhi NCR for radial angioplasty, TAVR valve replacement, pacemaker implants, and calcified CTO stenting.
              </p>

              {/* Action Buttons */}
              <div style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "1rem",
                marginBottom: "2.5rem"
              }}>
                <button
                  onClick={() => setBookingModalOpen(true)}
                  className="btn-primary"
                  style={{ padding: "0.9rem 2rem", fontSize: "1rem" }}
                >
                  <Calendar size={18} />
                  <span>Book appointment</span>
                </button>

                <a href="tel:+918130370096" className="btn-secondary" style={{ padding: "0.9rem 1.75rem", fontSize: "1rem" }}>
                  <Phone size={18} />
                  <span>Call Hospital Desk</span>
                </a>

                <a
                  href="https://wa.me/918130370096"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp"
                  style={{ padding: "0.9rem 1.75rem", fontSize: "1rem" }}
                >
                  <MessageSquare size={18} />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>

              {/* Quick Metrics */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "1rem",
                paddingTop: "1.5rem",
                borderTop: "1px solid rgba(230,35,52,0.15)"
              }} className="metrics-grid">
                <div>
                  <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--primary)" }}>33+</div>
                  <div style={{ fontSize: "0.775rem", color: "var(--text-muted)", fontWeight: 600 }}>Years Experience</div>
                </div>
                <div>
                  <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--secondary)" }}>70,000+</div>
                  <div style={{ fontSize: "0.775rem", color: "var(--text-muted)", fontWeight: 600 }}>Happy Patients</div>
                </div>
                <div>
                  <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--secondary)" }}>25,000+</div>
                  <div style={{ fontSize: "0.775rem", color: "var(--text-muted)", fontWeight: 600 }}>Procedures Done</div>
                </div>
                <div>
                  <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--primary)" }}>24/7</div>
                  <div style={{ fontSize: "0.775rem", color: "var(--text-muted)", fontWeight: 600 }}>Emergency Care</div>
                </div>
              </div>
            </div>

            {/* Right Doctor Cutout Visual & Floating Badges */}
            <div className="vikram-hero-visual">
              <img
                src="/images/dr-sandhu-cutout.png"
                srcSet="https://cdn.prod.website-files.com/64abefce59d5dabbeb3b31ae/65d8759af96615b44963527d_dr-image-p-500.png 500w, https://cdn.prod.website-files.com/64abefce59d5dabbeb3b31ae/65d8759af96615b44963527d_dr-image.png 720w"
                sizes="(max-width: 768px) 100vw, 560px"
                alt="Dr. Manjinder Sandhu - Senior Interventional Cardiologist"
                className="doctor-portrait-img"
              />

              {/* Floating Card 1: 70000+ Happy Patients */}
              <div className="floating-patients-card">
                <div style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--secondary)", lineHeight: 1 }}>
                  70,000+
                </div>
                <div style={{ fontSize: "0.775rem", color: "var(--text-muted)", fontWeight: 600, marginTop: "2px" }}>
                  Happy patients
                </div>
              </div>

              {/* Floating Badge 2: 33+ Years of Experience */}
              <div className="floating-exp-badge">
                <div className="exp-star-circle">
                  <Star size={18} fill="#ffffff" />
                </div>
                <div>
                  <div style={{ fontSize: "0.9rem", fontWeight: 800, color: "var(--secondary)", lineHeight: 1.1 }}>
                    33+ years of experience
                  </div>
                  <div style={{ fontSize: "0.7rem", color: "var(--primary)", fontWeight: 600 }}>
                    Principal Director – Cardiology
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. ABOUT ATRIUS SECTION (2x2 STATS & PHOTO GRID MODELED ON DR. VIKRAM SITE) */}
      <section className="section-padding reveal-section" style={{ backgroundColor: "var(--bg-page)" }}>
        <div className="container-custom">
          <div className="about-vikram-grid">
            
            {/* Left Column Copy */}
            <div>
              <span className="eyebrow-pill" style={{ marginBottom: "1rem" }}>
                ABOUT ATRIUS CARDIAC CARE
              </span>
              <h2 style={{ fontSize: "2.2rem", color: "var(--secondary)", lineHeight: 1.25, marginBottom: "1.25rem" }}>
                Atrius Cardiac Care brings <span style={{ color: "var(--primary)" }}>focused interventional cardiology</span> care to your heart health journey.
              </h2>
              <p style={{ color: "var(--text-body)", fontSize: "1rem", lineHeight: 1.6, marginBottom: "2rem" }}>
                Founded in 2023 by leading cardiologists, Atrius Cardiac Care delivers boutique, patient-centric cardiovascular care across 4 premier hospital centers in Gurugram, Manesar, and Delhi NCR.
              </p>
              <Link href="/about-us" className="btn-outline">
                Know more <ChevronRight size={16} />
              </Link>
            </div>

            {/* Right Column: 2x2 Stats & Consultation Photo Card */}
            <div className="about-stats-2x2">
              <article className="stat-card-vikram stat-card-1">
                <strong>70K+</strong>
                <span>Happy patients</span>
              </article>

              <article className="stat-card-vikram stat-card-2">
                <strong>25K+</strong>
                <span>Successful procedures</span>
              </article>

              <div className="about-photo-card">
                <img
                  src="https://cdn.prod.website-files.com/64abefce59d5dabbeb3b31ae/65813943632d5c150916e657_Manjinger%20Photo%202%20(1)-p-800.png"
                  alt="Dr. Manjinder Sandhu consulting patient"
                />
              </div>

              <article className="stat-card-vikram stat-card-3">
                <strong>33+</strong>
                <span>Years of experience</span>
              </article>
            </div>

          </div>
        </div>
      </section>

      {/* 3. CLINIC SPOTLIGHT SECTION (MODELED ON DR. VIKRAM CLINIC SPOTLIGHT) */}
      <section className="section-padding section-soft reveal-section">
        <div className="container-custom">
          <div className="clinic-spotlight-card">
            
            {/* Left Image Holder */}
            <div className="clinic-spotlight-img-holder">
              <img
                src="https://cdn.prod.website-files.com/64abefce59d5dabbeb3b31ae/65e18fc30f874ae6504460cc_homepage-p-800.jpg"
                alt="Atrius Cardiac Care Center Fortis FMRI Gurugram"
              />
            </div>

            {/* Right Content Meta */}
            <div>
              <span className="eyebrow-pill" style={{ marginBottom: "0.75rem" }}>
                HOSPITAL CONSULTATION CENTERS
              </span>
              <h2 style={{ fontSize: "2.2rem", color: "var(--secondary)", marginBottom: "1rem", lineHeight: 1.2 }}>
                Atrius Cardiac Care at Fortis FMRI, Sector 44, Gurugram
              </h2>
              <p style={{ color: "var(--text-body)", fontSize: "0.975rem", lineHeight: 1.6, marginBottom: "1.5rem" }}>
                Visit Dr. Manjinder Sandhu at Fortis Memorial Research Institute (FMRI) for 24/7 acute chest pain response, radial wrist angioplasty, TAVR heart valve evaluation, and complex coronary stenting consultation.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.75rem", fontSize: "0.9rem", color: "var(--secondary)" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem" }}>
                  <MapPin size={18} style={{ color: "var(--primary)", flexShrink: 0, marginTop: "2px" }} />
                  <span>{primaryClinic.address}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                  <Clock size={18} style={{ color: "var(--primary)", flexShrink: 0 }} />
                  <span>{primaryClinic.timings}</span>
                </div>
              </div>

              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <Link href="/contact-us" className="btn-primary">
                  Explore clinic centers
                </Link>
                <a href={primaryClinic.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="btn-outline">
                  Open maps
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. MEET OUR EXPERTS / DOCTOR PROFILE SECTION */}
      <section className="section-padding reveal-section" style={{ backgroundColor: "var(--bg-page)" }}>
        <div className="container-custom">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span className="eyebrow-pill">MEET OUR EXPERT</span>
            <h2 className="heading-underline" style={{ fontSize: "2.2rem", marginTop: "0.5rem" }}>
              Senior Interventional <span style={{ color: "var(--primary)" }}>Cardiology Leadership</span>
            </h2>
          </div>

          <div className="expert-top-row">
            {/* Left Portrait Card */}
            <div className="expert-image-card">
              <img
                src="https://cdn.prod.website-files.com/64abefce59d5dabbeb3b31ae/65813943632d5c150916e657_Manjinger%20Photo%202%20(1)-p-800.png"
                alt="Dr. Manjinder Sandhu Senior Interventional Cardiologist"
              />
            </div>

            {/* Right Profile Card */}
            <div className="expert-profile-card">
              <div>
                <h3 style={{ fontSize: "2rem", color: "var(--secondary)", marginBottom: "0.25rem" }}>
                  {doctorProfile.name}
                </h3>
                <div style={{ color: "var(--primary)", fontWeight: 700, fontSize: "0.95rem", marginBottom: "1.25rem" }}>
                  {doctorProfile.title}
                </div>
                <p style={{ color: "var(--text-body)", fontSize: "1rem", lineHeight: 1.6, marginBottom: "1.5rem" }}>
                  Dr. Sandhu provides evidence-based, patient-first consultations for chest pain, coronary blockages, valve replacements, arrhythmias, and heart failure management.
                </p>
              </div>

              <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "1.25rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.9rem", color: "var(--secondary)" }}>
                  <CheckCircle2 size={18} style={{ color: "var(--primary)", flexShrink: 0 }} />
                  <span>Patient-first consultation & angiography report review</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.9rem", color: "var(--secondary)" }}>
                  <CheckCircle2 size={18} style={{ color: "var(--primary)", flexShrink: 0 }} />
                  <span>Radial wrist access stenting & non-surgical TAVR planning</span>
                </div>
              </div>
            </div>
          </div>

          {/* 3 Feature Cards Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }} className="metrics-grid">
            <div className="card-surface" style={{ padding: "1.5rem", display: "flex", alignItems: "center", gap: "1.25rem", backgroundColor: "var(--bg-soft)" }}>
              <div className="circular-icon-badge" style={{ margin: 0, width: "56px", height: "56px", flexShrink: 0 }}>
                <ClipboardCheck size={26} />
              </div>
              <div>
                <h4 style={{ fontSize: "1.1rem", color: "var(--secondary)", marginBottom: "0.2rem" }}>Accurate Diagnosis</h4>
                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>IVUS & OCT imaging guidance</p>
              </div>
            </div>

            <div className="card-surface" style={{ padding: "1.5rem", display: "flex", alignItems: "center", gap: "1.25rem", backgroundColor: "var(--bg-soft)" }}>
              <div className="circular-icon-badge" style={{ margin: 0, width: "56px", height: "56px", flexShrink: 0 }}>
                <Zap size={26} />
              </div>
              <div>
                <h4 style={{ fontSize: "1.1rem", color: "var(--secondary)", marginBottom: "0.2rem" }}>Radial Wrist Access</h4>
                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>99% lower bleeding & fast walking</p>
              </div>
            </div>

            <div className="card-surface" style={{ padding: "1.5rem", display: "flex", alignItems: "center", gap: "1.25rem", backgroundColor: "var(--bg-soft)" }}>
              <div className="circular-icon-badge" style={{ margin: 0, width: "56px", height: "56px", flexShrink: 0 }}>
                <Heart size={26} />
              </div>
              <div>
                <h4 style={{ fontSize: "1.1rem", color: "var(--secondary)", marginBottom: "0.2rem" }}>Non-Surgical TAVR</h4>
                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>Keyhole aortic valve replacement</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE TREATMENTS CAROUSEL SECTION */}
      <section className="section-padding section-soft reveal-section">
        <div className="container-custom">
          <TreatmentsCarousel />
        </div>
      </section>

      {/* 6. UNIQUE INTERACTIVE TRANSRADIAL RECOVERY TIMELINE WIDGET SECTION */}
      <section className="section-padding reveal-section" style={{ backgroundColor: "var(--bg-page)" }}>
        <div className="container-custom">
          <TransradialRecoveryTimeline />
        </div>
      </section>

      {/* 7. SYMPTOM TRIAGE WIDGET */}
      <section className="section-padding section-soft reveal-section">
        <div className="container-custom">
          <SymptomTriageWidget />
        </div>
      </section>

      {/* 8. HEART SYMPTOMS NOT TO BE IGNORED */}
      <section className="section-padding reveal-section">
        <div className="container-custom">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div style={{ marginBottom: "0.75rem" }}>
              <span className="eyebrow-pill">EARLY WARNING SIGNS</span>
            </div>
            <h2 style={{ fontSize: "2.2rem", color: "var(--secondary)", lineHeight: 1.3 }}>
              Heart Symptoms That Should <span style={{ color: "var(--primary)" }}>Not Be Ignored</span>
            </h2>
            <div className="heading-underline" style={{ marginTop: "0.5rem" }} />
            <p style={{ color: "var(--text-body)", fontSize: "0.975rem", marginTop: "0.75rem", maxWidth: "640px", margin: "0.75rem auto 0 auto" }}>
              If you or a loved one experience any of these symptoms, seek immediate interventional cardiology review.
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "1.5rem",
            marginBottom: "2.5rem"
          }}>
            {[
              { label: "Chest Pain / Heavy Pressure", desc: "Squeezing sensation radiating to arm/jaw.", icon: <Heart size={28} style={{ color: "var(--primary)" }} /> },
              { label: "Shortness of Breath", desc: "Difficulty breathing during walk or rest.", icon: <Wind size={28} style={{ color: "var(--primary)" }} /> },
              { label: "Palpitations & Racing Pulse", desc: "Fluttering or skipped heartbeats.", icon: <Zap size={28} style={{ color: "var(--primary)" }} /> },
              { label: "Unexplained Dizziness", desc: "Faintness or sudden blackout spells.", icon: <AlertCircle size={28} style={{ color: "var(--primary)" }} /> },
              { label: "Uncontrolled High BP", desc: "Blood pressure reading > 140/90 mmHg.", icon: <Activity size={28} style={{ color: "var(--primary)" }} /> },
              { label: "Chronic Severe Fatigue", desc: "Exhaustion with routine light activities.", icon: <ShieldCheck size={28} style={{ color: "var(--primary)" }} /> }
            ].map((symp, i) => (
              <div key={i} className="card-surface" style={{ padding: "1.5rem", textAlign: "center" }}>
                <div className="circular-icon-badge" style={{ width: "64px", height: "64px", margin: "0 auto 1rem auto" }}>
                  {symp.icon}
                </div>
                <h4 style={{ fontSize: "1rem", color: "var(--secondary)", marginBottom: "0.35rem" }}>
                  {symp.label}
                </h4>
                <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                  {symp.desc}
                </p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center" }}>
            <button
              onClick={() => setBookingModalOpen(true)}
              className="btn-primary"
              style={{ padding: "0.85rem 2rem" }}
            >
              Consult Our Expert Team Today
            </button>
          </div>
        </div>
      </section>

      {/* 9. SCROLL REEL TESTIMONIALS & REVIEWS SECTION */}
      <section className="section-padding section-soft reveal-section">
        <div className="container-custom">
          {/* Main Section Header */}
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div style={{ marginBottom: "0.75rem" }}>
              <span className="eyebrow-pill">PATIENT TRUST & REVIEWS</span>
            </div>
            <h2 style={{ fontSize: "2.2rem", color: "var(--secondary)", lineHeight: 1.3 }}>
              What Our Patients <span style={{ color: "var(--primary)" }}>Say About Dr. Sandhu</span>
            </h2>
            <div className="heading-underline" style={{ marginTop: "0.5rem" }} />
          </div>

          {/* Testimonial Reel */}
          <div style={{ marginBottom: "4rem" }}>
            <ScrollReelTestimonials testimonials={reelTestimonials} />
          </div>

          {/* Featured Video Patient Story Sub-Section */}
          <div style={{
            borderTop: "1px solid var(--border-color)",
            paddingTop: "3.5rem",
            maxWidth: "760px",
            margin: "0 auto"
          }}>
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
              <div style={{ marginBottom: "0.5rem" }}>
                <span className="eyebrow-pill" style={{ backgroundColor: "var(--primary)", color: "#ffffff" }}>
                  VERIFIED PATIENT VIDEO
                </span>
              </div>
              <h3 style={{ fontSize: "1.6rem", color: "var(--secondary)", lineHeight: 1.3 }}>
                Watch TAVR Heart Valve Patient Recovery Experience
              </h3>
            </div>

            <VideoCard
              title="TAVR Valve Replacement Patient Recovery Experience"
              patientName="Sunita Verma (Mother's Case)"
              procedureTag="TAVR Valve Replacement"
              videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ"
            />
          </div>
        </div>
      </section>

      {/* 10. LATEST BLOG PREVIEW */}
      <section className="section-padding reveal-section" style={{ backgroundColor: "var(--bg-page)" }}>
        <div className="container-custom">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "2.5rem" }}>
            <div>
              <span className="eyebrow-pill">CARDIAC CONVERSATIONS</span>
              <h2 style={{ fontSize: "2rem", color: "var(--secondary)", marginTop: "0.4rem" }}>
                Latest Insights & <span style={{ color: "var(--primary)" }}>Health Articles</span>
              </h2>
            </div>

            <Link href="/blogs" className="btn-outline">
              View All Articles <ChevronRight size={16} />
            </Link>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "2rem"
          }}>
            {blogs.map((b) => (
              <div key={b.id} className="card-surface" style={{ padding: "1.75rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.775rem", color: "var(--text-muted)", marginBottom: "0.75rem" }}>
                    <span className="eyebrow-pill" style={{ fontSize: "0.7rem" }}>{b.category}</span>
                    <span>{b.publishDate}</span>
                    <span>•</span>
                    <span>{b.readTime}</span>
                  </div>

                  <h3 style={{ fontSize: "1.2rem", color: "var(--secondary)", marginBottom: "0.6rem", lineHeight: 1.3 }}>
                    {b.title}
                  </h3>

                  <p style={{ color: "var(--text-body)", fontSize: "0.875rem", lineHeight: 1.5, marginBottom: "1.25rem" }}>
                    {b.excerpt}
                  </p>
                </div>

                <Link
                  href={`/blogs/${b.slug}`}
                  style={{
                    color: "var(--primary)",
                    fontWeight: 700,
                    fontSize: "0.875rem",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.3rem"
                  }}
                >
                  Read Full Article <ChevronRight size={15} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. EMBEDDED CONTACT US FORM & APPOINTMENT SECTION */}
      <section className="reveal-section" style={{
        backgroundColor: "var(--secondary)",
        color: "#ffffff",
        padding: "4.5rem 0"
      }}>
        <div className="container-custom">
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "3.5rem",
            alignItems: "center"
          }} className="triage-grid">
            
            {/* Left Copy & Direct Buttons */}
            <div>
              <span className="eyebrow-pill" style={{ backgroundColor: "rgba(230,35,52,0.2)", color: "#ffffff", marginBottom: "1rem" }}>
                DIRECT CLINIC CONSULTATION
              </span>
              <h2 style={{ color: "#ffffff", fontSize: "2.5rem", marginBottom: "1rem", lineHeight: 1.15 }}>
                Prioritize Your <span style={{ color: "var(--primary)" }}>Heart Health Today</span>
              </h2>
              <p style={{ color: "#d1d5db", fontSize: "1.05rem", lineHeight: 1.6, marginBottom: "2rem" }}>
                Schedule your clinical consultation or angiography report review with Dr. Manjinder Sandhu across Fortis FMRI Gurugram, Manesar, and Delhi NCR hospital centers.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.95rem", color: "#e5e7eb" }}>
                  <ShieldCheck size={20} style={{ color: "var(--primary)" }} />
                  <span>24/7 Patient Helpdesk & Fast Appointment Confirmation</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.95rem", color: "#e5e7eb" }}>
                  <CheckCircle2 size={20} style={{ color: "var(--primary)" }} />
                  <span>Second Opinion for Stenting & TAVR Valve Replacement</span>
                </div>
              </div>

              {/* Side-by-Side Action Buttons */}
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <button
                  onClick={() => setBookingModalOpen(true)}
                  className="btn-primary"
                  style={{ padding: "0.9rem 1.75rem" }}
                >
                  <Calendar size={18} /> Book Direct Appointment
                </button>

                <a
                  href="tel:+918130370096"
                  className="btn-outline"
                  style={{ color: "#ffffff", borderColor: "rgba(255,255,255,0.3)", padding: "0.9rem 1.75rem" }}
                >
                  <Phone size={18} /> Call Hospital Desk
                </a>
              </div>
            </div>

            {/* Right Embedded Contact Us Form */}
            <div style={{
              backgroundColor: "#ffffff",
              borderRadius: "var(--radius-xl)",
              padding: "2.5rem",
              boxShadow: "0 20px 48px rgba(0,0,0,0.3)",
              color: "var(--secondary)"
            }}>
              {ctaSubmitted ? (
                <div style={{ textAlign: "center", padding: "2rem 1rem" }}>
                  <div style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    backgroundColor: "var(--primary-light)",
                    color: "var(--primary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 1rem auto"
                  }}>
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 style={{ fontSize: "1.5rem", color: "var(--secondary)", marginBottom: "0.5rem" }}>
                    Appointment Request Received!
                  </h3>
                  <p style={{ color: "var(--text-body)", fontSize: "0.95rem", lineHeight: 1.5 }}>
                    Thank you, <strong>{ctaForm.fullName}</strong>. Dr. Sandhu&apos;s clinical team will reach out to you shortly at <strong>{ctaForm.phone}</strong> to confirm your consultation time.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleCtaSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  <h3 style={{ fontSize: "1.4rem", color: "var(--secondary)", marginBottom: "0.2rem" }}>
                    Request Consultation
                  </h3>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "0.5rem" }}>
                    Fill out your details for immediate callback from Dr. Sandhu&apos;s appointment desk.
                  </p>

                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "0.35rem", color: "var(--secondary)" }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rajesh Kumar"
                      value={ctaForm.fullName}
                      onChange={(e) => setCtaForm({ ...ctaForm, fullName: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "0.75rem 1rem",
                        borderRadius: "var(--radius-md)",
                        border: "1px solid var(--border-color)",
                        fontSize: "0.925rem",
                        outline: "none"
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "0.35rem", color: "var(--secondary)" }}>
                      Phone / Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98100 00000"
                      value={ctaForm.phone}
                      onChange={(e) => setCtaForm({ ...ctaForm, phone: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "0.75rem 1rem",
                        borderRadius: "var(--radius-md)",
                        border: "1px solid var(--border-color)",
                        fontSize: "0.925rem",
                        outline: "none"
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "0.35rem", color: "var(--secondary)" }}>
                      Preferred Hospital Center
                    </label>
                    <select
                      value={ctaForm.clinic}
                      onChange={(e) => setCtaForm({ ...ctaForm, clinic: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "0.75rem 1rem",
                        borderRadius: "var(--radius-md)",
                        border: "1px solid var(--border-color)",
                        fontSize: "0.925rem",
                        outline: "none",
                        backgroundColor: "#ffffff"
                      }}
                    >
                      {clinicLocations.map((loc) => (
                        <option key={loc.id} value={loc.name}>
                          {loc.shortName}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "0.35rem", color: "var(--secondary)" }}>
                      Message / Primary Heart Concern
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Describe symptoms, angiography report, or consultation query..."
                      value={ctaForm.message}
                      onChange={(e) => setCtaForm({ ...ctaForm, message: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "0.75rem 1rem",
                        borderRadius: "var(--radius-md)",
                        border: "1px solid var(--border-color)",
                        fontSize: "0.925rem",
                        outline: "none",
                        resize: "none"
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-primary"
                    style={{ width: "100%", justifyContent: "center", padding: "0.9rem" }}
                  >
                    <Send size={18} /> Submit Consultation Request
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
      />
    </div>
  );
}
