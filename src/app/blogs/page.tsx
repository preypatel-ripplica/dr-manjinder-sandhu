import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { blogs } from "@/data/blogs";
import { blogVisuals } from "@/data/care-visuals";
export default function BlogsPage() {
  const featured = blogs[0];
  const visual = blogVisuals[featured.slug];
  return (
    <div>
      <section className="journal-heading">
        <div className="container-custom">
          <span className="eyebrow-pill">BLOGS</span>
          <h1>
            Heart health,
            <br />explained.
          </h1>
          <p>
            Simple articles on heart health, treatments and common questions.
          </p>
        </div>
      </section>
      <section className="journal-feature-section">
        <div className="container-custom">
          <article className="journal-feature">
            <Link
              className="journal-feature-image"
              href={`/blogs/${featured.slug}`}
              aria-label={featured.title}
            >
              <img
                src={visual.image}
                alt={visual.alt}
                width={800}
                height={600}
                fetchPriority="high"
              />
            </Link>
            <div>
              <span className="eyebrow-pill">
                FEATURED · {featured.category}
              </span>
              <h2>
                <Link href={`/blogs/${featured.slug}`}>{featured.title}</Link>
              </h2>
              <p>{featured.excerpt}</p>
              <div className="article-meta">
                {featured.publishDate}
                <span>{featured.readTime}</span>
              </div>
              <Link className="quiet-link" href={`/blogs/${featured.slug}`}>
                Read article <ArrowUpRight size={16} />
              </Link>
            </div>
          </article>
        </div>
      </section>
      <section className="section-padding">
        <div className="container-custom">
          <div className="section-heading">
            <h2>More articles</h2>
            <span className="field-hint">
              Heart health guides
            </span>
          </div>
          <div className="editorial-grid">
            {blogs.slice(1).map((post) => (
              <article className="editorial-card" key={post.id}>
                <Link href={`/blogs/${post.slug}`} aria-label={post.title}>
                  <img
                    src={blogVisuals[post.slug].image}
                    alt={blogVisuals[post.slug].alt}
                    width={800}
                    height={500}
                    loading="lazy"
                  />
                </Link>
                <div className="article-meta">
                  <span className="eyebrow-pill">{post.category}</span>
                  <span>{post.readTime}</span>
                </div>
                <h3>
                  <Link href={`/blogs/${post.slug}`}>{post.title}</Link>
                </h3>
                <p>{post.excerpt}</p>
                <Link className="quiet-link" href={`/blogs/${post.slug}`}>
                  Read article <ArrowUpRight size={16} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
