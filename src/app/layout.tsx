import type { Metadata } from "next";
import "./globals.css";
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ScrollReveal />
        <Header />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
