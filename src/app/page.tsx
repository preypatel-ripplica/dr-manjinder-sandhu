"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Phone, HeartPulse, FileHeart, CalendarDays, ShieldCheck, Check } from "lucide-react";
import { BookingModal } from "@/components/BookingModal";
import { AppointmentForm } from "@/components/AppointmentForm";
import { ClinicLocations } from "@/components/ClinicLocations";
import { PatientReel } from "@/components/PatientReel";
import { CareExplorer } from "@/components/CareExplorer";
import { CarePathFinder } from "@/components/CarePathFinder";
import { VisitJourney } from "@/components/VisitJourney";
import { ExperienceStats } from "@/components/ExperienceStats";
import { FAQAccordion } from "@/components/FAQAccordion";
const questions = [
  { question: "Can I come for a second opinion?", answer: "Yes. Bring your existing reports, prescriptions and treatment recommendations. Your consultation is an opportunity to understand your options and ask questions about the next steps." },
  { question: "What should I bring to my appointment?", answer: "Bring previous prescriptions, test and scan reports, a list of your current medicines, and any questions you would like to discuss. The team will confirm your appointment location and time." },
  { question: "Where can I see Dr. Sandhu?", answer: "Consultations are available at four locations across Gurugram, Manesar and New Delhi. See the locations below or call the appointment desk to confirm availability." },
  { question: "How do I find out about consultation fees?", answer: "Visit our consultation fees page for the listed options. The appointment desk can confirm the applicable fee and help you choose the right appointment type." },
];
export default function HomePage() {
  const [bookingOpen, setBookingOpen] = useState(false);
  return <div className="home-page">
    <section className="home-hero">
      <div className="container-custom hero-grid">
        <div className="hero-copy">
          <span className="eyebrow-pill"><span className="status-dot" /> EXPERTISE WITH EMPATHY</span>
          <h1>A healthier heart.<br /><em>A fuller life.</em></h1>
          <p>Expert heart care, with the time to listen.<br />Dr. Manjinder Sandhu helps you understand your options and take your next step with confidence.</p>
          <div className="hero-actions"><button className="btn-primary" onClick={() => setBookingOpen(true)}>Book an appointment <ArrowUpRight size={18} /></button><Link className="text-link" href="/about-us">Meet your doctor <ArrowRight size={17} /></Link></div>
          <div className="hero-affiliation"><ShieldCheck size={25} strokeWidth={1.4} /><div><strong>33+ years of clinical experience</strong><span>Principal Director – Cardiology<br />Fortis Healthcare</span></div></div>
        </div>
        <div className="hero-portrait">
          <div className="portrait-orbit" aria-hidden="true" /><span className="portrait-word" aria-hidden="true">care.</span>
          <img src="/images/dr-sandhu-cutout.png" alt="Dr. Manjinder Sandhu, Senior Interventional Cardiologist" width="560" height="700" fetchPriority="high" />
          <div className="portrait-note"><HeartPulse size={24} strokeWidth={1.3} /><span>Advanced care.<br /><strong>A human connection.</strong></span></div>
          <div className="portrait-caption"><span>Dr. (Col.) Manjinder Sandhu</span><span>MD, DNB, DM, FACC, FSCAI</span></div>
        </div>
      </div>
    </section>
    <div className="quick-paths container-custom" aria-label="Find care"><a href="#heart-care"><HeartPulse /><span><small>YOUR TREATMENT OPTIONS</small>Explore treatments</span><ArrowUpRight /></a><Link href="/consultation-plans"><FileHeart /><span><small>BEFORE YOUR VISIT</small>Appointments & fees</span><ArrowUpRight /></Link><a href="#appointments"><CalendarDays /><span><small>OUR CLINIC LOCATIONS</small>Find a clinic near you</span><ArrowUpRight /></a></div>
    <section className="section-padding" id="heart-care"><div className="container-custom"><div className="section-heading"><div><span className="eyebrow-pill">01 / CARE THAT’S RIGHT FOR YOU</span><h2>Every heart is different.<br /><em>Your care should be, too.</em></h2></div><div><p className="heading-note">From prevention to complex procedures,<br />understand your options at your own pace.</p><Link className="text-link" href="/treatments">View all treatments <ArrowUpRight size={17} /></Link></div></div><CareExplorer /><p className="urgent-note">For urgent symptoms, contact your nearest emergency department. This website and appointment requests are for routine care.</p></div></section>
    <section className="doctor-story section-padding"><div className="container-custom doctor-intro-grid"><div className="doctor-photo"><img src="/images/dr-sandhu-office.png" width="800" height="800" loading="lazy" alt="Dr. Sandhu in his consultation room" /><span className="photo-label">EXPERIENCE. EMPATHY. EVERY DAY.</span></div><div className="doctor-intro-copy"><span className="eyebrow-pill">02 / MEET DR. SANDHU</span><h2>Clinical expertise.<br /><em>A personal commitment.</em></h2><p>Behind every report is a person, a family, and a life to get back to. That understanding is at the heart of Dr. Sandhu’s approach.</p><p>An alumnus of AFMC Pune and PGIMER Chandigarh, he brings experience from the Indian Armed Forces and leading cardiac centres to every consultation.</p><ul className="doctor-principles"><li><Check size={17} /> Clear explanations, without the jargon</li><li><Check size={17} /> Care decisions made together</li><li><Check size={17} /> Guidance from consultation to follow-up</li></ul><Link className="text-link" href="/about-us">Get to know Dr. Sandhu <ArrowRight size={17} /></Link></div></div><div className="container-custom"><ExperienceStats /></div></section>
    <CarePathFinder />
    <VisitJourney />
    <section className="section-padding patient-section"><div className="container-custom"><div className="section-heading"><div><span className="eyebrow-pill">PATIENT EXPERIENCES</span><h2>The people behind<br /><em>the heartbeats.</em></h2></div><Link className="text-link" href="/testimonials">More patient experiences <ArrowUpRight size={17} /></Link></div><PatientReel /></div></section>
    <section className="section-padding"><div className="container-custom home-faq-grid"><div><span className="eyebrow-pill">A LITTLE MORE CLARITY</span><h2>Good questions.<br /><em>Clear answers.</em></h2><p>Small details can make a big difference to feeling prepared.</p><Link className="text-link" href="/consultation-plans">View consultation fees <ArrowUpRight size={17} /></Link></div><FAQAccordion items={questions} title="Before your visit" showPricingDisclaimer={false} /></div></section>
    <section className="section-padding appointment-section" id="appointments"><div className="container-custom booking-section-grid"><div><span className="eyebrow-pill">LET’S TAKE THE NEXT STEP</span><h2>Your heart deserves<br /><em>a conversation.</em></h2><p className="section-description">Choose a location that works for you. Our team will help arrange your visit.</p><a className="appointment-call" href="tel:+918130370096"><Phone size={21} /><span><small>CALL THE APPOINTMENT DESK</small>+91 81303 70096</span><ArrowUpRight size={19} /></a><ClinicLocations /></div><div className="booking-panel"><span className="eyebrow-pill">WE’RE HERE TO HELP</span><h3>Request an appointment</h3><p>Tell us a little about yourself to get started.</p><AppointmentForm /></div></div></section>
    <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
  </div>;
}
