"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useI18n } from "./I18nProvider";

interface FAQAccordionProps {
  items: { question: string; answer: string }[];
  title?: string;
  showPricingDisclaimer?: boolean;
}

export function FAQAccordion({
  items,
  title = "Frequently asked questions",
  showPricingDisclaimer = true,
}: FAQAccordionProps) {
  const id = useId();
  const [openIndex, setOpenIndex] = useState(0);
  const { t } = useI18n();

  return (
    <section className="faq-list" aria-labelledby={id}>
      <h3 id={id}>{t(title)}</h3>
      <div className="faq-items">
        {items.map((item, index) => {
          const isOpen = index === openIndex;
          const panelId = `${id}-panel-${index}`;
          return (
            <article
              className="faq-item"
              data-open={isOpen}
              key={item.question}
            >
              <h4>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                >
                  <span>{t(item.question)}</span>
                  <ChevronDown size={18} aria-hidden="true" />
                </button>
              </h4>
              <div
                id={panelId}
                className="faq-answer"
                role="region"
                aria-hidden={!isOpen}
              >
                <div>
                  <p>{t(item.answer)}</p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
      {showPricingDisclaimer && (
        <p className="field-hint">
          {t("Costs depend on your individual treatment plan. Ask the appointment desk for a personal estimate.")}
        </p>
      )}
    </section>
  );
}
