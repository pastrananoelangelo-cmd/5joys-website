import React from "react";
import LeaveStatusBadge from "./LeaveStatusBadge";

function formatRange(start, end) {
  const opts = { month: "short", day: "numeric" };
  const s = new Date(start).toLocaleDateString("en-US", opts);
  if (start === end) return s;
  const e = new Date(end).toLocaleDateString("en-US", opts);
  return `${s} – ${e}`;
}

/**
 * showEmployee: include an Employee column (HR views)
 * onRowClick(request): optional — makes rows clickable (HR review flow)
 */
function LeaveRequestTable({ requests, showEmployee = false, onRowClick }) {
  if (requests.length === 0) {
    return (
      <div className="fj-card p-6 text-center text-sm" style={{ color: "var(--ink-soft)" }}>
        No leave requests match these filters.
      </div>
    );
  }

  return (
    <>
      <div className="lms-table-wrap fj-card">
        <table className="lms-table">
          <thead>
            <tr>
              {showEmployee && <th>Employee</th>}
              <th>Leave Type</th>
              <th>Dates</th>
              <th>Duration</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((r) => (
              <tr
                key={r.id}
                className={onRowClick ? "lms-table-row-clickable" : undefined}
                onClick={onRowClick ? () => onRowClick(r) : undefined}
              >
                {showEmployee && (
                  <td>
                    <div style={{ fontWeight: 700 }}>{r.employeeName}</div>
                    <div className="text-xs" style={{ color: "var(--ink-soft)" }}>{r.department}</div>
                  </td>
                )}
                <td>{r.leaveType}</td>
                <td>{formatRange(r.startDate, r.endDate)}</td>
                <td>{r.days} {r.days === 1 ? "day" : "days"}</td>
                <td><LeaveStatusBadge status={r.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="lms-request-cards">
        {requests.map((r) => (
          <div
            key={r.id}
            className="fj-card p-4"
            onClick={onRowClick ? () => onRowClick(r) : undefined}
            style={onRowClick ? { cursor: "pointer" } : undefined}
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                {showEmployee && <div style={{ fontWeight: 700 }}>{r.employeeName}</div>}
                <div className="fj-display font-semibold">{r.leaveType}</div>
              </div>
              <LeaveStatusBadge status={r.status} />
            </div>
            <div className="text-sm mt-2" style={{ color: "var(--ink-soft)" }}>
              {formatRange(r.startDate, r.endDate)} · {r.days} {r.days === 1 ? "day" : "days"}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default LeaveRequestTable;
