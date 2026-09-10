import React, { useState } from "react";
import { LEAVE_TYPES } from "../../data/lms/leaveTypes";

function computeDays(startDate, endDate) {
  if (!startDate || !endDate) {
    return 0;
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  const millisecondsPerDay =
    1000 * 60 * 60 * 24;

  return (
    Math.round(
      (end - start) / millisecondsPerDay
    ) + 1
  );
}

function LeaveRequestForm({ remainingBalance, onCancel, onSubmit }) {
  const [leaveType, setLeaveType] = useState(LEAVE_TYPES[0]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");

  const days = computeDays(startDate, endDate);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!startDate || !endDate) {
      setError("Please select a start and end date.");
      return;
    }
    if (days <= 0) {
      setError("End date must be on or after the start date.");
      return;
    }
    if (days > remainingBalance) {
      setError(`You only have ${remainingBalance} day${remainingBalance === 1 ? "" : "s"} remaining.`);
      return;
    }
    onSubmit({ leaveType, startDate, endDate, reason });
  };

  return (
    <div className="lms-modal-backdrop" onClick={onCancel}>
      <div className="lms-modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="fj-display text-xl font-semibold mb-4">Request Leave</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="lms-field-label" htmlFor="leaveType">Leave Type</label>
            <select
              id="leaveType"
              className="lms-field-input"
              value={leaveType}
              onChange={(e) => setLeaveType(e.target.value)}
            >
              {LEAVE_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="lms-field-label" htmlFor="startDate">Start Date</label>
              <input
                id="startDate"
                type="date"
                className="lms-field-input"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div>
              <label className="lms-field-label" htmlFor="endDate">End Date</label>
              <input
                id="endDate"
                type="date"
                className="lms-field-input"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          <div className="fj-card p-3 flex items-center justify-between text-sm">
            <span style={{ color: "var(--ink-soft)" }}>Duration</span>
            <span className="fj-display font-semibold">{days > 0 ? `${days} day${days === 1 ? "" : "s"}` : "—"}</span>
          </div>

          <div>
            <label className="lms-field-label" htmlFor="reason">Reason</label>
            <textarea
              id="reason"
              className="lms-field-input"
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Briefly describe the reason for this leave"
            />
          </div>

          <div className="fj-card p-3 flex items-center justify-between text-sm" style={{ background: "var(--paper)" }}>
            <span style={{ color: "var(--ink-soft)" }}>Remaining Balance</span>
            <span className="fj-display font-semibold">{remainingBalance} days</span>
          </div>

          {error && (
            <p className="text-sm font-semibold" style={{ color: "var(--red-deep)" }}>{error}</p>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onCancel} className="fj-btn-secondary text-sm py-2 px-4">
              Cancel
            </button>
            <button type="submit" className="fj-btn-primary text-sm py-2 px-4">
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LeaveRequestForm;
