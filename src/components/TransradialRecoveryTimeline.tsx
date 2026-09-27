"use client";

import React, { useState } from "react";
import { usePanelMotion } from "@/hooks/usePanelMotion";
import {
  Sparkles,
  Clock,
  CheckCircle2,
  ShieldCheck,
  Heart,
  AlertCircle,
  ArrowRight,
} from "lucide-react";

interface RecoveryStage {
  timeLabel: string;
  timeLabelShort?: string;
  hour: number;
  radialTitle: string;
  radialDesc: string;
  radialStatus: string;
  radialIcon: string;
  femoralTitle: string;
  femoralDesc: string;
  femoralStatus: string;
}

const recoveryStages: RecoveryStage[] = [
  {
    timeLabel: "Hour 0 (Procedure Complete)",
    hour: 0,
    radialTitle: "Soft Radial Compression Band Applied",
    radialDesc:
      "Dr. Sandhu applies a lightweight adjustable wrist compression band over the radial artery entry point. No groin sandbags or heavy pressure clamps needed.",
    radialStatus:
      "Patient sits comfortably in bed, drinks tea, and chats with family immediately.",
    radialIcon: "wrist",
    femoralTitle: "Flat Bedrest & Heavy Groin Compression",
    femoralDesc:
      "Traditional femoral artery puncture in the groin requires 4-6 hours of rigid flat bedrest with a heavy sandbag applied directly to the groin crease.",
    femoralStatus:
      "Zero leg movement permitted; patient lies flat on back in ICU.",
  },
  {
    timeLabel: "Hour 2 (Initial Post-Op)",
    timeLabelShort: "Hour 2",
    hour: 2,
    radialTitle: "Immediate Mobilization & Arm Freedom",
    radialDesc:
      "The patient can stand up, walk independently to the bathroom, and read or use their mobile phone with complete arm freedom.",
    radialStatus:
      "Immediate walking capability • 99% lower bleeding complication rate",
    radialIcon: "walk",
    femoralTitle: "Strict Bedrest & Back Discomfort",
    femoralDesc:
      "Patient must continue lying flat to prevent groin arterial hematoma or pseudoaneurysm formation.",
    femoralStatus:
      "Leg must remain completely straight; back pain common from flat position.",
  },
  {
    timeLabel: "Hour 6 (Band Depressurization)",
    timeLabelShort: "Hour 6",
    hour: 6,
    radialTitle: "Wrist Band Depressurized & Removed",
    radialDesc:
      "The air pressure in the radial band is gradually released by the nursing desk. Microscopic puncture site seals cleanly.",
    radialStatus: "Discharge-ready same-day or comfortable overnight stay.",
    radialIcon: "band",
    femoralTitle: "Initial Careful Bedrest Release",
    femoralDesc:
      "Groin sheath site checked for bleeding. Patient allowed to gently elevate head of bed under nurse supervision.",
    femoralStatus: "First tentative step out of bed with assistance.",
  },
  {
    timeLabel: "Hour 24 (Discharge & Home Return)",
    timeLabelShort: "Hour 24",
    hour: 24,
    radialTitle: "Full Home Activity & Normal Routine",
    radialDesc:
      "Patient returns home with family, taking light walks and enjoying meals. No painful groin wound to manage.",
    radialStatus:
      "Fast 24-hour discharge • Return to daily routine in 2-3 days.",
    radialIcon: "home",
    femoralTitle: "Gradual Groin Recovery",
    femoralDesc:
      "Groin soreness and bruising may persist for several days, requiring care when walking or climbing stairs.",
    femoralStatus: "Slower return to physical confidence.",
  },
];

export function TransradialRecoveryTimeline() {
  const [activeStage, setActiveStage] = useState(0);
  const panelRef = usePanelMotion(activeStage);
  const stage = recoveryStages[activeStage];
  return (
    <div className="recovery-guide">
      <span className="eyebrow-pill">AFTER ANGIOPLASTY</span>
      <h2>Recovery, step by step.</h2>
      <p className="recovery-intro">
        Explore the recovery stages for wrist and groin access. Your clinical
        team will explain your individual recovery plan.
      </p>
      <div className="recovery-stages" role="group" aria-label="Recovery stage">
        {recoveryStages.map((item, i) => (
          <button
            key={item.hour}
            aria-pressed={activeStage === i}
            onClick={() => setActiveStage(i)}
          >
            <span>Stage {i + 1}</span>
            <strong>{item.timeLabelShort || `Hour ${item.hour}`}</strong>
          </button>
        ))}
      </div>
      <div ref={panelRef} className="recovery-comparison" aria-live="polite">
        <article>
          <span className="eyebrow-pill">WRIST ACCESS</span>
          <h3>{stage.radialTitle}</h3>
          <p>{stage.radialDesc}</p>
          <p className="recovery-status">{stage.radialStatus}</p>
        </article>
        <article>
          <span className="eyebrow-pill">GROIN ACCESS</span>
          <h3>{stage.femoralTitle}</h3>
          <p>{stage.femoralDesc}</p>
          <p className="recovery-status">{stage.femoralStatus}</p>
        </article>
      </div>
      <button
        className="text-link recovery-next"
        onClick={() =>
          setActiveStage((activeStage + 1) % recoveryStages.length)
        }
      >
        Next stage <ArrowRight size={16} />
      </button>
    </div>
  );
}
