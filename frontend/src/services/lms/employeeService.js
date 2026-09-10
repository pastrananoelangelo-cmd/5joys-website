import { get, post, put, remove } from "./apiClient";

export function getEmployees() {
  return get("/employees");
}

export function getEmployee(employeeNumber) {
  return get(`/employees/${employeeNumber}`);
}

export function createEmployee(employee) {
  return post("/employees", employee);
}

export function updateEmployee(employeeNumber, employee) {
  return put(`/employees/${employeeNumber}`, employee);
}

export function deleteEmployee(employeeNumber) {
  return remove(`/employees/${employeeNumber}`);
}

export function getSensitiveEmployee(employeeNumber) {
  return get(`/employees/${employeeNumber}/sensitive`);
}

export function updateSensitiveEmployee(
  employeeNumber,
  sensitiveData
) {
  return put(
    `/employees/${employeeNumber}/sensitive`,
    sensitiveData
  );
}