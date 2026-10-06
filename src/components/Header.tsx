"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Phone, ArrowUpRight } from "lucide-react";
import { BookingModal } from "./BookingModal";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useI18n } from "./I18nProvider";
import { treatments } from "@/data/treatments";

const healthCareLinks = [
  ["Expertise", "/expertise"],
  ["Procedures", "/procedures"],
  ["Patient stories", "/patient-stories"],
  ["Fees", "/consultation-plans"],
];

export function Header() {
  const pathname = usePathname();
  const { t, localizeHref } = useI18n();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [treatmentsOpen, setTreatmentsOpen] = useState(false);
  const [careOpen, setCareOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const careRef = useRef<HTMLDivElement>(null);
  const treatmentsRef = useRef<HTMLDivElement>(null);
  const careButton = useRef<HTMLButtonElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMobileOpen(false);
    setTreatmentsOpen(false);
    setCareOpen(false);
  }, [pathname]);

  useEffect(() => {
    function close(event: PointerEvent) {
      if (!careRef.current?.contains(event.target as Node)) setCareOpen(false);
      if (!treatmentsRef.current?.contains(event.target as Node))
        setTreatmentsOpen(false);
    }
    function escape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        if (careOpen) {
          setCareOpen(false);
          careButton.current?.focus();
        }
        if (treatmentsOpen) setTreatmentsOpen(false);
        if (mobileOpen) {
          setMobileOpen(false);
          menuButton.current?.focus();
        }
      }
    }
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", escape);
    };
  }, [careOpen, mobileOpen, treatmentsOpen]);

  const active = (href: string) =>
    pathname === localizeHref(href) ? ("page" as const) : undefined;

  return (
    <>
      <div className="utility-bar">
        <div className="container-custom utility-inner">
          <span>
            {t("CARDIOLOGY CARE")}{" "}
            <span className="utility-location">{t("· Gurugram & Delhi NCR")}</span>
          </span>
          <a href="tel:+918130370096">
            <Phone size={13} /> +91 81303 70096
          </a>
        </div>
      </div>
      <header className="site-header">
        <div className="container-custom header-inner">
          <Link
            className="brand"
            href={localizeHref("/")}
            aria-label={t("Dr. Manjinder Sandhu, home")}
          >
            <span className="brand-text">
              <span className="wordmark-name">
                <span className="wordmark-prefix">Dr.</span> Manjinder{" "}
                <strong>
                  Sandhu<span className="wordmark-period">.</span>
                </strong>
              </span>
              <small>{t("INTERVENTIONAL CARDIOLOGIST")}</small>
            </span>
          </Link>
          <nav className="main-nav" aria-label={t("Main navigation")}>
            <Link href={localizeHref("/")} aria-current={active("/")}>
              {t("Home")}
            </Link>
            <Link href={localizeHref("/about-us")} aria-current={active("/about-us")}>
              {t("About")}
            </Link>
            <div
              className="nav-dropdown nav-treatment-dropdown"
              ref={treatmentsRef}
              onMouseEnter={() => setTreatmentsOpen(true)}
              onMouseLeave={() => setTreatmentsOpen(false)}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget))
                  setTreatmentsOpen(false);
              }}
            >
              <Link
                href={localizeHref("/treatments")}
                aria-current={active("/treatments")}
                onFocus={() => setTreatmentsOpen(true)}
              >
                {t("Treatments")}
              </Link>
              <button
                className="nav-caret-button"
                onClick={() => setTreatmentsOpen(!treatmentsOpen)}
                aria-label={t("Open treatments menu")}
                aria-expanded={treatmentsOpen}
                aria-controls="treatments-navigation"
              >
                <ChevronDown size={14} />
              </button>
              <div
                className="nav-dropdown-panel treatment-dropdown-panel"
                id="treatments-navigation"
                data-open={treatmentsOpen}
                inert={!treatmentsOpen}
                aria-hidden={!treatmentsOpen}
              >
                <Link
                  className="dropdown-overview"
                  href={localizeHref("/treatments")}
                  onClick={() => setTreatmentsOpen(false)}
                >
                  {t("All treatments")} <ArrowUpRight size={14} />
                </Link>
                {treatments.map((treatment) => (
                  <Link
                    key={treatment.id}
                    href={localizeHref(`/treatments/${treatment.slug}`)}
                    onClick={() => setTreatmentsOpen(false)}
                  >
                    <span>{t(treatment.title)}</span>
                    <ArrowUpRight size={14} />
                  </Link>
                ))}
              </div>
            </div>
            <div
              className="nav-dropdown"
              ref={careRef}
              onMouseEnter={() => setCareOpen(true)}
              onMouseLeave={() => setCareOpen(false)}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget))
                  setCareOpen(false);
              }}
            >
              <button
                ref={careButton}
                onClick={() => setCareOpen(!careOpen)}
                aria-expanded={careOpen}
                aria-controls="care-navigation"
              >
                {t("Care")} <ChevronDown size={14} />
              </button>
              <div
                className="nav-dropdown-panel"
                id="care-navigation"
                data-open={careOpen}
                inert={!careOpen}
                aria-hidden={!careOpen}
              >
                {healthCareLinks.map(([label, href]) => (
                  <Link
                    key={href}
                    href={localizeHref(href)}
                    onClick={() => setCareOpen(false)}
                  >
                    {t(label)}
                    <ArrowUpRight size={14} />
                  </Link>
                ))}
              </div>
            </div>
            <Link href={localizeHref("/blogs")} aria-current={active("/blogs")}>
              {t("Blogs")}
            </Link>
            <Link href={localizeHref("/contact-us")} aria-current={active("/contact-us")}>
              {t("Contact")}
            </Link>
          </nav>
          <div className="header-actions">
            <LanguageSwitcher />
            <button
              className="btn-primary header-book"
              onClick={() => setBookingOpen(true)}
            >
              {t("Book appointment")} <ArrowUpRight size={16} />
            </button>
            <button
              ref={menuButton}
              className="menu-toggle"
              aria-label={mobileOpen ? t("Close navigation") : t("Open navigation")}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        <nav
          className="mobile-navigation"
          data-open={mobileOpen}
          inert={!mobileOpen}
          aria-hidden={!mobileOpen}
          id="mobile-navigation"
          aria-label={t("Mobile navigation")}
        >
          {[
            [t("Home"), "/"],
            [t("About"), "/about-us"],
            [t("Treatments"), "/treatments"],
            ...treatments.map((treatment) => [
              `— ${t(treatment.title)}`,
              `/treatments/${treatment.slug}`,
            ]),
            ...healthCareLinks.map(([l, h]) => [t(l), h]),
            [t("Blogs"), "/blogs"],
            [t("Contact & locations"), "/contact-us"],
          ].map(([label, href]) => (
            <Link
              key={href}
              href={localizeHref(href)}
              aria-current={active(href)}
              onClick={() => setMobileOpen(false)}
            >
              {label}
              <ArrowUpRight size={16} />
            </Link>
          ))}
          <button
            className="btn-primary"
            onClick={() => {
              setMobileOpen(false);
              setBookingOpen(true);
            }}
          >
            {t("Book appointment")}
          </button>
        </nav>
      </header>
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />
    </>
  );
}
