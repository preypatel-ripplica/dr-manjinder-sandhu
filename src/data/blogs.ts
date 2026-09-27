export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishDate: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  contentBlocks: {
    type: "paragraph" | "heading" | "quote" | "checklist";
    text?: string;
    items?: string[];
  }[];
  faqs?: { question: string; answer: string }[];
  tags: string[];
  sources?: { label: string; url: string }[];
}

export const blogs: BlogPost[] = [
  {
    id: "b1",
    slug: "chest-pain-when-to-worry",
    title: "Chest Pain: When Is It a Cardiac Emergency vs. Gas?",
    excerpt:
      "Learn how to differentiate between harmless acidity, muscular pain, and red-flag cardiac warning signs that require urgent emergency intervention.",
    category: "Heart Awareness",
    publishDate: "September 12, 2026",
    readTime: "5 min read",
    author: {
      name: "Dr. Manjinder Sandhu",
      role: "Senior Interventional Cardiologist",
      avatar: "/images/dr-sandhu-portrait.jpg",
    },
    tags: [
      "Chest Pain",
      "Heart Attack Symptoms",
      "Emergency Care",
      "Preventive Cardiology",
    ],
    contentBlocks: [
      {
        type: "paragraph",
        text: "Chest discomfort is one of the most common reasons patients seek urgent medical attention. However, distinguishing between gastric distress, muscular strain, and a life-threatening acute coronary syndrome can be confusing for patients and families.",
      },
      {
        type: "heading",
        text: "Key Red-Flag Symptoms of Cardiac Chest Pain",
      },
      {
        type: "checklist",
        items: [
          "Heavy, squeezing, or crushing pressure in the center or left side of the chest",
          "Pain radiating to the left jaw, neck, shoulder, or inner left arm",
          "Chest discomfort accompanied by cold sweating, dizziness, or sudden nausea",
          "Shortness of breath triggered by minimal exertion or occurring at rest",
          "Feeling of impending doom or unexplained extreme anxiety",
        ],
      },
      {
        type: "quote",
        text: "Time is muscle. In acute heart attacks, every minute delayed in seeking medical care leads to irreversible loss of cardiac muscle cells.",
      },
      {
        type: "paragraph",
        text: "Some chest symptoms are caused by reflux, muscle strain or other non-cardiac conditions. But symptom patterns overlap, so timing, severity and what the discomfort feels like cannot reliably rule out a heart emergency at home. New, worsening, persistent or unexplained chest discomfort needs urgent medical assessment.",
      },
      {
        type: "heading",
        text: "What to do now",
      },
      {
        type: "paragraph",
        text: "If chest discomfort is happening now, or comes with breathlessness, sweating, nausea, faintness, or pain spreading to the arm, back, neck or jaw, call your local emergency service or go to the nearest emergency department. Do not drive yourself. The priority is prompt assessment with an ECG and blood tests, not trying to decide at home whether it is gas or a heart problem.",
      },
      {
        type: "heading",
        text: "What happens at the hospital",
      },
      {
        type: "paragraph",
        text: "The clinical team will ask about the symptom, medical history and risk factors, then use tests such as an ECG and blood tests to look for evidence of acute coronary syndrome. Depending on the findings, care may include medicines, monitoring, and when needed, an urgent procedure to restore blood flow.",
      },
    ],
    faqs: [
      {
        question: "What should I do immediately if I suspect a heart attack?",
        answer:
          "Call your local emergency service or seek the nearest emergency department immediately. Do not drive yourself. A clinician or emergency dispatcher can advise what to do while help is on the way.",
      },
      {
        question:
          "Can heart attack symptoms be different for women or older adults?",
        answer:
          "Yes. Chest discomfort is still common, but symptoms can also include unusual fatigue, breathlessness, nausea, upper back, jaw or arm discomfort, or lightheadedness. Any new or concerning combination needs urgent assessment.",
      },
    ],
    sources: [
      {
        label: "American Heart Association: warning signs of a heart attack",
        url: "https://www.heart.org/en/health-topics/heart-attack/warning-signs-of-a-heart-attack",
      },
      {
        label: "American Heart Association: acute coronary syndrome",
        url: "https://www.heart.org/en/health-topics/heart-attack/about-heart-attacks/acute-coronary-syndrome",
      },
    ],
  },
  {
    id: "b2",
    slug: "radial-angioplasty-vs-femoral",
    title: "Why Radial (Wrist) Angioplasty Is Safer Than Femoral Access",
    excerpt:
      "Discover why wrist-access coronary stenting has become the global gold standard for patient safety, comfort, and immediate post-procedure walking.",
    category: "Treatments & Tech",
    publishDate: "August 28, 2026",
    readTime: "6 min read",
    author: {
      name: "Dr. Manjinder Sandhu",
      role: "Senior Interventional Cardiologist",
      avatar: "/images/dr-sandhu-portrait.jpg",
    },
    tags: ["Radial Angioplasty", "Stenting", "Interventional Cardiology"],
    contentBlocks: [
      {
        type: "paragraph",
        text: "For decades, interventional cardiologists performed coronary angioplasty primarily through the femoral artery in the groin. Today, radial wrist access has transformed cardiac intervention, drastically reducing complications and enhancing patient comfort.",
      },
      {
        type: "heading",
        text: "The Major Advantages of Wrist Access",
      },
      {
        type: "checklist",
        items: [
          "Near elimination of major access-site bleeding and groin hematomas",
          "No requirement for 6 to 8 hours of rigid flat bedrest",
          "Ability to sit up, eat, and walk within 1 to 2 hours post-procedure",
          "Significantly shorter hospital stay, enabling same-day discharge for many patients",
        ],
      },
      {
        type: "heading",
        text: "Why the access route matters",
      },
      {
        type: "paragraph",
        text: "The access route is the artery used to guide the catheter to the heart. For many people undergoing coronary procedures, the radial artery at the wrist is a suitable route. The femoral artery in the groin remains important when the procedure, anatomy or equipment makes it the safer choice.",
      },
      {
        type: "heading",
        text: "What the evidence says",
      },
      {
        type: "paragraph",
        text: "Guidelines from the American Heart Association and American College of Cardiology recommend radial access for many coronary interventions because it reduces access-site bleeding and vascular complications. That does not make it the right route for every person; the treating team considers pulse, artery size, prior procedures, urgency and the planned intervention.",
      },
      {
        type: "heading",
        text: "Questions to ask before your procedure",
      },
      {
        type: "checklist",
        items: [
          "Which access route is most suitable for my procedure, and why?",
          "What should I expect immediately after the procedure?",
          "Which medicines should I continue or discuss before arriving?",
          "Who should I contact if I notice bleeding, swelling or new symptoms after discharge?",
        ],
      },
    ],
    faqs: [
      {
        question: "Can all patients undergo radial wrist angioplasty?",
        answer:
          "No. Many patients are suitable, but the access route is chosen after the team considers the planned procedure, pulse and artery anatomy, medical history and safety requirements.",
      },
      {
        question: "Does wrist access mean I can go home the same day?",
        answer:
          "Some planned procedures may allow earlier mobilisation or discharge, but timing depends on the procedure performed, your condition, medicines and the clinical team’s assessment.",
      },
    ],
    sources: [
      {
        label: "2021 AHA/ACC guideline: radial and femoral approaches for PCI",
        url: "https://www.heart.org/-/media/PHD-Files-2/Science-News/2/2021/2021-Coronary-Artery-Revascularization-Guideline-Slide-Set.pdf",
      },
    ],
  },
  {
    id: "b3",
    slug: "tavr-game-changer-for-seniors",
    title: "TAVR: The Game-Changer for Elderly Aortic Valve Patients",
    excerpt:
      "How transcatheter aortic valve replacement allows seniors with severe aortic stenosis to receive a new heart valve without open-heart surgery.",
    category: "Innovations",
    publishDate: "August 15, 2026",
    readTime: "7 min read",
    author: {
      name: "Dr. Manjinder Sandhu",
      role: "Senior Interventional Cardiologist",
      avatar: "/images/dr-sandhu-portrait.jpg",
    },
    tags: ["TAVR", "TAVI", "Valve Replacement", "Senior Health"],
    contentBlocks: [
      {
        type: "paragraph",
        text: "Aortic valve stenosis affects millions of elderly adults worldwide. As the valve becomes thick and calcified, the heart works harder to pump blood, causing severe fatigue, breathlessness, and chest pain.",
      },
      {
        type: "paragraph",
        text: "TAVR offers a catheter-based alternative for selected people. A replacement valve is guided to the heart, most often through an artery in the groin, and positioned inside the narrowed valve. It avoids opening the breastbone, but it is still a major heart procedure that needs careful planning and follow-up.",
      },
      {
        type: "heading",
        text: "When a valve team considers TAVR",
      },
      {
        type: "paragraph",
        text: "Symptoms, echocardiogram findings, overall health and the anatomy of the valve and blood vessels all matter. A cardiologist, cardiac surgeon and wider valve team may review imaging and discuss whether TAVR or surgical valve replacement is the better fit for the individual.",
      },
      {
        type: "heading",
        text: "What the assessment usually includes",
      },
      {
        type: "checklist",
        items: [
          "An echocardiogram to measure the severity of aortic stenosis",
          "CT imaging to assess valve and blood-vessel anatomy",
          "A review of symptoms, other health conditions and daily activity",
          "A discussion of benefits, possible risks and the follow-up plan",
        ],
      },
      {
        type: "heading",
        text: "Recovery and follow-up",
      },
      {
        type: "paragraph",
        text: "Hospital stay and recovery vary with age, overall health and the procedure itself. Follow-up with a cardiologist remains important after either TAVR or surgery so the replacement valve and heart function can be monitored over time.",
      },
    ],
    faqs: [
      {
        question: "Is TAVR suitable for everyone with aortic stenosis?",
        answer:
          "No. The choice between TAVR and surgery is individual. A valve team considers the severity of valve disease, anatomy, age, other health conditions and the long-term treatment plan.",
      },
      {
        question: "Is TAVR the same as open-heart surgery?",
        answer:
          "No. TAVR is catheter based and typically uses an artery in the groin or another access route. It still requires specialist assessment, a hospital procedure and ongoing follow-up.",
      },
      {
        question: "What symptoms should prompt a review?",
        answer:
          "New or worsening breathlessness, chest discomfort, fainting, reduced exercise tolerance or ankle swelling should be discussed promptly with a clinician or assessed urgently when severe.",
      },
    ],
    sources: [
      {
        label:
          "American Heart Association: managing aortic stenosis and treatment options",
        url: "https://www.heart.org/en/health-topics/heart-valve-problems-and-disease/heart-valve-disease-risks-signs-and-symptoms/managing-aortic-stenosis-symptoms",
      },
    ],
  },
];
