import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
export function VisualIntro({
  label,
  title,
  description,
  image = "/images/heart-consultation.jpg",
  alt = "Blood pressure assessment",
  children,
}: {
  label: string;
  title: string;
  description: string;
  image?: string;
  alt?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="visual-intro section-soft">
      <div className="container-custom visual-intro-grid">
        <div>
          <span className="eyebrow-pill">{label}</span>
          <h1>{title}</h1>
          <p>{description}</p>
          {children || (
            <Link href="/contact-us" className="text-link">
              Talk to the appointment team <ArrowUpRight size={17} />
            </Link>
          )}
        </div>
        <div className="visual-intro-image">
          <img
            src={image}
            alt={alt}
            width={800}
            height={600}
            fetchPriority="high"
          />
        </div>
      </div>
    </section>
  );
}
