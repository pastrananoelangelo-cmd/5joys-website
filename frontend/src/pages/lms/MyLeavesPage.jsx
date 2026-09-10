import React, { useEffect, useMemo, useState } from "react";
import { useLms } from "../../context/LmsContext";
import { getRequestsForEmployee } from "../../services/lms/leaveService";
import {
  LEAVE_TYPES,
  LEAVE_STATUSES,
} from "../../data/lms/leaveTypes";
import LeaveStatusBadge from "../../components/lms/LeaveStatusBadge";

function formatDate(d) {
  return new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function MyLeavesPage() {
  const { currentUser } = useLms();

  const [leaveRequests, setLeaveRequests] = useState([]);
  const [status, setStatus] = useState("ALL");
  const [leaveType, setLeaveType] = useState("ALL");
  const [year, setYear] = useState("ALL");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!currentUser?.employeeNumber) {
      return;
    }

    loadLeaveRequests();
  }, [currentUser]);

  async function loadLeaveRequests() {
    setLoading(true);
    setError("");

    try {
      const data = await getRequestsForEmployee(
        currentUser.employeeNumber
      );

      setLeaveRequests(data);
    } catch (error) {
      console.error(error);
      setError("Failed to load your leave requests.");
    } finally {
      setLoading(false);
    }
  }

  const years = useMemo(
    () =>
      Array.from(
        new Set(
          leaveRequests.map((request) =>
            request.startDate.slice(0, 4)
          )
        )
      )
        .sort()
        .reverse(),
    [leaveRequests]
  );

  const filtered = useMemo(
    () =>
      leaveRequests.filter((request) => {
        const matchesStatus =
          status === "ALL" ||
          request.status === status;

        const matchesLeaveType =
          leaveType === "ALL" ||
          request.leaveType === leaveType;

        const matchesYear =
          year === "ALL" ||
          request.startDate.startsWith(year);

        return (
          matchesStatus &&
          matchesLeaveType &&
          matchesYear
        );
      }),
    [
      leaveRequests,
      status,
      leaveType,
      year,
    ]
  );

  if (loading) {
    return (
      <div>
        <p className="text-sm">
          Loading your leave history...
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="fj-display text-2xl font-semibold mb-1">
        My Leaves
      </h1>

      <p
        className="text-sm mb-6"
        style={{ color: "var(--ink-soft)" }}
      >
        Your complete leave history.
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

        <select
          className="lms-field-input"
          style={{ width: "auto" }}
          value={leaveType}
          onChange={(e) =>
            setLeaveType(e.target.value)
          }
        >
          <option value="ALL">
            All Leave Types
          </option>

          {LEAVE_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        <select
          className="lms-field-input"
          style={{ width: "auto" }}
          value={year}
          onChange={(e) =>
            setYear(e.target.value)
          }
        >
          <option value="ALL">
            All Years
          </option>

          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <div
          className="fj-card p-6 text-center text-sm"
          style={{ color: "var(--ink-soft)" }}
        >
          No leave requests match these filters.
        </div>
      ) : (
        <div className="lms-table-wrap fj-card">
          <table className="lms-table">
            <thead>
              <tr>
                <th>Leave Type</th>
                <th>Dates</th>
                <th>Duration</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Submitted</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((request) => (
                <tr key={request.id}>
                  <td>{request.leaveType}</td>

                  <td>
                    {formatDate(request.startDate)}
                    {request.startDate !==
                    request.endDate
                      ? ` – ${formatDate(
                          request.endDate
                        )}`
                      : ""}
                  </td>

                  <td>
                    {request.days}{" "}
                    {request.days === 1
                      ? "day"
                      : "days"}
                  </td>

                  <td style={{ maxWidth: 220 }}>
                    {request.reason}
                  </td>

                  <td>
                    <LeaveStatusBadge
                      status={request.status}
                    />
                  </td>

                  <td>
                    {formatDate(
                      request.submittedOn
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default MyLeavesPage;