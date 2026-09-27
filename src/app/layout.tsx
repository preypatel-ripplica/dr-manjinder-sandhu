import type { Metadata } from "next";
import "./globals.css";
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <MotionEffects />
        <NavigationMotion />
        <Header />
        <main id="main-content" tabIndex={-1} style={{ flex: 1 }}>
          {children}
        </main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
