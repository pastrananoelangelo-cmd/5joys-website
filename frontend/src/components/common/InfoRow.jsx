function InfoRow({ label, value }) {
  return (
    <div className="py-4 grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4 border-b fj-hairline">
      <dt className="text-xs font-extrabold uppercase tracking-wider self-start pt-0.5" style={{ color: "var(--red-deep)" }}>{label}</dt>
      <dd className="sm:col-span-2 text-sm md:text-base" style={{ color: "var(--ink)" }}>{value}</dd>
    </div>
  );
}

export default InfoRow;