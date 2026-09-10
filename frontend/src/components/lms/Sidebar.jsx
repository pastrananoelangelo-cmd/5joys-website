import React from "react";
import { useLms } from "../../context/LmsContext";

const EMPLOYEE_LINKS = [
  { key: "dashboard", label: "Dashboard" },
  { key: "my-leaves", label: "My Leaves" },
  { key: "profile", label: "Profile" },
];

const HR_LINKS = [
  { key: "hr-employees", label: "Employees" },
  { key: "hr-leave-requests", label: "Leave Requests" },
  { key: "hr-leave-records", label: "Leave Records" },
  { key: "hr-reports", label: "Reports" },
];

function Sidebar({ page, onNavigate, open, onClose }) {
  const { currentUser, logout } = useLms();
  const isHR = currentUser?.role === "HR";

  const go = (key) => {
    onNavigate(key);
    onClose?.();
  };

  return (
    <>
      <div className="lms-sidebar-backdrop" data-open={open} onClick={onClose} />
      <aside className="lms-sidebar" data-open={open}>
        <div className="lms-sidebar-brand">
          <span
            aria-hidden="true"
            style={{ background: "var(--red)", color: "var(--gold)", borderRadius: 8, padding: "0.3rem 0.5rem" }}
          >
            5<span style={{ color: "var(--cyan)" }}>JOYS</span>
          </span>
        </div>

        <nav className="flex flex-col gap-1">
          {EMPLOYEE_LINKS.map((link) => (
            <button
              key={link.key}
              className="lms-nav-link"
              data-active={page === link.key}
              onClick={() => go(link.key)}
            >
              {link.label}
            </button>
          ))}

          {isHR && (
            <>
              <div className="lms-nav-section-label">HR Section</div>
              {HR_LINKS.map((link) => (
                <button
                  key={link.key}
                  className="lms-nav-link"
                  data-active={page === link.key}
                  onClick={() => go(link.key)}
                >
                  {link.label}
                </button>
              ))}
            </>
          )}
        </nav>

        <div className="lms-sidebar-footer">
          <button
            className="lms-nav-link"
            onClick={() => {
              logout();
              onNavigate("lms-login");
            }}
          >
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
