import React, { useEffect, useState } from "react";
import { useLms } from "../../context/LmsContext";
import {
    getLeaveBalance,
    getRequestsForEmployee,
} from "../../services/lms/leaveService";

import { getEmployee } from "../../services/lms/employeeService";

function Row({ label, value }) {
  return (
    <div
      className="py-3 grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4 border-b"
      style={{ borderColor: "var(--line)" }}
    >
      <dt
        className="text-xs font-extrabold uppercase tracking-wider"
        style={{ color: "var(--red-deep)" }}
      >
        {label}
      </dt>

      <dd className="sm:col-span-2 text-sm">
        {value ?? "—"}
      </dd>
    </div>
  );
}

function ProfilePage() {
  const { currentUser } = useLms();
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    if (!currentUser?.employeeNumber) {
      return;
    }

    loadProfileData();
  }, [currentUser]);

  async function loadProfileData() {
      setLoading(true);
      setError("");

      try {
          const [
              employeeData,
              balanceData,
              leaveRequestData,
          ] = await Promise.all([
              getEmployee(
                  currentUser.employeeNumber
              ),
              getLeaveBalance(
                  currentUser.employeeNumber
              ),
              getRequestsForEmployee(
                  currentUser.employeeNumber
              ),
          ]);

          setEmployee(employeeData);
          setBalance(balanceData);
          setLeaveRequests(leaveRequestData);

      } catch (error) {
          console.error(error);

          setError(
              "Failed to load profile data."
          );
      } finally {
          setLoading(false);
      }
  }

  if (loading) {
    return (
      <div>
        <h1 className="fj-display text-2xl font-semibold mb-6">
          Profile
        </h1>

        <p className="text-sm">
          Loading profile...
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="fj-display text-2xl font-semibold mb-6">
        Profile
      </h1>

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

      <div className="fj-card p-6 mb-6 max-w-2xl">
          <dl>
              <Row
                  label="Employee Number"
                  value={employee?.employeeNumber}
              />

              <Row
                  label="Employee Name"
                  value={employee?.employeeName}
              />

              <Row
                  label="Position"
                  value={employee?.position}
              />

              <Row
                  label="Store Assignment"
                  value={employee?.storeAssignment}
              />

              <Row
                  label="Hiring Date"
                  value={
                      employee?.hiringDate
                          ? new Date(
                                employee.hiringDate
                            ).toLocaleDateString(
                                "en-US",
                                {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                }
                            )
                          : "—"
                  }
              />
          </dl>
      </div>

      <div className="fj-card p-6 max-w-2xl">
          <p
              className="text-xs font-extrabold uppercase tracking-wider mb-4"
              style={{ color: "var(--cyan-deep)" }}
          >
              Leave Balance
          </p>

          {balance && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  <div className="lms-summary-card">
                      <div className="lms-summary-value">
                          {Number(
                              balance.vacationRemaining || 0
                          )}
                      </div>

                      <div className="lms-summary-label">
                          Vacation Leave
                      </div>

                      <div
                          className="text-xs mt-1"
                          style={{
                              color: "var(--ink-soft)"
                          }}
                      >
                          {Number(balance.vacationUsed || 0)}
                          {" used / "}
                          {Number(balance.vacationCredit || 0)}
                          {" total"}
                      </div>
                  </div>

                  <div className="lms-summary-card">
                      <div className="lms-summary-value">
                          {Number(
                              balance.sickRemaining || 0
                          )}
                      </div>

                      <div className="lms-summary-label">
                          Sick Leave
                      </div>

                      <div
                          className="text-xs mt-1"
                          style={{
                              color: "var(--ink-soft)"
                          }}
                      >
                          {Number(balance.sickUsed || 0)}
                          {" used / "}
                          {Number(balance.sickCredit || 0)}
                          {" total"}
                      </div>
                  </div>

                  <div className="lms-summary-card">
                      <div className="lms-summary-value">
                          {Number(
                              balance.soloParentRemaining || 0
                          )}
                      </div>

                      <div className="lms-summary-label">
                          Solo Parent Leave
                      </div>

                      <div
                          className="text-xs mt-1"
                          style={{
                              color: "var(--ink-soft)"
                          }}
                      >
                          {Number(balance.soloParentUsed || 0)}
                          {" used / "}
                          {Number(balance.soloParentCredit || 0)}
                          {" total"}
                      </div>
                  </div>

                  <div className="lms-summary-card">
                      <div className="lms-summary-value">
                          {Number(
                              balance.maternalPaternalRemaining || 0
                          )}
                      </div>

                      <div className="lms-summary-label">
                          Maternal / Paternal Leave
                      </div>

                      <div
                          className="text-xs mt-1"
                          style={{
                              color: "var(--ink-soft)"
                          }}
                      >
                          {Number(
                              balance.maternalPaternalUsed || 0
                          )}
                          {" used / "}
                          {Number(
                              balance.maternalPaternalCredit || 0
                          )}
                          {" total"}
                      </div>
                  </div>

              </div>
          )}
      </div>
    </div>
  );
}

export default ProfilePage;