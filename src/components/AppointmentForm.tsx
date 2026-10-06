"use client";

import { FormEvent, useEffect, useId, useState } from "react";
import { ArrowUpRight, ChevronDown, MessageCircle, Phone } from "lucide-react";
import { clinicLocations } from "@/data/clinics";
import { consultationPlans } from "@/data/consultation-plans";
import { useI18n } from "./I18nProvider";

export function AppointmentForm({
  preSelectedPlan,
}: {
  preSelectedPlan?: string;
}) {
  const id = useId();
  const { t } = useI18n();
  const [plan, setPlan] = useState(preSelectedPlan || "");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    setPlan(preSelectedPlan || "");
  }, [preSelectedPlan]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.append("access_key", "bea3d5e4-193a-4cbb-9a82-4941ba985e11");
    formData.append(
      "subject",
      "New appointment request — Dr. Manjinder Sandhu",
    );
    formData.append("from_name", "Dr. Manjinder Sandhu website");
    setSending(true);
    setStatus("idle");
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = (await response.json()) as { message?: string; success?: boolean };
      if (!response.ok || !data.success)
        throw new Error(data.message || t("Unable to send your request."));
      form.reset();
      setPlan("");
      setStatus("success");
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : t("Something went wrong. Please try again."),
      );
      setStatus("error");
    } finally {
      setSending(false);
    }
  }

  return (
    <form className="appointment-form" onSubmit={submit}>
      <div className="form-field">
        <label htmlFor={`${id}-email`}>
          {t("Email address")} <span aria-hidden="true">*</span>
        </label>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          required
        />
      </div>
      <div className="form-field">
        <label htmlFor={`${id}-name`}>
          {t("Your name")} <span aria-hidden="true">*</span>
        </label>
        <input
          id={`${id}-name`}
          name="name"
          autoComplete="name"
          placeholder={t("Full name")}
          required
          maxLength={100}
          pattern=".*\S.*"
        />
      </div>
      <div className="form-field">
        <label htmlFor={`${id}-phone`}>
          {t("Phone number")} <span aria-hidden="true">*</span>
        </label>
        <input
          id={`${id}-phone`}
          name="phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          placeholder={t("Your mobile number")}
          required
          pattern="\+?[0-9\s\(\)\-]{7,20}"
          title={t("Enter a phone number with 7–20 digits, spaces, or brackets.")}
        />
      </div>
      <div className="form-field">
        <label htmlFor={`${id}-clinic`}>{t("Preferred location")}</label>
        <select
          id={`${id}-clinic`}
          name="clinic"
          defaultValue={clinicLocations[0].shortName}
        >
          {clinicLocations.map((c) => (
            <option key={c.id} value={c.shortName}>
              {t(c.shortName)}
            </option>
          ))}
        </select>
      </div>
      <details
        className="optional-details"
        open={preSelectedPlan ? true : undefined}
      >
        <summary>
          {t("Additional details")} <span>{t("optional")}</span>
          <ChevronDown size={16} />
        </summary>
        <div className="optional-fields">
          <div className="form-field">
            <label htmlFor={`${id}-plan`}>{t("Consultation type")}</label>
            <select
              id={`${id}-plan`}
              name="consultation_type"
              value={plan}
              onChange={(e) => setPlan(e.target.value)}
            >
              <option value="">{t("Help me choose")}</option>
              {consultationPlans.map((p) => (
                <option key={p.id} value={p.title}>
                  {t(p.title)}
                </option>
              ))}
            </select>
          </div>
          <div className="form-field">
            <label htmlFor={`${id}-date`}>{t("Preferred date")}</label>
            <input
              id={`${id}-date`}
              name="preferred_date"
              type="date"
              min={[
                new Date().getFullYear(),
                String(new Date().getMonth() + 1).padStart(2, "0"),
                String(new Date().getDate()).padStart(2, "0"),
              ].join("-")}
            />
          </div>
          <div className="form-field">
            <label htmlFor={`${id}-message`}>
              {t("Anything you would like us to know?")}
            </label>
            <textarea
              id={`${id}-message`}
              name="message"
              rows={3}
              placeholder={t("A brief question (please avoid sensitive medical details)")}
              maxLength={1500}
            />
          </div>
        </div>
      </details>
      <button
        className="btn-primary form-submit"
        type="submit"
        disabled={sending}
      >
        {sending ? (
          t("Sending…")
        ) : (
          <>
            {t("Send appointment request")} <ArrowUpRight size={17} />
          </>
        )}
      </button>
      <p className="form-note">
        {t("By sending this form, you agree to be contacted about your request. The team will confirm availability, timing and location.")}
      </p>
      {status === "success" && (
        <p className="form-status" role="status">
          {t("Thank you. Your request has been sent. The appointment desk will be in touch.")}
        </p>
      )}
      {status === "error" && (
        <p className="form-status form-status-error" role="alert">
          {errorMessage}
        </p>
      )}
      <div className="form-alternatives">
        <a className="form-phone" href="tel:+918130370096">
          <Phone size={15} /> {t("Call +91 81303 70096")}
        </a>
        <a
          className="form-phone"
          href="https://wa.me/918130370096"
          target="_blank"
          rel="noopener noreferrer"
        >
          <MessageCircle size={15} /> {t("WhatsApp")}
        </a>
      </div>
    </form>
  );
}
