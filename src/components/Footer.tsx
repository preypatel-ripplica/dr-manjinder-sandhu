"use client";

import Link from "next/link";
import { ArrowUpRight, Instagram, Youtube } from "lucide-react";
import { useI18n } from "./I18nProvider";

export function Footer() {
  const { t, localizeHref } = useI18n();

  return (
    <footer className="site-footer">
      <div className="container-custom">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href={localizeHref("/")}>{t("Dr. Manjinder Sandhu")}</Link>
            <p>
              {t("Personal care. Clinical expertise.")}
              <br />
              {t("A considered approach to your heart health.")}
            </p>
            <span>{t("Gurugram · Manesar · New Delhi")}</span>
          </div>
          <div>
            <h2>{t("Quick links")}</h2>
            <Link href={localizeHref("/about-us")}>{t("About")}</Link>
            <Link href={localizeHref("/treatments")}>{t("Treatments")}</Link>
            <Link href={localizeHref("/expertise")}>{t("Expertise")}</Link>
            <Link href={localizeHref("/procedures")}>{t("Procedures")}</Link>
            <Link href={localizeHref("/consultation-plans")}>{t("Fees")}</Link>
          </div>
          <div>
            <h2>{t("Patient information")}</h2>
            <Link href={localizeHref("/patient-stories")}>{t("Patient stories")}</Link>
            <Link href={localizeHref("/testimonials")}>{t("Patient reviews")}</Link>
            <Link href={localizeHref("/video-gallery")}>{t("Videos")}</Link>
            <Link href={localizeHref("/blogs")}>{t("Blogs")}</Link>
            <Link href={localizeHref("/contact-us")}>{t("Locations")}</Link>
          </div>
          <div className="footer-contact">
            <h2>{t("Let’s talk")}</h2>
            <a href="tel:+918130370096">
              +91 81303 70096 <ArrowUpRight size={16} />
            </a>
            <p>{t("Contact the appointment desk to arrange your visit.")}</p>
            <div className="social-links">
              <a
                href="https://www.youtube.com/channel/UCTcSjzNhA-CUo45DxTVbM6Q"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("Dr. Sandhu on YouTube")}
              >
                <Youtube size={21} />
              </a>
              <a
                href="https://www.instagram.com/drsandhucardiologist"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("Dr. Sandhu on Instagram")}
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {t("Dr. Manjinder Sandhu. All rights reserved.")}
          </span>
          <span>
            {t("For patient education. Not a substitute for a medical consultation.")}
          </span>
        </div>
      </div>
    </footer>
  );
}
