import { testimonials } from "@/data/testimonials";
export function ReviewCards({ limit = 3 }: { limit?: number }) {
  return (
    <div className="review-grid">
      {testimonials.slice(0, limit).map((review) => (
        <figure className="review-card" key={review.id}>
          <span className="review-context">{review.procedureTag}</span>
          <blockquote>“{review.text}”</blockquote>
          <figcaption>
            <strong>{review.name}</strong>
            <span>{review.location}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
