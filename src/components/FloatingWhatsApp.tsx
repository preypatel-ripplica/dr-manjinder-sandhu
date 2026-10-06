"use client";

import { MessageCircle } from "lucide-react";
import { useI18n } from "./I18nProvider";

export function FloatingWhatsApp() {
  const { t } = useI18n();

  return (
    <a
      className="whatsapp-float"
      href="https://wa.me/918130370096?text=Hello%2C%20I%20would%20like%20to%20enquire%20about%20a%20consultation%20with%20Dr.%20Sandhu."
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("Chat with the appointment desk on WhatsApp")}
    >
      <MessageCircle size={23} />
      <span>{t("WhatsApp")}</span>
    </a>
  );
}
