<<<<<<< HEAD
import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { blogs } from "@/data/blogs";
import { FAQAccordion } from "@/components/FAQAccordion";
import { Calendar, Clock, User, ArrowLeft, Tag } from "lucide-react";

export function generateStaticParams() {
  return blogs.map((b) => ({
    slug: b.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = blogs.find((b) => b.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div>
      {/* Article Header */}
      <section style={{ backgroundColor: "var(--bg-soft)", padding: "3.5rem 0", borderBottom: "1px solid var(--border-color)" }}>
        <div className="container-reading">
          <Link href="/blogs" style={{ color: "var(--primary)", textDecoration: "none", fontSize: "0.875rem", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: "0.4rem", marginBottom: "1.25rem" }}>
            <ArrowLeft size={16} /> Back to Blogs
          </Link>

          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.825rem", color: "var(--text-muted)", marginBottom: "0.75rem" }}>
            <span className="eyebrow-pill">{post.category}</span>
            <span>{post.publishDate}</span>
            <span>•</span>
            <span style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
              <Clock size={13} /> {post.readTime}
            </span>
          </div>

          <h1 style={{ fontSize: "2.35rem", color: "var(--secondary)", lineHeight: 1.2, marginBottom: "1.25rem" }}>
            {post.title}
          </h1>

          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", borderTop: "1px solid var(--border-color)", paddingTop: "1rem" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "var(--primary-light)", color: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>
              <User size={20} />
            </div>
            <div>
              <div style={{ fontWeight: 700, color: "var(--secondary)", fontSize: "0.9rem" }}>{post.author.name}</div>
              <div style={{ fontSize: "0.775rem", color: "var(--text-muted)" }}>{post.author.role}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Article Body Column (§7 Constrained Reading Column ~720px) */}
      <section className="section-padding" style={{ backgroundColor: "var(--bg-page)" }}>
        <div className="container-reading">
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", fontSize: "1.05rem", color: "var(--text-body)", lineHeight: 1.8 }}>
            {post.contentBlocks.map((block, idx) => {
              if (block.type === "paragraph") {
                return <p key={idx}>{block.text}</p>;
              }
              if (block.type === "heading") {
                return (
                  <h2 key={idx} style={{ fontSize: "1.5rem", color: "var(--secondary)", marginTop: "1.5rem", marginBottom: "0.5rem", fontWeight: 700 }}>
                    {block.text}
                  </h2>
                );
              }
              if (block.type === "quote") {
                return (
                  <blockquote
                    key={idx}
                    style={{
                      borderLeft: "4px solid var(--primary)",
                      backgroundColor: "var(--primary-light)",
                      padding: "1.25rem 1.5rem",
                      margin: "1.5rem 0",
                      borderRadius: "0 var(--radius-md) var(--radius-md) 0",
                      fontStyle: "italic",
                      color: "var(--secondary)",
                      fontWeight: 600
                    }}
                  >
                    &ldquo;{block.text}&rdquo;
                  </blockquote>
                );
              }
              if (block.type === "checklist" && block.items) {
                return (
                  <ul key={idx} style={{ listStyle: "none", padding: 0, margin: "1rem 0", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    {block.items.map((item, i) => (
                      <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", fontSize: "1rem", color: "var(--secondary)" }}>
                        <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "var(--primary)", marginTop: "10px", flexShrink: 0 }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                );
              }
              return null;
            })}
          </div>

          {/* Tags */}
          <div style={{ marginTop: "3rem", paddingTop: "1.5rem", borderTop: "1px solid var(--border-color)", display: "flex", alignItems: "center", gap: "0.6rem", flexWrap: "wrap" }}>
            <Tag size={16} style={{ color: "var(--primary)" }} />
            {post.tags.map((tag, i) => (
              <span key={i} style={{ backgroundColor: "var(--bg-soft)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-pill)", padding: "0.25rem 0.75rem", fontSize: "0.8rem", color: "var(--secondary)" }}>
                #{tag}
              </span>
            ))}
          </div>

          {/* FAQ Accordion */}
          {post.faqs && post.faqs.length > 0 && (
            <div style={{ marginTop: "3rem" }}>
              <FAQAccordion items={post.faqs} title="Frequently Asked Questions" />
            </div>
          )}
        </div>
      </section>
    </div>
=======
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { blogs } from "@/data/blogs";
import { blogVisuals } from "@/data/care-visuals";
import { FAQAccordion } from "@/components/FAQAccordion";
export function generateStaticParams() {
  return blogs.map((b) => ({ slug: b.slug }));
}
export default async function BlogPostDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogs.find((b) => b.slug === slug);
  if (!post) notFound();
  const visual = blogVisuals[slug];
  return (
    <article>
      <header className="article-header container-custom">
        <Link href="/blogs" className="quiet-link">
          <ArrowLeft size={16} /> All articles
        </Link>
        <div className="article-meta">
          <span className="eyebrow-pill">{post.category}</span>
          <span>{post.publishDate}</span>
          <span>{post.readTime}</span>
        </div>
        <h1>{post.title}</h1>
        <p className="article-deck">{post.excerpt}</p>
        <div className="article-author">
          <img
            src="/images/dr-sandhu-office.png"
            alt="Dr. Manjinder Sandhu"
            width={48}
            height={48}
          />
          <div>
            <strong>{post.author.name}</strong>
            <span>{post.author.role}</span>
          </div>
        </div>
      </header>
      <figure className="article-cover container-custom">
        <img
          src={visual.image}
          alt={visual.alt}
          width={1200}
          height={600}
          fetchPriority="high"
        />
        <figcaption>{visual.caption}</figcaption>
      </figure>
      <div className="container-custom article-layout">
        <aside className="article-sidebar">
          <span className="eyebrow-pill">IN THIS ARTICLE</span>
          <a href="#overview">Overview</a>
          {post.contentBlocks.map((block, i) =>
            block.type === "heading" ? (
              <a key={i} href={`#section-${i}`}>
                {block.text}
              </a>
            ) : null,
          )}
          {!!post.faqs?.length && (
            <a href="#article-questions">Your questions</a>
          )}
          <div className="article-side-note">
            <p>Questions about your own heart health?</p>
            <Link className="quiet-link" href="/contact-us">
              Talk to the team <ArrowUpRight size={16} />
            </Link>
          </div>
        </aside>
        <div className="article-body" id="overview">
          {post.contentBlocks.map((block, i) => (
            <div key={i}>
              {block.type === "paragraph" && <p>{block.text}</p>}
              {block.type === "heading" && (
                <h2 id={`section-${i}`}>{block.text}</h2>
              )}
              {block.type === "quote" && <blockquote>{block.text}</blockquote>}
              {block.type === "checklist" && (
                <ul className="article-checklist">
                  {block.items?.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
              {i === post.contentBlocks.length - 1 && (
                <figure className="article-inline-image">
                  <img
                    src={
                      slug === "tavr-game-changer-for-seniors"
                        ? "/images/heart-consultation.jpg"
                        : "/images/dr-sandhu-office.png"
                    }
                    alt={
                      slug === "tavr-game-changer-for-seniors"
                        ? "A routine blood pressure assessment"
                        : "Dr. Sandhu in his consultation room"
                    }
                    width={800}
                    height={540}
                    loading="lazy"
                  />
                  <figcaption>
                    {slug === "tavr-game-changer-for-seniors"
                      ? "Individual assessment helps guide treatment conversations."
                      : "Dr. Manjinder Sandhu — Senior Interventional Cardiologist"}
                  </figcaption>
                </figure>
              )}
            </div>
          ))}
          <div className="article-tags">
            {post.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          {!!post.faqs?.length && (
            <div id="article-questions">
              <FAQAccordion
                items={post.faqs}
                title="Your questions, answered"
                showPricingDisclaimer={false}
              />
            </div>
          )}
          {!!post.sources?.length && (
            <aside className="article-sources" aria-label="Article sources">
              <span className="eyebrow-pill">SOURCES</span>
              <p>
                For patient education. Discuss your own symptoms and treatment
                with a qualified clinician.
              </p>
              <ul>
                {post.sources.map((source) => (
                  <li key={source.url}>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {source.label} <ArrowUpRight size={14} />
                    </a>
                  </li>
                ))}
              </ul>
            </aside>
          )}
        </div>
      </div>
      <section className="section-padding section-soft">
        <div className="container-custom">
          <div className="section-heading">
            <h2>Keep reading</h2>
            <Link href="/blogs" className="quiet-link">
              All articles <ArrowUpRight size={16} />
            </Link>
          </div>
          <div className="editorial-grid">
            {blogs
              .filter((b) => b.slug !== slug)
              .map((b) => (
                <article className="editorial-card" key={b.id}>
                  <Link href={`/blogs/${b.slug}`}>
                    <img
                      src={blogVisuals[b.slug].image}
                      alt={blogVisuals[b.slug].alt}
                      loading="lazy"
                      width={800}
                      height={450}
                    />
                    <span className="eyebrow-pill">{b.category}</span>
                    <h3>{b.title}</h3>
                  </Link>
                </article>
              ))}
          </div>
        </div>
      </section>
    </article>
>>>>>>> ea53e95 (Update website design, SEO files, and content)
  );
}
