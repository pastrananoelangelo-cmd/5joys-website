import React from "react";

function LeaveSummaryCard({ value, label, accent }) {
  return (
    <div className="fj-card lms-summary-card">
      <div className="lms-summary-value" style={accent ? { color: accent } : undefined}>
        {value}
      </div>
      <div className="lms-summary-label">{label}</div>
    </div>
  );
}

export default LeaveSummaryCard;
