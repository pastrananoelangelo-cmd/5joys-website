import {
    get,
    put,
    postFile,
} from "./apiClient";

import { getEmployees  } from "./employeeService";

export function archiveLeaveRequests() {
  return postFile(
    "/leave-requests/archive",
    {}
  );
}

export async function getAllLeaveRequests() {
    const employees = await getEmployees();

    const requestGroups = await Promise.all(
        employees.map((employee) =>
            get(
                `/leave-requests?employeeNumber=${encodeURIComponent(
                    employee.employeeNumber
                )}`
            )
        )
    );

    return requestGroups.flat();
}

export function filterLeaveRequests(
    requests,
    employees,
    {
        status,
        leaveType,
        storeAssignment,
    }
) {
    return requests.filter((request) => {

        const matchesStatus =
            status === "ALL" ||
            request.status === status;

        const matchesLeaveType =
            leaveType === "ALL" ||
            request.leaveType === leaveType;

        const employee =
            employees.find(
                (employee) =>
                    employee.employeeNumber ===
                    request.employeeNumber
            );

        const matchesStore =
            storeAssignment === "ALL" ||
            employee?.storeAssignment ===
                storeAssignment;

        return (
            matchesStatus &&
            matchesLeaveType &&
            matchesStore
        );
    });
}

export function getHRSummary(requests) {
    const currentMonth =
        new Date().getMonth();

    const currentYear =
        new Date().getFullYear();

    const approvedThisMonth =
        requests.filter((request) => {

            if (request.status !== "APPROVED") {
                return false;
            }

            if (!request.decidedOn) {
                return false;
            }

            const date =
                new Date(request.decidedOn);

            return (
                date.getMonth() === currentMonth &&
                date.getFullYear() === currentYear
            );
        }).length;

    const rejectedThisMonth =
        requests.filter((request) => {

            if (request.status !== "REJECTED") {
                return false;
            }

            if (!request.decidedOn) {
                return false;
            }

            const date =
                new Date(request.decidedOn);

            return (
                date.getMonth() === currentMonth &&
                date.getFullYear() === currentYear
            );
        }).length;

    const pending =
        requests.filter(
            (request) =>
                request.status === "PENDING"
        ).length;

    return {
        pending,
        approvedThisMonth,
        rejectedThisMonth,
        total: requests.length,
    };
}

export async function getLeaveBalance(
    employeeNumber
) {
    return get(
        `/leave-balances/${encodeURIComponent(
            employeeNumber
        )}`
    );
}

export function approveLeaveRequest(id) {
    return put(
        `/leave-requests/${id}/approve`,
        {}
    );
}

export function rejectLeaveRequest(id, rejectionReason) {
    return put(
        `/leave-requests/${id}/reject`,
        {
            rejectionReason,
        }
    );
}

export function getRequestsForEmployee(employeeNumber) {
    return get(
        `/leave-requests?employeeNumber=${encodeURIComponent(
            employeeNumber
        )}`
    );
}