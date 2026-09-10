import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { useLms } from "../../context/LmsContext";

function DashboardLayout({ page, onNavigate, children }) {
  const { currentUser } = useLms();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="lms-shell">
      <Sidebar page={page} onNavigate={onNavigate} open={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />

      <div className="lms-main">
        <header className="lms-topbar">
          <div className="flex items-center gap-3">
            <button
              className="lms-menu-button"
              aria-label="Open navigation"
              onClick={() => setMobileNavOpen(true)}
            >
              <span aria-hidden="true" style={{ fontSize: "1.3rem" }}>☰</span>
            </button>
            <span className="fj-display font-semibold hidden sm:inline">Leave Management System</span>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="text-right hidden sm:block">
              <div className="text-sm font-bold">{currentUser?.name}</div>
              <div className="text-xs" style={{ color: "var(--ink-soft)" }}>{currentUser?.position}</div>
            </div>
            <span
              aria-hidden="true"
              className="inline-flex h-9 w-9 items-center justify-center fj-display font-semibold text-sm"
              style={{ background: "var(--paper)", border: "1px solid var(--line)", borderRadius: "999px" }}
            >
              {currentUser?.name?.charAt(0)}
            </span>
          </div>
        </header>

        <div className="lms-content">{children}</div>
      </div>
    </div>
  );
}

export default DashboardLayout;
