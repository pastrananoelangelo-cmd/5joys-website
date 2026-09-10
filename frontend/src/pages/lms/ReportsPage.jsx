import React, { useEffect, useMemo, useState } from "react";

import {
    getAllLeaveRequests,
    getHRSummary,
} from "../../services/lms/leaveService";

import { getEmployees } from "../../services/lms/employeeService";

import LeaveSummaryCard from "../../components/lms/LeaveSummaryCard";

function BarRow({ label, count, max, color }) {
    const pct =
        max > 0
            ? Math.round((count / max) * 100)
            : 0;

    return (
        <div className="mb-3">
            <div className="flex items-center justify-between text-sm mb-1">
                <span>{label}</span>

                <span
                    style={{
                        color: "var(--ink-soft)",
                    }}
                >
                    {count}
                </span>
            </div>

            <div
                style={{
                    background: "var(--paper)",
                    borderRadius: 999,
                    height: 8,
                    overflow: "hidden",
                }}
            >
                <div
                    style={{
                        width: `${pct}%`,
                        background: color,
                        height: "100%",
                        borderRadius: 999,
                    }}
                />
            </div>
        </div>
    );
}

function ReportsPage() {
    const [leaveRequests, setLeaveRequests] =
        useState([]);

    const [employees, setEmployees] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    useEffect(() => {
        loadReports();
    }, []);

    async function loadReports() {
        setLoading(true);
        setError("");

        try {
            const [
                leaveRequestData,
                employeeData,
            ] = await Promise.all([
                getAllLeaveRequests(),
                getEmployees(),
            ]);

            setLeaveRequests(leaveRequestData);
            setEmployees(employeeData);
        } catch (error) {
            console.error(error);

            setError(
                "Failed to load report data."
            );
        } finally {
            setLoading(false);
        }
    }

    const summary =
        getHRSummary(leaveRequests);

    const byType = useMemo(() => {
        const counts = {};

        leaveRequests.forEach((request) => {
            counts[request.leaveType] =
                (counts[request.leaveType] || 0) + 1;
        });

        return Object.entries(counts).sort(
            (a, b) => b[1] - a[1]
        );
    }, [leaveRequests]);

    const byStore = useMemo(() => {
        const counts = {};

        leaveRequests.forEach((request) => {
            const employee =
                employees.find(
                    (employee) =>
                        employee.employeeNumber ===
                        request.employeeNumber
                );

            const store =
                employee?.storeAssignment ||
                "Unassigned";

            counts[store] =
                (counts[store] || 0) + 1;
        });

        return Object.entries(counts).sort(
            (a, b) => b[1] - a[1]
        );
    }, [leaveRequests, employees]);

    const maxType = Math.max(
        ...byType.map(([, count]) => count),
        1
    );

    const maxStore = Math.max(
        ...byStore.map(([, count]) => count),
        1
    );

    if (loading) {
        return (
            <div>
                <h1 className="fj-display text-2xl font-semibold mb-1">
                    Reports
                </h1>

                <p className="text-sm">
                    Loading report data...
                </p>
            </div>
        );
    }

    return (
        <div>
            <h1 className="fj-display text-2xl font-semibold mb-1">
                Reports
            </h1>

            <p
                className="text-sm mb-6"
                style={{
                    color: "var(--ink-soft)",
                }}
            >
                A quick read on leave activity
                across the company.
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

            <div className="lms-summary-grid mb-8">
                <LeaveSummaryCard
                    value={summary.pending}
                    label="Pending Requests"
                    accent="var(--gold-deep)"
                />

                <LeaveSummaryCard
                    value={summary.approvedThisMonth}
                    label="Approved This Month"
                    accent="var(--cyan-deep)"
                />

                <LeaveSummaryCard
                    value={summary.rejectedThisMonth}
                    label="Rejected This Month"
                    accent="var(--red-deep)"
                />

                <LeaveSummaryCard
                    value={summary.total}
                    label="Total Requests"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="fj-card p-6">
                    <p
                        className="text-xs font-extrabold uppercase tracking-wider mb-4"
                        style={{
                            color: "var(--cyan-deep)",
                        }}
                    >
                        Requests by Leave Type
                    </p>

                    {byType.length === 0 ? (
                        <p
                            className="text-sm"
                            style={{
                                color: "var(--ink-soft)",
                            }}
                        >
                            No leave requests found.
                        </p>
                    ) : (
                        byType.map(
                            ([type, count]) => (
                                <BarRow
                                    key={type}
                                    label={type}
                                    count={count}
                                    max={maxType}
                                    color="var(--red)"
                                />
                            )
                        )
                    )}
                </div>

                <div className="fj-card p-6">
                    <p
                        className="text-xs font-extrabold uppercase tracking-wider mb-4"
                        style={{
                            color: "var(--cyan-deep)",
                        }}
                    >
                        Requests by Store
                    </p>

                    {byStore.length === 0 ? (
                        <p
                            className="text-sm"
                            style={{
                                color: "var(--ink-soft)",
                            }}
                        >
                            No leave requests found.
                        </p>
                    ) : (
                        byStore.map(
                            ([store, count]) => (
                                <BarRow
                                    key={store}
                                    label={store}
                                    count={count}
                                    max={maxStore}
                                    color="var(--cyan-deep)"
                                />
                            )
                        )
                    )}
                </div>
            </div>
        </div>
    );
}

export default ReportsPage;