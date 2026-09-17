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
}

export const blogs: BlogPost[] = [
  {
    id: "b1",
    slug: "chest-pain-when-to-worry",
    title: "Chest Pain: When Is It a Cardiac Emergency vs. Gas?",
    excerpt: "Learn how to differentiate between harmless acidity, muscular pain, and red-flag cardiac warning signs that require urgent emergency intervention.",
    category: "Heart Awareness",
    publishDate: "September 12, 2026",
    readTime: "5 min read",
    author: {
      name: "Dr. Manjinder Sandhu",
      role: "Senior Interventional Cardiologist",
      avatar: "/images/dr-sandhu-portrait.jpg"
    },
    tags: ["Chest Pain", "Heart Attack Symptoms", "Emergency Care", "Preventive Cardiology"],
    contentBlocks: [
      {
        type: "paragraph",
        text: "Chest discomfort is one of the most common reasons patients seek urgent medical attention. However, distinguishing between gastric distress, muscular strain, and a life-threatening acute coronary syndrome can be confusing for patients and families."
      },
      {
        type: "heading",
        text: "Key Red-Flag Symptoms of Cardiac Chest Pain"
      },
      {
        type: "checklist",
        items: [
          "Heavy, squeezing, or crushing pressure in the center or left side of the chest",
          "Pain radiating to the left jaw, neck, shoulder, or inner left arm",
          "Chest discomfort accompanied by cold sweating, dizziness, or sudden nausea",
          "Shortness of breath triggered by minimal exertion or occurring at rest",
          "Feeling of impending doom or unexplained extreme anxiety"
        ]
      },
      {
        type: "quote",
        text: "Time is muscle. In acute heart attacks, every minute delayed in seeking medical care leads to irreversible loss of cardiac muscle cells."
      },
      {
        type: "paragraph",
        text: "Unlike heartburn or acid reflux, which typically worsens when lying flat or after heavy spicy meals and responds to antacids, cardiac pain is often triggered by physical exertion or stress and is accompanied by systemic signs like profuse cold sweating."
      }
    ],
    faqs: [
      {
        question: "What should I do immediately if I suspect a heart attack?",
        answer: "Call emergency medical services or proceed immediately to the nearest 24/7 chest pain center. Chew a 300mg soluble Aspirin tablet if available and not allergic, and avoid driving yourself."
      }
    ]
  },
  {
    id: "b2",
    slug: "radial-angioplasty-vs-femoral",
    title: "Why Radial (Wrist) Angioplasty Is Safer Than Femoral Access",
    excerpt: "Discover why wrist-access coronary stenting has become the global gold standard for patient safety, comfort, and immediate post-procedure walking.",
    category: "Treatments & Tech",
    publishDate: "August 28, 2026",
    readTime: "6 min read",
    author: {
      name: "Dr. Manjinder Sandhu",
      role: "Senior Interventional Cardiologist",
      avatar: "/images/dr-sandhu-portrait.jpg"
    },
    tags: ["Radial Angioplasty", "Stenting", "Interventional Cardiology"],
    contentBlocks: [
      {
        type: "paragraph",
        text: "For decades, interventional cardiologists performed coronary angioplasty primarily through the femoral artery in the groin. Today, radial wrist access has transformed cardiac intervention, drastically reducing complications and enhancing patient comfort."
      },
      {
        type: "heading",
        text: "The Major Advantages of Wrist Access"
      },
      {
        type: "checklist",
        items: [
          "Near elimination of major access-site bleeding and groin hematomas",
          "No requirement for 6 to 8 hours of rigid flat bedrest",
          "Ability to sit up, eat, and walk within 1 to 2 hours post-procedure",
          "Significantly shorter hospital stay, enabling same-day discharge for many patients"
        ]
      }
    ],
    faqs: [
      {
        question: "Can all patients undergo radial wrist angioplasty?",
        answer: "Over 95% of patients have suitable radial arteries. An Allen test or ultrasound pulse check is performed prior to the procedure to confirm dual blood supply to the hand."
      }
    ]
  },
  {
    id: "b3",
    slug: "tavr-game-changer-for-seniors",
    title: "TAVR: The Game-Changer for Elderly Aortic Valve Patients",
    excerpt: "How transcatheter aortic valve replacement allows seniors with severe aortic stenosis to receive a new heart valve without open-heart surgery.",
    category: "Innovations",
    publishDate: "August 15, 2026",
    readTime: "7 min read",
    author: {
      name: "Dr. Manjinder Sandhu",
      role: "Senior Interventional Cardiologist",
      avatar: "/images/dr-sandhu-portrait.jpg"
    },
    tags: ["TAVR", "TAVI", "Valve Replacement", "Senior Health"],
    contentBlocks: [
      {
        type: "paragraph",
        text: "Aortic valve stenosis affects millions of elderly adults worldwide. As the valve becomes thick and calcified, the heart works harder to pump blood, causing severe fatigue, breathlessness, and chest pain."
      },
      {
        type: "paragraph",
        text: "TAVR offers a non-surgical alternative where a new valve is placed inside the old valve via a small leg catheter, avoiding the risks of sternotomy and open surgery."
      }
    ]
  }
];
