"use client";

import { useState } from "react";
import { usePanelMotion } from "@/hooks/usePanelMotion";
import Link from "next/link";
import {
  ArrowUpRight,
  Activity,
  Heart,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import { careVisuals } from "@/data/care-visuals";
import { useI18n } from "./I18nProvider";

const areas = [
  {
    slug: "radial-angiography-angioplasty",
    label: "Blocked arteries",
    icon: Activity,
  },
  { slug: "tavr-tavi", label: "Heart valves", icon: Heart },
  { slug: "pacemaker-implants", label: "Heart rhythm", icon: Stethoscope },
  {
    slug: "risk-factor-assessment-counselling",
    label: "Prevention",
    icon: ShieldCheck,
  },
];

export function CareExplorer() {
  const [active, setActive] = useState(0);
  const panelRef = usePanelMotion(active);
  const { t, localizeHref } = useI18n();
  const area = areas[active];
  const visual = careVisuals[area.slug];

  return (
    <div className="care-explorer">
      <div
        className="explorer-controls"
        role="group"
        aria-label={t("Explore heart care")}
      >
        {areas.map((item, i) => (
          <button
            key={item.slug}
            aria-pressed={i === active}
            aria-controls="care-explorer-panel"
            onClick={() => setActive(i)}
          >
            <item.icon size={23} strokeWidth={1.5} />
            <span>{t(item.label)}</span>
            <ArrowUpRight size={17} />
          </button>
        ))}
      </div>
      <div
        ref={panelRef}
        id="care-explorer-panel"
        className="explorer-panel"
        aria-live="polite"
        aria-atomic="true"
      >
        <img
          key={visual.image}
          src={visual.image}
          alt={t(visual.alt)}
          loading="lazy"
          width={800}
          height={600}
        />
        <div className="explorer-copy" key={area.slug}>
          <span className="eyebrow-pill">0{active + 1} / {t("SPECIALIST CARE")}</span>
          <h3>{t(visual.title)}</h3>
          <p>{t(visual.summary)}</p>
          <dl className="mini-facts">
            <div>
              <dt>{t("Focus")}</dt>
              <dd>{t(visual.focus)}</dd>
            </div>
            <div>
              <dt>{t("Approach")}</dt>
              <dd>{t(visual.approach)}</dd>
            </div>
          </dl>
          <Link className="text-link" href={localizeHref(`/treatments/${area.slug}`)}>
            {t("Explore this treatment")} <ArrowUpRight size={17} />
          </Link>
        </div>
      </div>
    </div>
  );
}
