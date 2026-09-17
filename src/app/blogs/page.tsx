"use client";

import React, { useState } from "react";
import Link from "next/link";
import { blogs } from "@/data/blogs";
import { ChevronRight, Calendar, Stethoscope, Clock } from "lucide-react";
import { BookingModal } from "@/components/BookingModal";

export default function BlogsPage() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  return (
    <div>
      {/* Page Hero Header */}
      <section style={{ backgroundColor: "var(--bg-soft)", padding: "4rem 0", borderBottom: "1px solid var(--border-color)" }}>
        <div className="container-custom" style={{ textAlign: "center" }}>
          <span className="eyebrow-pill" style={{ marginBottom: "0.75rem" }}>CARDIAC CONVERSATIONS</span>
          <h1 className="heading-underline" style={{ fontSize: "2.5rem", marginTop: "0.5rem" }}>
            Blogs & <span style={{ color: "var(--primary)" }}>Cardiology Articles</span>
          </h1>
          <p style={{ color: "var(--text-body)", fontSize: "1.05rem", maxWidth: "720px", margin: "1rem auto 0 auto" }}>
            Evidence-based patient guides, heart attack prevention tips, and interventional tech updates by Dr. Manjinder Sandhu.
          </p>
        </div>
      </section>

      {/* Blogs Grid */}
      <section className="section-padding" style={{ backgroundColor: "var(--bg-page)" }}>
        <div className="container-custom">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2.5rem" }}>
            {blogs.map((post) => (
              <div key={post.id} className="card-surface" style={{ padding: "2rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.775rem", color: "var(--text-muted)", marginBottom: "0.75rem" }}>
                    <span className="eyebrow-pill" style={{ fontSize: "0.7rem" }}>{post.category}</span>
                    <span>{post.publishDate}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>

                  <h2 style={{ fontSize: "1.3rem", color: "var(--secondary)", marginBottom: "0.6rem", lineHeight: 1.3 }}>
                    {post.title}
                  </h2>

                  <p style={{ color: "var(--text-body)", fontSize: "0.9rem", lineHeight: 1.6, marginBottom: "1.5rem" }}>
                    {post.excerpt}
                  </p>
                </div>

                <Link href={`/blogs/${post.slug}`} className="btn-primary" style={{ justifyContent: "center" }}>
                  <span>Read Article</span>
                  <ChevronRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BookingModal isOpen={bookingModalOpen} onClose={() => setBookingModalOpen(false)} />
    </div>
  );
}
