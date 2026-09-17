export interface ConsultationPlan {
  id: string;
  title: string;
  badge: string;
  price: string;
  validity: string;
  description: string;
  features: string[];
  ctaLabel: string;
  isFeatured?: boolean;
}

export const consultationPlans: ConsultationPlan[] = [
  {
    id: "plan-first",
    title: "First In-Person Consultation",
    badge: "Most Popular",
    price: "₹1,800",
    validity: "Includes 15-Day Free Follow-up",
    description: "Comprehensive initial cardiology evaluation, physical examination, ECG review, and clinical treatment plan.",
    features: [
      "Detailed 20-30 min clinical consultation with Dr. Manjinder Sandhu",
      "Analysis of prior cardiac reports, ECGs, & Echocardiograms",
      "In-clinic physical exam & cardiovascular risk stratification",
      "Personalized prescription & diagnostic test guidance",
      "15-Day complimentary follow-up review"
    ],
    ctaLabel: "Book First Consultation",
    isFeatured: true
  },
  {
    id: "plan-revisit",
    title: "Follow-Up Revisit",
    badge: "Within 15 Days",
    price: "Complimentary",
    validity: "Valid for 15 days post initial visit",
    description: "Review of newly ordered laboratory reports, diagnostic Echo/TMT scans, or medication response adjustments.",
    features: [
      "Review of fresh diagnostic test results",
      "Medication dosage tuning & prescription update",
      "Symptom progress monitoring",
      "Direct Q&A with clinical team"
    ],
    ctaLabel: "Schedule Free Revisit"
  },
  {
    id: "plan-second-opinion",
    title: "Angioplasty / TAVR Second Opinion",
    badge: "Expert Review",
    price: "₹1,800",
    validity: "Comprehensive Report Review",
    description: "Unbiased expert opinion on recommended angioplasty, bypass surgery (CABG), or TAVR valve procedures.",
    features: [
      "Detailed review of CD Angiogram disk & Cath Lab footage",
      "Independent assessment of necessity for stenting vs. CABG",
      "Evaluation of radial wrist-access feasibility",
      "Clear written second opinion statement"
    ],
    ctaLabel: "Request Second Opinion"
  }
];
