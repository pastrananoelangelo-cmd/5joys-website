import Container from "../common/Container";

import { NAV_LINKS } from "../../data/website/navigation";
import { LOCATIONS } from "../../data/website/locations";
import { CORPORATE_INFO } from "../../data/website/corporate";

function Footer({ setPage }) {
  const go = (key) => {
    setPage(key);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  return (
    <footer style={{ background: "var(--red)", color: "#FCEADD" }}>
      <Container className="py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-1">
          <p className="fj-display font-semibold text-lg" style={{ color: "var(--gold)" }}>5Joys</p>
          <p className="mt-3 text-sm leading-relaxed" style={{ color: "#F6D0C3" }}>
            Your neighborhood store, open when you need it and quick to get you back out the door.
          </p>
          <div className="flex gap-3 mt-5" aria-label="Social media">
            {["Facebook", "Instagram", "TikTok"].map((s) => (
              <span key={s} className="text-xs font-bold px-2.5 py-1.5 border rounded-full" style={{ borderColor: "#C9584A", color: "#F6D0C3" }}>
                {s}
              </span>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-extrabold uppercase tracking-widest" style={{ color: "var(--gold)" }}>Navigate</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.key}>
                <button onClick={() => go(link.key)} className="hover:text-white" style={{ color: "#F6D0C3" }}>
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-extrabold uppercase tracking-widest" style={{ color: "var(--gold)" }}>Locations</p>
          <ul className="mt-4 space-y-2.5 text-sm" style={{ color: "#F6D0C3" }}>
            {LOCATIONS.map((loc) => (
              <li key={loc.id}>{loc.city}</li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-extrabold uppercase tracking-widest" style={{ color: "var(--gold)" }}>Contact</p>
          <ul className="mt-4 space-y-2.5 text-sm" style={{ color: "#F6D0C3" }}>
            <li>{CORPORATE_INFO.mainPhone}</li>
            <li>{CORPORATE_INFO.mainEmail}</li>
            <li>{CORPORATE_INFO.website}</li>
          </ul>
        </div>
      </Container>

      <div className="border-t" style={{ borderColor: "#C9584A" }}>
        <Container className="py-5 flex flex-col md:flex-row gap-2 md:gap-0 items-center justify-between">
          <p className="text-xs" style={{ color: "#F0BBA9" }}>
            © {new Date().getFullYear()} {CORPORATE_INFO.registeredName}. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: "#F0BBA9" }}>
            Sample content for demonstration purposes.
          </p>
        </Container>
      </div>
    </footer>
  );
}

export default Footer;