import React, { useEffect, useState } from "react";
import { useLms } from "../../context/LmsContext";
import { getEmployee } from "../../services/lms/employeeService";

import {
    getRequestsForEmployee,
    getLeaveBalance,
} from "../../services/lms/leaveService";

import {
    changePassword,
} from "../../services/lms/authService";

import LeaveSummaryCard from "../../components/lms/LeaveSummaryCard";
import LeaveRequestTable from "../../components/lms/LeaveRequestTable";
import LeaveRequestForm from "../../components/lms/LeaveRequestForm";

function greeting() {
    const hour = new Date().getHours();

    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";

    return "Good evening";
}

function DashboardPage() {
    const { currentUser } = useLms();

    const [leaveRequests, setLeaveRequests] =
        useState([]);

    const [balance, setBalance] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const [showForm, setShowForm] =
        useState(false);

    const [employee, setEmployee] = 
        useState(null);

    const [showChangePassword, setShowChangePassword] =
        useState(false);

    const [currentPassword, setCurrentPassword] =
        useState("");

    const [newPassword, setNewPassword] =
        useState("");

    const [confirmPassword, setConfirmPassword] =
        useState("");

    const [passwordMessage, setPasswordMessage] =
        useState("");

    const [passwordError, setPasswordError] =
        useState("");

    const [changingPassword, setChangingPassword] =
        useState(false);

    useEffect(() => {
        if (!currentUser?.employeeNumber) {
            return;
        }

        loadDashboard();
    }, [currentUser]);

    async function handleChangePassword(event) {
        event.preventDefault();

        setPasswordMessage("");
        setPasswordError("");

        if (newPassword !== confirmPassword) {
            setPasswordError(
                "New passwords do not match."
            );
            return;
        }

        if (!newPassword.trim()) {
            setPasswordError(
                "New password cannot be empty."
            );
            return;
        }

        setChangingPassword(true);

        try {
            await changePassword(
                currentPassword,
                newPassword
            );

            setPasswordMessage(
                "Password changed successfully."
            );

            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");

        } catch (error) {
            console.error(error);

            setPasswordError(
                "Failed to change password. Please check your current password."
            );
        } finally {
            setChangingPassword(false);
        }
    }

    async function loadDashboard() {
        setLoading(true);
        setError("");

        try {
            const [
                employeeData,
                requestData,
                balanceData,
            ] = await Promise.all([
                getEmployee(
                    currentUser.employeeNumber
                ),
                getRequestsForEmployee(
                    currentUser.employeeNumber
                ),
                getLeaveBalance(
                    currentUser.employeeNumber
                ),
            ]);

            setEmployee(employeeData);
            setLeaveRequests(requestData);
            setBalance(balanceData);
        } catch (error) {
            console.error(error);
            setError(
                "Failed to load your leave information."
            );
        } finally {
            setLoading(false);
        }
    }

    const firstName =
        employee?.employeeName
            ?.split(" ")[0];

    const recentRequests =
        [...leaveRequests]
            .sort(
                (a, b) =>
                    new Date(b.submittedOn) -
                    new Date(a.submittedOn)
            )
            .slice(0, 5);

    const total =
        balance
            ? Number(balance.vacationCredit || 0) +
              Number(balance.sickCredit || 0) +
              Number(balance.soloParentCredit || 0) +
              Number(balance.maternalPaternalCredit || 0)
            : 0;

    const used =
        balance
            ? Number(balance.vacationUsed || 0) +
              Number(balance.sickUsed || 0) +
              Number(balance.soloParentUsed || 0) +
              Number(balance.maternalPaternalUsed || 0)
            : 0;

    const remaining =
        balance
            ? Number(balance.vacationRemaining || 0) +
              Number(balance.sickRemaining || 0) +
              Number(balance.soloParentRemaining || 0) +
              Number(balance.maternalPaternalRemaining || 0)
            : 0;

    const pending =
        leaveRequests.filter(
            (request) =>
                request.status === "PENDING"
        ).length;

    if (loading) {
        return (
            <div>
                <p className="text-sm">
                    Loading your leave information...
                </p>
            </div>
        );
    }

    return (
        <div>
            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                <div>
                    <h1 className="fj-display text-2xl font-semibold">
                        {greeting()}, {firstName}!
                    </h1>

                    <p
                        className="text-sm mt-1"
                        style={{
                            color: "var(--ink-soft)",
                        }}
                    >
                        Here's your leave overview.
                    </p>
                </div>

                <button
                    onClick={() => setShowForm(true)}
                    className="fj-btn-primary text-sm"
                >
                    + Request Leave
                </button>
            </div>

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
                    value={total}
                    label="Total Leave Entitlement"
                />

                <LeaveSummaryCard
                    value={used}
                    label="Used"
                />

                <LeaveSummaryCard
                    value={remaining}
                    label="Remaining"
                    accent="var(--cyan-deep)"
                />

                <LeaveSummaryCard
                    value={pending}
                    label="Pending Requests"
                    accent="var(--gold-deep)"
                />
            </div>

            <h2 className="fj-display text-lg font-semibold mb-3">
                Recent Leave Requests
            </h2>

            <LeaveRequestTable
                requests={recentRequests}
            />

            {showForm && (
                <LeaveRequestForm
                    remainingBalance={remaining}
                    onCancel={() =>
                        setShowForm(false)
                    }
                    onSubmit={async (data) => {
                        console.log(
                            "Leave request submission will be connected next:",
                            data
                        );

                        setShowForm(false);
                    }}
                />
            )}
            <div className="fj-card p-6 mt-8 max-w-2xl">
                <h2 className="fj-display text-lg font-semibold mb-1">
                    Account Security
                </h2>

                <p
                    className="text-sm mb-5"
                    style={{
                        color: "var(--ink-soft)",
                    }}
                >
                    Change your password to keep your account secure.
                </p>

                {!showChangePassword ? (
                    <button
                        type="button"
                        className="fj-btn-secondary"
                        onClick={() => {
                            setShowChangePassword(true);
                            setPasswordMessage("");
                            setPasswordError("");
                        }}
                    >
                        Change Password
                    </button>
                ) : (
                    <form
                        onSubmit={handleChangePassword}
                        className="space-y-4"
                    >
                        <div>
                            <label className="lms-field-label">
                                Current Password
                            </label>

                            <input
                                type="password"
                                className="lms-field-input w-full"
                                value={currentPassword}
                                onChange={(e) =>
                                    setCurrentPassword(e.target.value)
                                }
                                required
                            />
                        </div>

                        <div>
                            <label className="lms-field-label">
                                New Password
                            </label>

                            <input
                                type="password"
                                className="lms-field-input w-full"
                                value={newPassword}
                                onChange={(e) =>
                                    setNewPassword(e.target.value)
                                }
                                required
                            />
                        </div>

                        <div>
                            <label className="lms-field-label">
                                Confirm New Password
                            </label>

                            <input
                                type="password"
                                className="lms-field-input w-full"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                required
                            />
                        </div>

                        {passwordError && (
                            <p className="text-sm">
                                {passwordError}
                            </p>
                        )}

                        {passwordMessage && (
                            <p className="text-sm">
                                {passwordMessage}
                            </p>
                        )}

                        <div className="flex gap-3">
                            <button
                                type="submit"
                                className="fj-btn-primary"
                                disabled={changingPassword}
                            >
                                {changingPassword
                                    ? "Changing..."
                                    : "Change Password"}
                            </button>

                            <button
                                type="button"
                                className="fj-btn-secondary"
                                onClick={() => {
                                    setShowChangePassword(false);
                                    setCurrentPassword("");
                                    setNewPassword("");
                                    setConfirmPassword("");
                                    setPasswordError("");
                                    setPasswordMessage("");
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}

export default DashboardPage;