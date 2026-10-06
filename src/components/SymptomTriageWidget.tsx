"use client";
import { useId, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BookingModal } from "./BookingModal";
import { useI18n } from "./I18nProvider";

const options = [
  {
    title: "Plan my first consultation",
    description: "Meet Dr. Sandhu and discuss your heart health.",
    plan: "plan-first",
  },
  {
    title: "Ask for a second opinion",
    description: "Discuss an existing diagnosis or treatment recommendation.",
    plan: "plan-second-opinion",
  },
  {
    title: "Arrange a follow-up",
    description: "Review your reports or discuss your ongoing care.",
    plan: "plan-revisit",
  },
];

export function SymptomTriageWidget() {
  const { t, localizeHref } = useI18n();
  const [selected, setSelected] = useState(0);
  const [bookingOpen, setBookingOpen] = useState(false);
  const id = useId();

  return (
    <div className="visit-guide">
      <fieldset>
        <legend>{t("What would you like help with?")}</legend>
        <div className="visit-options">
          {options.map((option, i) => (
            <label
              key={option.plan}
              className={selected === i ? "is-selected" : ""}
            >
              <input
                type="radio"
                name={id}
                checked={selected === i}
                onChange={() => setSelected(i)}
              />
              <span>
                <strong>{t(option.title)}</strong>
                <span>{t(option.description)}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className="visit-guide-actions">
        <button className="btn-primary" onClick={() => setBookingOpen(true)}>
          {t("Book appointment")} <ArrowUpRight size={16} />
        </button>
        <Link className="text-link" href={localizeHref("/treatments")}>
          {t("Browse treatments")}
        </Link>
      </div>
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        preSelectedPlan={options[selected].plan}
      />
    </div>
  );
}
