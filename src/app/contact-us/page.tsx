import { Clock, MapPin, MessageCircle, Phone } from "lucide-react";
import { AppointmentForm } from "@/components/AppointmentForm";
import { clinicLocations } from "@/data/clinics";
export default function ContactUsPage() {
  return (
    <div>
      <section className="contact-hero">
        <div className="container-custom contact-hero-grid">
          <div>
            <span className="eyebrow-pill">CONTACT & LOCATIONS</span>
            <h1>Let’s plan your visit.</h1>
            <p>
              Choose the hospital most convenient for you, then send a request
              or speak directly with the appointment desk.
            </p>
            <div className="contact-quick-links">
              <a href="tel:+918130370096">
                <Phone size={18} /> +91 81303 70096
              </a>
              <a
                href="https://wa.me/918130370096"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle size={18} /> Chat on WhatsApp
              </a>
            </div>
          </div>
          <img
            src="/images/heart-consultation.jpg"
            alt="A clinician taking a patient's blood pressure"
            width={800}
            height={600}
            fetchPriority="high"
          />
        </div>
      </section>
      <section className="section-padding">
        <div className="container-custom locations-heading">
          <span className="eyebrow-pill">FOUR CONSULTATION LOCATIONS</span>
          <h2>Find your nearest hospital.</h2>
          <p>
            Appointments are confirmed in advance. Select a location for
            directions and current clinic timings.
          </p>
        </div>
        <div className="container-custom location-cards">
          {clinicLocations.map((clinic) => (
            <article className="location-card" key={clinic.id}>
              <img
                src={clinic.image}
                alt={`${clinic.name} exterior`}
                width={800}
                height={500}
                loading="lazy"
              />
              <div>
                <span className="eyebrow-pill">{clinic.city}</span>
                <h3>{clinic.shortName}</h3>
                <p>
                  <MapPin size={16} /> {clinic.address}
                </p>
                <p>
                  <Clock size={16} /> {clinic.timings}
                </p>
                <a
                  className="text-link"
                  href={clinic.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open in Google Maps <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="section-padding section-soft">
        <div className="container-custom contact-booking-grid">
          <div>
            <span className="eyebrow-pill">BOOK APPOINTMENT</span>
            <h2>Send your request.</h2>
            <p>
              Tell us how to reach you and which hospital suits you. The
              appointment desk will confirm the available time and location.
            </p>
            <p className="urgent-note">
              For urgent symptoms, contact your nearest emergency department.
              This form is for routine appointment requests.
            </p>
          </div>
          <div className="booking-panel">
            <h3>Appointment request</h3>
            <p>We usually need only a few details to get started.</p>
            <AppointmentForm />
          </div>
        </div>
      </section>
    </div>
  );
}
