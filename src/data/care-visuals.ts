export const careVisuals: Record<
  string,
  {
    image: string;
    alt: string;
    title: string;
    summary: string;
    focus: string;
    approach: string;
  }
> = {
  "radial-angiography-angioplasty": {
    image: "/images/radial-angioplasty-and-tenting.png",
    alt: "Radial angioplasty and stenting treatment",
    title: "Blocked arteries",
    summary:
      "Opening narrowed heart arteries through an approach at the wrist.",
    focus: "Heart arteries",
    approach: "Wrist-access procedure",
  },
  "tavr-tavi": {
    image: "/images/tavr-tavi.png",
    alt: "TAVR and TAVI treatment",
    title: "Heart valve care",
    summary: "A catheter-based option for replacing a narrowed aortic valve.",
    focus: "Aortic valve",
    approach: "Catheter-based treatment",
  },
  "pacemaker-implants": {
    image: "/images/pacemaker-and-icd-implant.png",
    alt: "Pacemaker and ICD implantation treatment",
    title: "Heart rhythm",
    summary: "Implanted devices that help manage slow or irregular heartbeats.",
    focus: "Heart rhythm",
    approach: "Implanted rhythm device",
  },
  "risk-factor-assessment-counselling": {
    image: "/images/preventive-cardiac-risk-assessment.png",
    alt: "Preventive cardiac risk assessment",
    title: "Prevention & screening",
    summary:
      "Understand your risk factors and build a personal heart-health plan.",
    focus: "Future heart health",
    approach: "Assessment & counselling",
  },
  "echocardiography-doppler": {
    image: "/images/2d-3d-echocardiography.png",
    alt: "2D and 3D echocardiography",
    title: "Heart investigations",
    summary:
      "Ultrasound imaging to understand how your heart pumps and its valves work.",
    focus: "Heart function & valves",
    approach: "Non-invasive ultrasound",
  },
  "heart-failure-management": {
    image: "/images/heart-failure-management-and-crt.png",
    alt: "Heart failure management and CRT",
    title: "Ongoing heart care",
    summary:
      "Personalised treatment and follow-up for a weakened heart muscle.",
    focus: "Heart pumping function",
    approach: "Ongoing specialist care",
  },
  "complex-angioplasty-cto": {
    image: "/images/complex-cto-calcified-angioplasty.png",
    alt: "Complex CTO and calcified angioplasty treatment",
    title: "Complex artery blockages",
    summary:
      "Specialist treatment options for difficult or heavily calcified blockages.",
    focus: "Complex artery disease",
    approach: "Specialist catheter procedure",
  },
  "evar-tevar-aortic-repair": {
    image: "/images/heart-consultation.jpg",
    alt: "Cardiovascular assessment",
    title: "Aortic repair",
    summary:
      "Catheter-based repair for selected conditions of the main artery.",
    focus: "The aorta",
    approach: "Endovascular repair",
  },
};
export const blogVisuals: Record<
  string,
  { image: string; alt: string; caption: string }
> = {
  "chest-pain-when-to-worry": {
    image: "/images/heart-consultation.jpg",
    alt: "Blood pressure being checked during a heart-health assessment",
    caption:
      "Understanding symptoms is part of a conversation about your heart health.",
  },
  "radial-angioplasty-vs-femoral": {
    image: "/images/clinical-care.jpg",
    alt: "A clinician reviewing information",
    caption:
      "Discuss the procedure and your individual recovery plan with your cardiologist.",
  },
  "tavr-game-changer-for-seniors": {
    image: "/images/patient-care.jpg",
    alt: "An older couple sharing a moment at home",
    caption:
      "Treatment conversations include the patient, their health and their everyday life.",
  },
};
