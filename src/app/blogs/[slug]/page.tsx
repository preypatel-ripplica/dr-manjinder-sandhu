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
  );
}
