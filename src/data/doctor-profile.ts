export interface DoctorProfile {
  name: string;
  title: string;
  affiliation: string;
  experienceYears: number;
  patientsTreated: string;
  proceduresDone: string;
  cathLabAccess: string;
  bioShort: string;
  bioFull: string;
  qualifications: string[];
  specialties: string[];
  careerTimeline: {
    period: string;
    role: string;
    institution: string;
    highlights: string;
  }[];
  coreValues: {
    title: string;
    description: string;
    icon: string;
  }[];
}

export const doctorProfile: DoctorProfile = {
  name: "Dr. Manjinder Sandhu",
  title: "Senior Interventional Cardiologist & Principal Director – Cardiology",
  affiliation: "Atrius Cardiac Care & Fortis Healthcare",
  experienceYears: 33,
  patientsTreated: "70,000+",
  proceduresDone: "25,000+",
  cathLabAccess: "Advanced 24/7 Dual-Plane Cath Lab",
  bioShort: "Principal Director – Cardiology at Atrius Cardiac Care with 33+ years of distinguished clinical expertise in complex coronary angioplasty, TAVR/TAVI, radial interventions, and structural heart procedures.",
  bioFull: "Dr. Manjinder Sandhu is a world-renowned Senior Interventional Cardiologist with over 33 years of experience pioneering advanced cardiovascular therapies in India. As Principal Director – Cardiology at Atrius Cardiac Care and Fortis Hospitals, Dr. Sandhu has successfully performed over 25,000 interventional cardiac procedures, specializing in Transcatheter Aortic Valve Replacement (TAVR), Complex Radial Coronary Angioplasty, Pacemaker Implants, and Endovascular Aortic Repair (EVAR).\n\nAn alumnus of AFMC Pune and PGIMER Chandigarh, Dr. Sandhu served with distinction in the Indian Armed Forces Medical Services before transitioning to lead cardiac departments at top premier super-specialty hospitals.",
  qualifications: [
    "MBBS — Armed Forces Medical College (AFMC), Pune",
    "MD (General Medicine) — Armed Forces Medical College (AFMC), Pune",
    "DNB (General Medicine) — National Board of Examinations, New Delhi",
    "DM (Cardiology) — Post Graduate Institute of Medical Education and Research (PGIMER), Chandigarh",
    "Fellow of the American College of Cardiology (FACC)",
    "Fellow of the Society for Cardiovascular Angiography & Interventions (FSCAI)"
  ],
  specialties: [
    "Complex Coronary Angioplasty & Stenting (Radial Route)",
    "Transcatheter Aortic Valve Replacement (TAVR / TAVI)",
    "Single & Dual Chamber Pacemaker & ICD Implants",
    "CRT-D / CRT-P Cardiac Resynchronization Therapy",
    "Endovascular Aortic Repair (EVAR / TEVAR)",
    "Congenital Heart Defect Closures (ASD, VSD, PDA)"
  ],
  careerTimeline: [
    {
      period: "2023 – Present",
      role: "Principal Director – Cardiology",
      institution: "Atrius Cardiac Care & Fortis Hospitals (Gurugram / Manesar / Delhi)",
      highlights: "Co-founded Atrius Cardiac Care to deliver boutique, patient-centric tertiary cardiac care across 4 premier hospital centers."
    },
    {
      period: "2013 – 2023",
      role: "Director & Head of Department – Cardiology",
      institution: "Fortis Memorial Research Institute (FMRI), Gurugram",
      highlights: "Pioneered transradial coronary interventions and established one of North India's highest-volume TAVR programs."
    },
    {
      period: "2007 – 2013",
      role: "Senior Consultant & Head of Cardiology",
      institution: "Artemis Health Institute & Max Healthcare",
      highlights: "Built state-of-the-art cath labs and spearheaded round-the-clock primary PCI acute heart attack response protocols."
    },
    {
      period: "1990 – 2007",
      role: "Senior Specialist & Officer Commanding",
      institution: "Armed Forces Medical Services (AFMC & Military Hospitals)",
      highlights: "Served as Senior Consultant Cardiologist delivering specialized care to armed forces personnel and veterans."
    }
  ],
  coreValues: [
    {
      title: "Ethical Clinical Decision-Making",
      description: "Recommending interventions only when evidence-based clinical benefit is clear, prioritizing conservative management whenever safe.",
      icon: "ShieldCheck"
    },
    {
      title: "Empathetic Patient-Centric Care",
      description: "Taking time to explain diagnoses, procedure choices, and recovery expectations transparently with patients and families.",
      icon: "Heart"
    },
    {
      title: "Modern Technological Precision",
      description: "Utilizing advanced IVUS, OCT, FFR, and dual-plane imaging to ensure optimal stent placement and durable clinical outcomes.",
      icon: "Activity"
    }
  ]
};
