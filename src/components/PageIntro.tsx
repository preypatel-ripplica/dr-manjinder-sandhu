export function PageIntro({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description: string;
}) {
  return (
    <section className="page-intro">
      <div className="container-custom">
        <span className="eyebrow-pill">{label}</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </section>
  );
}
