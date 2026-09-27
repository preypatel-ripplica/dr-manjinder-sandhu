import Link from "next/link";
import { ArrowUpRight, Instagram, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container-custom">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/">Dr. Manjinder Sandhu</Link>
            <p>
              Personal care. Clinical expertise.
              <br />A considered approach to your heart health.
            </p>
            <span>Gurugram · Manesar · New Delhi</span>
          </div>
          <div>
            <h2>Quick links</h2>
            <Link href="/about-us">About</Link>
            <Link href="/treatments">Treatments</Link>
            <Link href="/expertise">Expertise</Link>
            <Link href="/procedures">Procedures</Link>
            <Link href="/consultation-plans">Fees</Link>
          </div>
          <div>
            <h2>Patient information</h2>
            <Link href="/patient-stories">Patient stories</Link>
            <Link href="/testimonials">Patient reviews</Link>
            <Link href="/video-gallery">Videos</Link>
            <Link href="/blogs">Blogs</Link>
            <Link href="/contact-us">Locations</Link>
          </div>
          <div className="footer-contact">
            <h2>Let’s talk</h2>
            <a href="tel:+918130370096">
              +91 81303 70096 <ArrowUpRight size={16} />
            </a>
            <p>Contact the appointment desk to arrange your visit.</p>
            <div className="social-links">
              <a
                href="https://www.youtube.com/channel/UCTcSjzNhA-CUo45DxTVbM6Q"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Dr. Sandhu on YouTube"
              >
                <Youtube size={21} />
              </a>
              <a
                href="https://www.instagram.com/drsandhucardiologist"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Dr. Sandhu on Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} Dr. Manjinder Sandhu. All rights
            reserved.
          </span>
          <span>
            For patient education. Not a substitute for a medical consultation.
          </span>
        </div>
      </div>
    </footer>
  );
}
