export interface ProcedureStage {
  stageNumber: number;
  stageName: string;
  title: string;
  durationEstimate: string;
  keyPoints: string[];
  whatToExpect: string;
}

export interface ProcedureGuide {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  overview: string;
  estimatedTotalTime: string;
  hospitalStay: string;
  stages: ProcedureStage[];
}

export const procedures: ProcedureGuide[] = [
  {
    id: "p1",
    slug: "coronary-angiography-angioplasty-guide",
    title: "Coronary Angiography & Radial Angioplasty",
    subtitle: "Complete 7-Stage Patient Walkthrough Guide",
    category: "Coronary Interventions",
    overview: "A comprehensive step-by-step guide explaining every phase of your radial wrist coronary angioplasty procedure, from pre-op preparation to full home recovery.",
    estimatedTotalTime: "45–60 Minutes in Cath Lab",
    hospitalStay: "Same-Day or 24-Hour Discharge",
    stages: [
      {
        stageNumber: 1,
        stageName: "Preparation",
        title: "Initial Consultation & Pre-Op Guidelines",
        durationEstimate: "1–2 Days Prior to Procedure",
        keyPoints: [
          "Complete baseline blood work (Kidney function / Creatinine, Hemogram, Coagulation profile)",
          "Fasting for 6 hours prior to the scheduled cath lab time",
          "Review all current medications (especially blood thinners and diabetes drugs)",
          "Hydrate well the day before to support contrast dye clearance"
        ],
        whatToExpect: "Our clinical coordinator will review your medical history, verify your kidney safety parameters, and give clear instructions on which morning medications to take or hold."
      },
      {
        stageNumber: 2,
        stageName: "Evaluation",
        title: "Admission & Baseline Cardiac Check",
        durationEstimate: "1–2 Hours Before Procedure",
        keyPoints: [
          "Hospital room admission & skin preparation of the right wrist / arm",
          "Baseline 12-lead ECG and vital signs measurement",
          "Peripheral IV cannula placement in the opposite arm",
          "Final safety checklist verification with the cardiac nursing team"
        ],
        whatToExpect: "You will be escorted to the pre-procedure holding area, where an IV line will be placed and nurses will monitor your baseline blood pressure, pulse, and oxygen levels."
      },
      {
        stageNumber: 3,
        stageName: "Informed Consent",
        title: "Procedure Explanation & Counseling",
        durationEstimate: "15–20 Minutes",
        keyPoints: [
          "Detailed explanation of wrist entry, contrast injection, and stent options by Dr. Sandhu",
          "Discussion of diagnostic findings expected and potential stent placement",
          "Opportunity to ask any questions with family members present",
          "Signing of formal medical informed consent form"
        ],
        whatToExpect: "Dr. Manjinder Sandhu will personally meet with you to review your angiogram plan, explain the radial access approach, and ensure you feel completely comfortable and informed."
      },
      {
        stageNumber: 4,
        stageName: "Pre-Procedure",
        title: "Cath Lab Transfer & Sterile Prep",
        durationEstimate: "15 Minutes",
        keyPoints: [
          "Transfer on comfortable bed to state-of-the-art Dual-Plane Cath Lab",
          "Sterile draping over body and application of local numbing spray/injection at wrist",
          "Relaxing mild sedative administered via IV if desired",
          "Continuous ECG and blood pressure monitoring connected"
        ],
        whatToExpect: "The Cath Lab environment is clean, bright, and highly specialized. You will lie on a cushioned table with overhead x-ray cameras. You remain awake and comfortable."
      },
      {
        stageNumber: 5,
        stageName: "During Procedure",
        title: "Catheter Navigation, IVUS Imaging & Stenting",
        durationEstimate: "30–45 Minutes",
        keyPoints: [
          "Painless insertion of micro-catheter into radial wrist artery",
          "Injection of contrast dye to map heart blockages on high-def screens",
          "IVUS / OCT intravascular ultrasound scan to measure exact artery size",
          "Inflation of tiny balloon & deployment of drug-eluting stent to restore full blood flow"
        ],
        whatToExpect: "You may feel a mild warm sensation when contrast dye is injected, or slight pressure in the chest for 5-10 seconds when the balloon expands. Dr. Sandhu talks you through each step."
      },
      {
        stageNumber: 6,
        stageName: "Recovery",
        title: "Radial Band Compression & Immediate Mobilization",
        durationEstimate: "2–4 Hours Post-Procedure",
        keyPoints: [
          "Immediate removal of catheter sheath & application of TR-Band wrist compression",
          "Freedom to sit up, eat light meal, and walk within 1-2 hours",
          "Gradual deflation of wrist compression band over 3-4 hours by specialized nurse",
          "Post-procedure ECG and blood pressure check"
        ],
        whatToExpect: "Unlike groin entry procedures, you do NOT need to lie flat on your back for hours. You can sit comfortably in bed, read, or use your phone while your wrist band slowly depressurizes."
      },
      {
        stageNumber: 7,
        stageName: "Follow-Up",
        title: "Discharge Counseling & Long-Term Plan",
        durationEstimate: "Within 24 Hours & 7 Days Post-Discharge",
        keyPoints: [
          "Detailed written discharge summary with stent serial numbers & prescription",
          "Clear guidance on antiplatelet medication adherence (blood thinners)",
          "First follow-up consultation in clinic after 7 days",
          "24/7 helpline access for any post-discharge queries"
        ],
        whatToExpect: "You will be discharged home with clear instructions, prescribed medications, and direct clinic contact info. Most patients return to light work within 2-3 days."
      }
    ]
  },
  {
    id: "p2",
    slug: "tavr-tavi-procedure-guide",
    title: "TAVR / TAVI Heart Valve Replacement",
    subtitle: "7-Stage Patient Education & Recovery Roadmap",
    category: "Structural Heart",
    overview: "Step-by-step patient journey for Transcatheter Aortic Valve Replacement (TAVR), detailing pre-procedure CT planning, catheter deployment, and post-TAVR rehab.",
    estimatedTotalTime: "60–90 Minutes Procedure Time",
    hospitalStay: "2–3 Days Hospital Stay",
    stages: [
      {
        stageNumber: 1,
        stageName: "Preparation",
        title: "Multi-Disciplinary Heart Team Evaluation",
        durationEstimate: "1–2 Weeks Prior",
        keyPoints: [
          "TAVR-protocol multi-detector CT Angiogram to measure aortic annulus",
          "Dental evaluation to eliminate oral infection sources",
          "Coronary angiography check to treat any vessel blockages first",
          "Frailty & functional status assessment by senior heart team"
        ],
        whatToExpect: "Comprehensive outpatient workup ensuring complete anatomical and physiological readiness for keyhole valve replacement."
      },
      {
        stageNumber: 2,
        stageName: "Evaluation",
        title: "Pre-Admission & Anesthesia Clearance",
        durationEstimate: "Day Before Procedure",
        keyPoints: [
          "Hospital admission to dedicated cardiac telemetry floor",
          "Cardiac Echo re-verification of valve pressure gradient",
          "Anesthetic consultation for conscious sedation planning",
          "Blood cross-matching and laboratory clearance"
        ],
        whatToExpect: "Settle into your hospital room while the clinical team reviews your CT scans and verifies all safety parameters."
      },
      {
        stageNumber: 3,
        stageName: "Informed Consent",
        title: "Procedure Blueprint & Family Discussion",
        durationEstimate: "30 Minutes",
        keyPoints: [
          "Detailed explanation of femoral delivery route & valve type selection",
          "Discussion of expected valve function recovery & risks",
          "Informed consent signing with patient and primary caregiver"
        ],
        whatToExpect: "Dr. Sandhu meets with the patient and family to explain the exact steps of catheter valve deployment."
      },
      {
        stageNumber: 4,
        stageName: "Pre-Procedure",
        title: "Hybrid Cath Operating Room Setup",
        durationEstimate: "30 Minutes",
        keyPoints: [
          "Transfer to Hybrid OR Cath Suite equipped with advanced 3D imaging",
          "Conscious sedation or light general anesthesia administration",
          "Continuous arterial line and hemodynamics monitoring setup"
        ],
        whatToExpect: "You will be made completely comfortable and pain-free under expert cardiac anesthesia supervision."
      },
      {
        stageNumber: 5,
        stageName: "During Procedure",
        title: "Catheter Navigation & New Valve Deployment",
        durationEstimate: "60 Minutes",
        keyPoints: [
          "Small puncture in groin femoral artery (no surgical chest incision)",
          "Guidewire navigation across calcified aortic valve",
          "Deployment of self-expanding or balloon-expandable TAVR valve inside native valve",
          "Instant echocardiography & angiography confirming zero valve leak"
        ],
        whatToExpect: "The new valve begins functioning instantly, replacing the damaged native valve without opening the chest cavity."
      },
      {
        stageNumber: 6,
        stageName: "Recovery",
        title: "Cardiac ICU Telemetry & Early Walking",
        durationEstimate: "24–48 Hours",
        keyPoints: [
          "Overnight monitoring in Cardiac ICU",
          "Removal of femoral access sheath with vascular closure device",
          "Gentle out-of-bed walking on Day 1 post-TAVR",
          "Rapid resolution of shortness of breath"
        ],
        whatToExpect: "Patients immediately notice improved breathing capacity. Most walk independently around the ward by Day 2."
      },
      {
        stageNumber: 7,
        stageName: "Follow-Up",
        title: "Hospital Discharge & Echo Verification",
        durationEstimate: "Day 3 & 30-Day Follow-Up",
        keyPoints: [
          "Discharge home with comprehensive cardiac rehab instructions",
          "Discharge Echocardiogram confirming excellent valve gradients",
          "Clinic follow-up visit at 1 week, 30 days, and 6 months"
        ],
        whatToExpect: "Enjoy a dramatic restoration of vitality, mobility, and independence with long-term TAVR follow-up care."
      }
    ]
  }
];
