export type TreatmentCategory = "Preventive" | "General" | "Non-Invasive" | "Invasive";

export interface Treatment {
  id: string;
  slug: string;
  title: string;
  category: TreatmentCategory;
  tagline: string;
  shortDescription: string;
  fullOverview: string;
  whoNeedsIt: string[];
  procedureSummary: string;
  recoveryTimeline: string;
  benefits: string[];
  faqs: { question: string; answer: string }[];
  isPopular?: boolean;
}

export const treatments: Treatment[] = [
  {
    id: "t1",
    slug: "radial-angiography-angioplasty",
    title: "Radial Angioplasty & Stenting",
    category: "Invasive",
    tagline: "Minimally invasive arterial clearance via wrist access",
    shortDescription: "Precision stent placement via the radial artery in the wrist, enabling faster recovery, minimal bleeding risk, and immediate post-procedure mobilization.",
    fullOverview: "Radial Angioplasty is the gold standard for restoring blood flow to blocked coronary arteries. Unlike traditional femoral access through the groin, Dr. Manjinder Sandhu accesses the heart via the radial artery in the wrist. Utilizing advanced intravascular imaging (IVUS / OCT) and Fractional Flow Reserve (FFR), blocked arteries are dilated with microscopic balloons and sealed with drug-eluting stents.",
    whoNeedsIt: [
      "Patients with severe chest pain (angina) resistant to medication",
      "Individuals experiencing acute myocardial infarction (heart attack)",
      "Patients with multi-vessel coronary artery blockages detected on angiography",
      "High-risk cardiac patients seeking wrist-access procedure with quick discharge"
    ],
    procedureSummary: "Performed under local anesthesia in an advanced catheterization lab. A micro-catheter is guided through the wrist artery to the heart. Blockages are visualized under fluoroscopy, measured with FFR/IVUS, pre-dilated, and precision-paved with state-of-the-art drug-eluting stents.",
    recoveryTimeline: "Patients can sit up and walk within 1-2 hours after wrist band compression. Most patients are discharged home within 24 hours.",
    benefits: [
      "99% lower bleeding complications compared to groin entry",
      "No mandatory 8-hour flat bedrest requirement",
      "Same-day or 24-hour hospital discharge",
      "Painless wrist puncture under localized numbing"
    ],
    faqs: [
      {
        question: "Is Radial Angioplasty safer than femoral angioplasty?",
        answer: "Yes. Clinical trial data shows wrist-access radial angioplasty significantly reduces access-site bleeding, vascular complications, and hospital stay length."
      },
      {
        question: "How long does a coronary stent last?",
        answer: "Modern drug-eluting stents are designed to remain permanently in the artery. Combined with prescribed antiplatelet medication and lifestyle control, restenosis rates are extremely low (<3%)."
      }
    ],
    isPopular: true
  },
  {
    id: "t2",
    slug: "tavr-tavi",
    title: "TAVR / TAVI (Transcatheter Aortic Valve Replacement)",
    category: "Invasive",
    tagline: "Surgical-free aortic valve replacement without open-heart surgery",
    shortDescription: "A revolutionary catheter-based procedure replacing diseased, calcified aortic valves without open-heart surgery or chest incision.",
    fullOverview: "Transcatheter Aortic Valve Replacement (TAVR), also known as TAVI, is a cutting-edge technique for treating severe aortic stenosis. Dr. Sandhu guides a collapsible replacement valve into the diseased heart valve through a small catheter inserted into the femoral artery, deploying a new functioning valve over the damaged one.",
    whoNeedsIt: [
      "Seniors and adults with severe calcified aortic valve stenosis",
      "Patients deemed moderate, high, or prohibitive risk for open-heart surgery",
      "Individuals experiencing severe shortness of breath, dizziness, or chest tightness",
      "Patients seeking rapid recovery without sternotomy incisions"
    ],
    procedureSummary: "Conducted under conscious sedation or light anesthesia. A balloon-expandable or self-expanding prosthetic valve is navigated via catheter to the heart and deployed inside the native aortic valve.",
    recoveryTimeline: "Immediate improvement in blood flow. ICU monitoring for 24 hours, hospital stay typically 2 to 3 days, full activity resumed within 1-2 weeks.",
    benefits: [
      "No open-heart surgical incision or cardiopulmonary bypass machine",
      "Dramatically reduced recovery time (days vs. months)",
      "Immediate relief from breathlessness and fatigue",
      "Profound improvement in quality of life for elderly patients"
    ],
    faqs: [
      {
        question: "Am I candidate for TAVR instead of open surgery?",
        answer: "Dr. Sandhu evaluates each patient using multi-detector CT angiography and echocardiogram to determine valve dimensions, anatomical suitability, and safety profile."
      }
    ],
    isPopular: true
  },
  {
    id: "t3",
    slug: "pacemaker-implants",
    title: "Pacemaker & ICD Implantation",
    category: "Invasive",
    tagline: "Advanced cardiac rhythm management and sudden arrest protection",
    shortDescription: "Implantation of single, dual, or leadless pacemakers and implantable cardioverter-defibrillators (ICD) to correct dangerously slow or erratic heartbeats.",
    fullOverview: "Cardiac Pacemakers and ICDs are miniature electronic devices implanted just beneath the collarbone to monitor and regulate heart rhythm. For patients with sick sinus syndrome, complete heart block, or dangerous ventricular arrhythmias, Dr. Sandhu implants precision pacing devices that prevent faintness, heart failure, and sudden cardiac death.",
    whoNeedsIt: [
      "Patients with abnormally slow heart rate (bradycardia < 40 bpm)",
      "Individuals experiencing unexplained blackouts or fainting (syncope)",
      "Patients diagnosed with complete heart block or sinus node dysfunction",
      "Heart failure patients at risk of sudden cardiac arrest (requiring ICD)"
    ],
    procedureSummary: "Painless procedure under local anesthesia. Micro-leads are guided through a shoulder vein into the heart chambers and connected to a compact pulse generator housed under the skin.",
    recoveryTimeline: "Overnight observation in hospital. Resume routine light activities in 3-5 days. Arm movement restricted for 2 weeks to allow lead fixation.",
    benefits: [
      "Prevents life-threatening heart rate drops and sudden syncopal episodes",
      "Restores natural energy levels and stamina",
      "Advanced remote monitoring features for doctor peace of mind"
    ],
    faqs: [
      {
        question: "How long does a pacemaker battery last?",
        answer: "Modern pacemakers feature lithium batteries lasting between 8 to 14 years depending on device usage and programmed settings."
      }
    ],
    isPopular: true
  },
  {
    id: "t4",
    slug: "risk-factor-assessment-counselling",
    title: "Preventive Cardiac Risk Assessment",
    category: "Preventive",
    tagline: "Comprehensive cardiovascular screening and personalized preventive plans",
    shortDescription: "Early detection of silent coronary plaque, arterial stiffness, lipid disorders, and metabolic risk factors before heart attacks occur.",
    fullOverview: "Preventive Cardiology focuses on identifying cardiovascular risk factors early. Dr. Sandhu combines advanced lipid subclass profiling, High-Sensitivity C-Reactive Protein (hs-CRP), CT Coronary Calcium Scoring, and metabolic evaluation to create personalized heart disease prevention roadmaps.",
    whoNeedsIt: [
      "Individuals with a family history of premature heart attacks or strokes",
      "People managing high blood pressure, diabetes, or elevated cholesterol",
      "Executives, athletes, and adults aged 30+ seeking comprehensive heart checkups",
      "Smokers or individuals undergoing high chronic stress"
    ],
    procedureSummary: "Includes comprehensive blood panels, resting ECG, Echocardiogram, Exercise TMT / Stress Echo, CT Calcium Score review, and extended consult with Dr. Sandhu.",
    recoveryTimeline: "Immediate diagnostic report analysis with actionable preventive prescription.",
    benefits: [
      "Prevents 80%+ of avoidable heart attacks through early intervention",
      "Tailored lifestyle, dietary, and pharmacological preventive guidance",
      "Clear quantitative coronary calcium scoring"
    ],
    faqs: [
      {
        question: "Why is preventive screening essential if I feel completely healthy?",
        answer: "Coronary artery disease often remains completely silent until a major artery is 70%+ blocked. Early screening catches plaque buildup decades in advance."
      }
    ],
    isPopular: true
  },
  {
    id: "t5",
    slug: "echocardiography-doppler",
    title: "2D & 3D Echocardiography",
    category: "Non-Invasive",
    tagline: "High-resolution ultrasound imaging of heart valves & chamber pumping",
    shortDescription: "Non-invasive cardiac ultrasound evaluating ejection fraction, valve motion, heart wall movement, and congenital structural anomalies.",
    fullOverview: "Echocardiography uses sound waves to generate live high-definition moving pictures of the heart. Dr. Sandhu utilizes 2D/3D Color Doppler Echocardiography to evaluate heart muscle contractility, pump strength (Ejection Fraction), valve narrowings or leakages, and pericardial fluid.",
    whoNeedsIt: [
      "Patients with unexplained breathlessness, swollen ankles, or fatigue",
      "Individuals with heart murmurs detected during physical examination",
      "Patients with long-standing hypertension or suspected valve disease",
      "Routine follow-up for patients post-angioplasty or valve surgery"
    ],
    procedureSummary: "Pain-free 20-minute scan performed by applying an ultrasound transducer over the chest wall.",
    recoveryTimeline: "No downtime. Instant diagnostic report generation.",
    benefits: [
      "100% non-invasive with zero radiation exposure",
      "Accurate measurement of cardiac pumping fraction (EF %)",
      "Clear visualization of all four heart valves in real time"
    ],
    faqs: [
      {
        question: "Is there any special preparation required for Echocardiography?",
        answer: "No special preparation is needed. You can eat, drink, and take your regular medications normally prior to the test."
      }
    ]
  },
  {
    id: "t6",
    slug: "heart-failure-management",
    title: "Heart Failure Management & CRT",
    category: "General",
    tagline: "Comprehensive medical optimization and biventricular pacing",
    shortDescription: "Specialized clinical therapy for weak heart pumping (low EF), including guideline-directed medical therapy and Cardiac Resynchronization Therapy (CRT).",
    fullOverview: "Heart failure occurs when the heart muscle cannot pump blood efficiently to meet the body's needs. Dr. Manjinder Sandhu provides end-to-end heart failure care, integrating modern ARNI/SGLT2 inhibitor medications, outpatient fluid monitoring, and specialized Cardiac Resynchronization Therapy (CRT-D / CRT-P) pacemakers.",
    whoNeedsIt: [
      "Patients with low Ejection Fraction (EF < 35%) and chronic fatigue",
      "Individuals suffering from severe shortness of breath when lying flat",
      "Patients with frequent hospital re-admissions due to fluid retention",
      "Patients with dyssynchronous ventricular contraction needing CRT"
    ],
    procedureSummary: "Combination of tailored medical therapy titration, dietary sodium management, and advanced resynchronization pacing device implantation when indicated.",
    recoveryTimeline: "Significant functional improvement and reduction in breathlessness within weeks of optimized therapy.",
    benefits: [
      "Reduces hospital readmission rates by over 60%",
      "Restores ability to walk, climb stairs, and sleep comfortably",
      "Improves long-term survival and quality of life"
    ],
    faqs: [
      {
        question: "Can weak heart pumping (low EF) improve?",
        answer: "Yes! With modern guideline-directed medical therapy (GDMT) and advanced pacing, many heart failure patients experience significant ejection fraction recovery."
      }
    ]
  },
  {
    id: "t7",
    slug: "complex-angioplasty-cto",
    title: "Complex CTO & Calcified Angioplasty",
    category: "Invasive",
    tagline: "Advanced rotablisation & intravascular lithotripsy for total blockages",
    shortDescription: "Specialized opening of 100% chronic total occlusions (CTO) and heavily calcified coronary blockages using Rotablator and Intravascular Lithotripsy (IVL).",
    fullOverview: "For patients previously told their blockages are too severe, calcified, or total to stent, Dr. Sandhu offers advanced interventional techniques including Rotational Atherectomy (Rotablator) to drill through hard calcium and Intravascular Lithotripsy (IVL sonic shockwaves) to crack deep arterial calcium safely.",
    whoNeedsIt: [
      "Patients with Chronic Total Occlusion (CTO) blockages older than 3 months",
      "Patients with rock-hard calcified coronary arteries",
      "Patients deemed high-risk for bypass surgery (CABG)",
      "Individuals with recurrent angina after previous stent procedures"
    ],
    procedureSummary: "Radial catheter access utilizing specialized micro-wires, diamond-tipped high-speed rotators, or acoustic lithotripsy balloons under IVUS imaging.",
    recoveryTimeline: "24-48 hours hospital monitoring with rapid return to daily living.",
    benefits: [
      "Avoids open bypass surgery for complex multi-vessel disease",
      "High success rate in opening long-standing 100% blockages",
      "Precision stent expansion backed by IVUS / OCT guidance"
    ],
    faqs: [
      {
        question: "What is Intravascular Lithotripsy (IVL)?",
        answer: "IVL uses sound waves (similar to kidney stone treatment) to safely shatter severe calcium deposits in heart arteries before stent placement."
      }
    ]
  },
  {
    id: "t8",
    slug: "evar-tevar-aortic-repair",
    title: "EVAR & TEVAR Aortic Repair",
    category: "Invasive",
    tagline: "Endovascular stent grafting for abdominal and thoracic aortic aneurysms",
    shortDescription: "Keyhole endovascular repair of life-threatening aortic aneurysms and dissections without open abdominal or chest surgery.",
    fullOverview: "Endovascular Aortic Repair (EVAR) and Thoracic EVAR (TEVAR) treat dangerous bulges (aneurysms) or tears in the aorta. Dr. Sandhu places a custom fabric-covered stent graft inside the aorta via femoral catheters, sealing off the aneurysm and preventing catastrophic rupture.",
    whoNeedsIt: [
      "Patients diagnosed with abdominal aortic aneurysm (AAA > 5.5cm)",
      "Patients with thoracic aortic aneurysms or type-B aortic dissections",
      "High-risk surgical candidates needing keyhole vascular repair"
    ],
    procedureSummary: "Catheter-guided placement of a modular covered stent graft inside the dilated aorta under continuous fluoroscopic roadmap guidance.",
    recoveryTimeline: "2-3 days hospital stay with minimal wound care.",
    benefits: [
      "Prevents fatal aortic aneurysm rupture",
      "No large abdominal or thoracic open incision",
      "Lower perioperative mortality compared to open repair"
    ],
    faqs: [
      {
        question: "How are aortic aneurysms detected?",
        answer: "Aortic aneurysms are usually diagnosed via abdominal ultrasound, CT Angiogram, or MRI."
      }
    ]
  }
];
