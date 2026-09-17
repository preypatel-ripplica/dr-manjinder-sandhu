export interface CaseStudy {
  id: string;
  slug: string;
  patientAgeGender: string;
  condition: string;
  procedurePerformed: string;
  summary: string;
  keyChallenge: string;
  outcome: string;
  testimonialSnippet: string;
}

export const caseStudies: CaseStudy[] = [
  {
    id: "cs1",
    slug: "complex-calcified-cto-stenting-72yo",
    patientAgeGender: "72-Year-Old Male",
    condition: "Chronic Total Occlusion (100% blockage) with heavy arterial calcification",
    procedurePerformed: "Rotational Atherectomy (Rotablator) & Radial Angioplasty with IVUS",
    summary: "Patient presented with severe disabling exertional angina (CCS Class III). Angiogram revealed a 100% calcified blockage in the right coronary artery, previously advised open bypass surgery.",
    keyChallenge: "Extremely hard calcified tissue preventing standard angioplasty wire and balloon passage.",
    outcome: "Dr. Sandhu used high-speed Rotablator atherectomy to drill through calcified plaque, followed by IVUS-guided drug-eluting stent deployment. Complete 100% vessel recanalization achieved via wrist access.",
    testimonialSnippet: "I was terrified of open-heart surgery at my age. Dr. Sandhu opened my blocked artery through my wrist without a single stitch. I was walking the very next morning!"
  },
  {
    id: "cs2",
    slug: "tavr-successful-replacement-81yo",
    patientAgeGender: "81-Year-Old Female",
    condition: "Critical Aortic Valve Stenosis with severe shortness of breath at rest",
    procedurePerformed: "Transcatheter Aortic Valve Replacement (TAVR / TAVI)",
    summary: "Patient suffered severe breathlessness and recurrent heart failure admissions due to a tight, calcified aortic valve. High surgical risk due to advanced age and renal insufficiency.",
    keyChallenge: "High surgical risk for sternotomy open-heart surgery.",
    outcome: "Successful keyhole TAVR procedure under conscious sedation. New aortic valve deployed smoothly via femoral catheter in 55 minutes. Discharged home on Day 3 with normal valve gradients.",
    testimonialSnippet: "Dr. Sandhu gave my mother a second lease on life. Her breathing restored instantly post-TAVR!"
  }
];
