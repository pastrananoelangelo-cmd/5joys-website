// Mock identity data for the LMS prototype.
// Swap MOCK_USERS / EMPLOYEES for real API responses once Spring Security
// issues real sessions — everything downstream reads through leaveService,
// so no component here needs to change.

export const ROLES = {
  EMPLOYEE: "EMPLOYEE",
  HR: "HR",
};

// The two demo identities the login page lets you sign in as.
export const MOCK_USERS = {
  employee: {
    id: "EMP-1042",
    name: "Juan Dela Cruz",
    role: ROLES.EMPLOYEE,
    department: "Store Operations",
    position: "Store Crew",
    email: "juan.delacruz@5joys.example",
    dateHired: "2023-03-14",
  },
  hr: {
    id: "EMP-2005",
    name: "Maria Santos",
    role: ROLES.HR,
    department: "Human Resources",
    position: "HR Manager",
    email: "maria.santos@5joys.example",
    dateHired: "2019-06-02",
  },
};

// Employee directory — used by the HR "Employees" page and to resolve
// department names on leave requests.
export const EMPLOYEES = [
  { id: "EMP-1042", name: "Juan Dela Cruz", department: "Store Operations", position: "Store Crew" },
  { id: "EMP-1108", name: "Maria Clara Santos", department: "Chow Kusina — Store Operations", position: "Store Supervisor" },
  { id: "EMP-1156", name: "Pedro Reyes", department: "Grill Fiesta — Operations", position: "Area Operations Manager" },
  { id: "EMP-1203", name: "Angela Cruz", department: "Corporate Marketing", position: "Brand Marketing Officer" },
  { id: "EMP-1240", name: "Ramon Bautista", department: "Group Supply Chain", position: "Commissary Coordinator" },
  { id: "EMP-2005", name: "Maria Santos", department: "Human Resources", position: "HR Manager" },
];

// Leave entitlement per employee for the current year. In production this
// comes from the HR system; here it's a flat mock table.
export const LEAVE_BALANCES = {
  "EMP-1042": { entitlement: 15, used: 5 },
  "EMP-1108": { entitlement: 15, used: 9 },
  "EMP-1156": { entitlement: 18, used: 4 },
  "EMP-1203": { entitlement: 15, used: 2 },
  "EMP-1240": { entitlement: 15, used: 12 },
  "EMP-2005": { entitlement: 20, used: 6 },
};
