import React, { useEffect, useState } from "react";

import { getEmployees } from "../../services/lms/employeeService";

import {
    getAllLeaveRequests,
    filterLeaveRequests,
    getHRSummary,
    getLeaveBalance,
    approveLeaveRequest,
    rejectLeaveRequest,
} from "../../services/lms/leaveService";

import {
    LEAVE_TYPES,
    LEAVE_STATUSES,
} from "../../data/lms/leaveTypes";

import LeaveSummaryCard from "../../components/lms/LeaveSummaryCard";
import LeaveRequestTable from "../../components/lms/LeaveRequestTable";
import LeaveRequestDetails from "../../components/lms/LeaveRequestDetails";

function HRLeaveRequestsPage() {

    const [leaveRequests, setLeaveRequests] =
        useState([]);

    const [status, setStatus] =
        useState("PENDING");

    const [leaveType, setLeaveType] =
        useState("ALL");

    const [selected, setSelected] =
        useState(null);

    const [selectedBalance, setSelectedBalance] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const [employees, setEmployees] = useState([]);

    const [storeAssignment, setStoreAssignment] =
        useState("ALL");

    useEffect(() => {
        loadLeaveRequests();
    }, []);

    async function loadLeaveRequests() {

        setLoading(true);
        setError("");

        try {

            const [leaveRequestData, employeeData] =
                await Promise.all([
                    getAllLeaveRequests(),
                    getEmployees(),
                ]);

            setLeaveRequests(leaveRequestData);
            setEmployees(employeeData);

        } catch (error) {

            console.error(error);

            setError(
                "Failed to load leave requests."
            );

        } finally {

            setLoading(false);
        }
    }

    const storeAssignments = Array.from(
        new Set(
            employees
                .map(
                    (employee) =>
                        employee.storeAssignment
                )
                .filter(Boolean)
        )
    );

    const summary =
        getHRSummary(leaveRequests);

    const filtered =
        filterLeaveRequests(
            leaveRequests,
            employees,
            {
                status,
                leaveType,
                storeAssignment,
            }
        );

    const handleSelectRequest =
        async (request) => {

            setSelected(request);
            setSelectedBalance(null);

            try {

                const balance =
                    await getLeaveBalance(
                        request.employeeNumber
                    );

                setSelectedBalance(balance);

            } catch (error) {

                console.error(error);

                setError(
                    "Failed to load employee leave balance."
                );
            }
        };

    const handleApprove =
        async (id) => {

            try {

                const updated =
                    await approveLeaveRequest(id);

                setLeaveRequests((previous) =>
                    previous.map((request) =>
                        request.id === id
                            ? updated
                            : request
                    )
                );

                setSelected(null);
                setSelectedBalance(null);

            } catch (error) {

                console.error(error);

                setError(
                    "Failed to approve leave request."
                );
            }
        };

    const handleReject =
        async (id, reason) => {

            try {

                const updated =
                    await rejectLeaveRequest(
                        id,
                        reason
                    );

                setLeaveRequests((previous) =>
                    previous.map((request) =>
                        request.id === id
                            ? updated
                            : request
                    )
                );

                setSelected(null);
                setSelectedBalance(null);

            } catch (error) {

                console.error(error);

                setError(
                    "Failed to reject leave request."
                );
            }
        };

    if (loading) {

        return (
            <div>

                <h1 className="fj-display text-2xl font-semibold mb-1">
                    Leave Requests
                </h1>

                <p
                    className="text-sm"
                    style={{
                        color: "var(--ink-soft)"
                    }}
                >
                    Loading leave requests...
                </p>

            </div>
        );
    }

    return (
        <div>

            <h1 className="fj-display text-2xl font-semibold mb-1">
                Leave Requests
            </h1>

            <p
                className="text-sm mb-6"
                style={{
                    color: "var(--ink-soft)"
                }}
            >
                Review and decide on employee leave requests.
            </p>

            {error && (
                <div
                    className="fj-card p-4 mb-5 text-sm"
                    style={{
                        color: "var(--red)"
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

            <div className="flex flex-wrap gap-3 mb-5">

                <select
                    className="lms-field-input"
                    style={{ width: "auto" }}
                    value={status}
                    onChange={(event) =>
                        setStatus(event.target.value)
                    }
                >
                    <option value="ALL">
                        All Statuses
                    </option>

                    {LEAVE_STATUSES.map((status) => (
                        <option
                            key={status}
                            value={status}
                        >
                            {status.charAt(0) +
                                status
                                    .slice(1)
                                    .toLowerCase()}
                        </option>
                    ))}
                </select>

                <select
                    className="lms-field-input"
                    style={{ width: "auto" }}
                    value={leaveType}
                    onChange={(event) =>
                        setLeaveType(event.target.value)
                    }
                >
                    <option value="ALL">
                        All Leave Types
                    </option>

                    {LEAVE_TYPES.map((type) => (
                        <option
                            key={type}
                            value={type}
                        >
                            {type}
                        </option>
                    ))}
                </select>

                <select
                    className="lms-field-input"
                    style={{ width: "auto" }}
                    value={storeAssignment}
                    onChange={(event) =>
                        setStoreAssignment(event.target.value)
                    }
                >
                    <option value="ALL">
                        All Store Assignments
                    </option>

                    {storeAssignments.map((store) => (
                        <option
                            key={store}
                            value={store}
                        >
                            {store}
                        </option>
                    ))}
                </select>

            </div>

            <LeaveRequestTable
                requests={filtered}
                showEmployee
                onRowClick={handleSelectRequest}
            />

            {selected && (
                <LeaveRequestDetails
                    request={selected}
                    remainingBalance={
                        selectedBalance
                            ? selectedBalance[
                                selected.leaveType === "VACATION"
                                    ? "vacationRemaining"
                                    : selected.leaveType === "SICK"
                                        ? "sickRemaining"
                                        : selected.leaveType === "SOLO_PARENT"
                                            ? "soloParentRemaining"
                                            : "maternalPaternalRemaining"
                            ]
                            : null
                    }
                    onClose={() => {
                        setSelected(null);
                        setSelectedBalance(null);
                    }}
                    onApprove={handleApprove}
                    onReject={handleReject}
                />
            )}

        </div>
    );
}

export default HRLeaveRequestsPage;