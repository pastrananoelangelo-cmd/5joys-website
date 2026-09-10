import { get, put } from "./apiClient";

export function getLeaveBalance(employeeNumber) {
  return get(`/leave-balances/${employeeNumber}`);
}

export function updateLeaveBalance(employeeNumber, data) {
  return put(`/leave-balances/${employeeNumber}`, data);
}