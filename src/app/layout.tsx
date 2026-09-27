import type { Metadata } from "next";
import "./globals.css";
<<<<<<< HEAD
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { ScrollReveal } from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Dr. Manjinder Sandhu | Senior Interventional Cardiologist Gurugram | Atrius Cardiac Care",
  description: "Dr. Manjinder Sandhu is Principal Director – Cardiology at Atrius Cardiac Care & Fortis. 33+ years expertise in Radial Angioplasty, TAVR/TAVI, Pacemaker Implants, and Calcified CTO Stenting.",
  keywords: ["Dr Manjinder Sandhu", "Cardiologist Gurgaon", "Best Cardiologist Gurugram", "Radial Angioplasty", "TAVR Gurgaon", "Atrius Cardiac Care", "Fortis Gurgaon Cardiology"],
  openGraph: {
    title: "Dr. Manjinder Sandhu — Senior Interventional Cardiologist",
    description: "Principal Director – Cardiology at Atrius Cardiac Care & Fortis Hospitals. 33+ years of excellence in interventional cardiac care.",
    type: "website",
    url: "https://drmanjindersandhu.com"
  }
=======
import "./redesign.css";
import { NavigationMotion } from "@/components/NavigationMotion";
import { MotionEffects } from "@/components/MotionEffects";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.drmanjindersandhu.com"),
  icons: { icon: "/images/dr-sandhu-logo.png" },
  title:
    "Dr. Manjinder Sandhu | Senior Interventional Cardiologist | Gurugram",
  description:
    "Dr. Manjinder Sandhu is a Senior Interventional Cardiologist with 33+ years of experience in radial angioplasty, TAVR/TAVI, pacemaker implants, and calcified CTO stenting.",
  keywords: [
    "Dr Manjinder Sandhu",
    "Cardiologist Gurgaon",
    "Best Cardiologist Gurugram",
    "Radial Angioplasty",
    "TAVR Gurgaon",
    "Fortis Gurgaon Cardiology",
  ],
  openGraph: {
    title: "Dr. Manjinder Sandhu — Senior Interventional Cardiologist",
    description:
      "Senior Interventional Cardiologist with 33+ years of experience in cardiac care.",
    type: "website",
    url: "https://www.drmanjindersandhu.com",
  },
>>>>>>> ea53e95 (Update website design, SEO files, and content)
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
<<<<<<< HEAD
        <ScrollReveal />
        <Header />
        <main style={{ flex: 1 }}>{children}</main>
=======
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <MotionEffects />
        <NavigationMotion />
        <Header />
        <main id="main-content" tabIndex={-1} style={{ flex: 1 }}>
          {children}
        </main>
>>>>>>> ea53e95 (Update website design, SEO files, and content)
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
