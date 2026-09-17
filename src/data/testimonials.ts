export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  date: string;
  source: "Google Review" | "Verified Patient";
  text: string;
  procedureTag?: string;
  videoUrl?: string;
  thumbnail?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "rev1",
    name: "Rajesh K. Sharma",
    location: "Gurugram",
    rating: 5,
    date: "August 2026",
    source: "Google Review",
    text: "Dr. Manjinder Sandhu is hands down one of the most competent and humble cardiologists in India. He performed a radial angioplasty on my father at Fortis Gurugram. The procedure was smooth, transparent, and dad was walking comfortably in his room within two hours!",
    procedureTag: "Radial Angioplasty"
  },
  {
    id: "rev2",
    name: "Sunita Verma",
    location: "Delhi NCR",
    rating: 5,
    date: "July 2026",
    source: "Verified Patient",
    text: "When my mother was diagnosed with severe aortic valve stenosis, we were terrified. Dr. Sandhu explained the TAVR procedure so calmly and answered all our doubts. The TAVR surgery took less than an hour without any chest opening. She is now active and energetic!",
    procedureTag: "TAVR Valve Replacement",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnail: "/images/video-thumb-1.jpg"
  },
  {
    id: "rev3",
    name: "Brigadier (Retd.) Harpal Singh",
    location: "Chandigarh",
    rating: 5,
    date: "June 2026",
    source: "Google Review",
    text: "Extremely professional, highly ethical, and deeply caring doctor. Dr. Sandhu implanted a dual-chamber pacemaker for my heart block. His post-op guidance and follow-up clinical protocol at Atrius Cardiac Care are commendable.",
    procedureTag: "Pacemaker Implantation"
  },
  {
    id: "rev4",
    name: "Anil Grover",
    location: "Faridabad",
    rating: 5,
    date: "May 2026",
    source: "Google Review",
    text: "Dr. Sandhu is an absolute master of complex radial angioplasty. He opened a 100% blocked calcified artery that another hospital had declared un-stentable. Truly grateful to him and his team at Atrius Cardiac Care.",
    procedureTag: "Complex CTO Stenting"
  }
];
