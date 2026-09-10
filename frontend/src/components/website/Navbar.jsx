import { useState } from "react";

import Container from "../common/Container";
import { NAV_LINKS } from "../../data/website/navigation";

function Navbar({ page, setPage }) {
  const [open, setOpen] = useState(false);

  const go = (key) => {
    setPage(key);
    setOpen(false);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  return (
    <header className="sticky top-0 z-40 border-b fj-hairline" style={{ background: "rgba(255,251,243,0.95)", backdropFilter: "blur(6px)" }}>
      <Container className="flex items-center justify-between py-4">
        <button onClick={() => go("home")} className="flex items-center gap-2.5" aria-label="5Joys, go to home">
          <span
            aria-hidden="true"
            className="inline-flex h-9 px-2.5 items-center justify-center fj-display font-semibold text-base"
            style={{ background: "var(--red)", color: "var(--gold)", borderRadius: "10px" }}
          >
            5<span style={{ color: "var(--cyan)" }}>JOYS</span>
          </span>
        </button>

        <nav className="hidden lg:flex items-center gap-8" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <button key={link.key} onClick={() => go(link.key)} className="fj-nav-link text-sm" data-active={page === link.key}>
              {link.label}
            </button>
          ))}
        </nav>

        <button onClick={() => go("lms-login")} className="fj-btn-primary hidden lg:inline-flex text-sm">
          Login
        </button>

        <button
          className="lg:hidden inline-flex flex-col justify-center gap-1.5 h-10 w-10"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span style={{ height: 3, borderRadius: 2, background: "var(--ink)", transform: open ? "translateY(6px) rotate(45deg)" : "none", transition: "transform 120ms ease" }} />
          <span style={{ height: 3, borderRadius: 2, background: "var(--ink)", opacity: open ? 0 : 1 }} />
          <span style={{ height: 3, borderRadius: 2, background: "var(--ink)", transform: open ? "translateY(-6px) rotate(-45deg)" : "none", transition: "transform 120ms ease" }} />
        </button>
      </Container>

      {open && (
        <div className="lg:hidden border-t fj-hairline" style={{ background: "var(--surface)" }}>
          <Container className="py-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.key}
                onClick={() => go(link.key)}
                className="text-left py-2.5 text-base font-bold"
                style={{ color: page === link.key ? "var(--ink)" : "var(--ink-soft)" }}
              >
                {link.label}
              </button>
            ))}
            <button onClick={() => go("careers")} className="fj-btn-primary justify-center mt-3 text-sm">
              View Careers
            </button>
          </Container>
        </div>
      )}
    </header>
  );
}

export default Navbar;