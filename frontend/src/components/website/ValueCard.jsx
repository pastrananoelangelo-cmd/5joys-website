function ValueCard({ index, title, body }) {
  return (
    <div className="fj-card p-6">
      <p className="fj-display text-2xl font-semibold" style={{ color: "var(--cyan-deep)" }}>{index + 1}</p>
      <h3 className="fj-display text-lg font-semibold mt-1">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--ink-soft)" }}>{body}</p>
    </div>
  );
}

export default ValueCard;