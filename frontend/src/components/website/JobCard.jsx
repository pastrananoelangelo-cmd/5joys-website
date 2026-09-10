import { useState } from "react";

function JobCard({ job }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="fj-card p-6 flex flex-col h-full">
      <div className="flex items-start justify-between gap-3">
        <h3 className="fj-display text-lg font-semibold leading-snug">{job.title}</h3>
        <span className="fj-badge shrink-0">{job.type}</span>
      </div>

      <p className="mt-2 text-sm font-bold" style={{ color: "var(--red-deep)" }}>{job.department}</p>
      <p className="mt-1 text-sm" style={{ color: "var(--ink-soft)" }}>{job.location}</p>

      <p className="mt-4 text-sm leading-relaxed flex-1" style={{ color: "var(--ink-soft)" }}>{job.summary}</p>

      {expanded && (
        <div className="mt-5 pt-5 border-t fj-hairline space-y-4">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-wider mb-2" style={{ color: "var(--cyan-deep)" }}>Responsibilities</p>
            <ul className="text-sm space-y-1.5 list-disc pl-5" style={{ color: "var(--ink-soft)" }}>
              {job.responsibilities.map((r, i) => <li key={i}>{r}</li>)}
            </ul>
          </div>
          <div>
            <p className="text-xs font-extrabold uppercase tracking-wider mb-2" style={{ color: "var(--cyan-deep)" }}>Qualifications</p>
            <ul className="text-sm space-y-1.5 list-disc pl-5" style={{ color: "var(--ink-soft)" }}>
              {job.qualifications.map((q, i) => <li key={i}>{q}</li>)}
            </ul>
          </div>
        </div>
      )}

      <div className="mt-6 flex items-center gap-3">
        <button onClick={() => setExpanded((e) => !e)} className="fj-btn-secondary text-sm py-2 px-4">
          {expanded ? "Hide Details" : "View Details"}
        </button>
        <button
          className="text-sm fj-link"
          onClick={() => alert(`Application flow for "${job.title}" would open here once connected to the careers API.`)}
        >
          Apply
        </button>
      </div>
    </div>
  );
}

export default JobCard;