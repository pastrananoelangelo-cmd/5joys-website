import React from "react";

const STATUS_STYLE = {
  PENDING: { bg: "var(--lms-status-pending-bg)", fg: "var(--lms-status-pending-fg)", label: "Pending" },
  APPROVED: { bg: "var(--lms-status-approved-bg)", fg: "var(--lms-status-approved-fg)", label: "Approved" },
  REJECTED: { bg: "var(--lms-status-rejected-bg)", fg: "var(--lms-status-rejected-fg)", label: "Rejected" },
};

function LeaveStatusBadge({ status }) {
  const style = STATUS_STYLE[status] || STATUS_STYLE.PENDING;
  return (
    <span className="lms-status-badge" style={{ background: style.bg, color: style.fg }}>
      {style.label}
    </span>
  );
}

export default LeaveStatusBadge;
