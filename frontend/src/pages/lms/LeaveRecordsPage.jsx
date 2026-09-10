import React, { useEffect, useMemo, useState } from "react";

import {
  getAllLeaveRequests,
  archiveLeaveRequests,
} from "../../services/lms/leaveService";

import { LEAVE_STATUSES } from "../../data/lms/leaveTypes";
import LeaveRequestTable from "../../components/lms/LeaveRequestTable";

function LeaveRecordsPage() {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [status, setStatus] = useState("ALL");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [archiving, setArchiving] = useState(false);

  useEffect(() => {
    loadLeaveRequests();
  }, []);

  async function handleArchive() {

  const confirmed =
      window.confirm(
        "Archive completed leave records?\n\n" +
        "This will export all APPROVED and REJECTED " +
        "leave records to Excel and permanently remove " +
        "them from the database.\n\n" +
        "PENDING requests will not be affected."
      );

    if (!confirmed) {
      return;
    }

    setArchiving(true);
    setError("");

    try {

      const blob =
        await archiveLeaveRequests();

      const url =
        window.URL.createObjectURL(blob);

      const link =
        document.createElement("a");

      link.href = url;

      link.download =
        `Leave_Records_Archive_${
          new Date()
            .toISOString()
            .split("T")[0]
        }.xlsx`;

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);

      await loadLeaveRequests();

    } catch (error) {

      console.error(error);

      setError(
        "Failed to archive leave records."
      );

    } finally {

      setArchiving(false);
    }
  }

  async function loadLeaveRequests() {
    setLoading(true);
    setError("");

    try {
      const data = await getAllLeaveRequests();

      setLeaveRequests(data);
    } catch (error) {
      console.error(error);
      setError("Failed to load leave records.");
    } finally {
      setLoading(false);
    }
  }

  const filtered = useMemo(
    () =>
      leaveRequests.filter((request) => {
        return (
          status === "ALL" ||
          request.status === status
        );
      }),
    [leaveRequests, status]
  );

  if (loading) {
    return (
      <div>
        <h1 className="fj-display text-2xl font-semibold mb-1">
          Leave Records
        </h1>

        <p className="text-sm">
          Loading leave records...
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="fj-display text-2xl font-semibold mb-1">
        Leave Records
      </h1>

      <p
        className="text-sm mb-6"
        style={{ color: "var(--ink-soft)" }}
      >
        Full company leave ledger, across every status.
      </p>

      {error && (
        <div
          className="mb-6 p-3 text-sm"
          style={{
            border: "1px solid var(--line)",
            borderRadius: "10px",
          }}
        >
          {error}
        </div>
      )}

      <div className="flex flex-wrap gap-3 mb-5">
        <select
          className="lms-field-input"
          style={{ width: "auto" }}
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
        >
          <option value="ALL">
            All Statuses
          </option>

          {LEAVE_STATUSES.map((s) => (
            <option key={s} value={s}>
              {s.charAt(0) +
                s.slice(1).toLowerCase()}
            </option>
          ))}
        </select>
      </div>

      <LeaveRequestTable
        requests={filtered}
        showEmployee
      />
      <div className="mt-5">
          <button
            type="button"
            className="fj-btn-secondary"
            onClick={handleArchive}
            disabled={archiving}
          >
            {archiving
              ? "Archiving..."
              : "Archive & Clear"}
          </button>
      </div>
      </div>
  );
}

export default LeaveRecordsPage;