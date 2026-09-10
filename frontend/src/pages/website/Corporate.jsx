import Section from "../../components/common/Section";
import SectionHeading from "../../components/common/SectionHeading";
import InfoRow from "../../components/common/InfoRow";

import { CORPORATE_INFO } from "../../data/website/corporate";

function CorporatePage() {
  return (
    <Section tone="surface">
      <SectionHeading
        tag="Corporate Information"
        title="Company details"
        intro="Registration and certification details below are placeholder data pending confirmation from the corresponding government and accreditation bodies."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <dl>
            <InfoRow label="Registered Name" value={CORPORATE_INFO.registeredName} />
            <InfoRow label="Trade Name" value={CORPORATE_INFO.tradeName} />
            <InfoRow label="Industry" value={CORPORATE_INFO.industry} />
            <InfoRow label="Established" value={CORPORATE_INFO.yearEstablished} />
            <InfoRow label="Headquarters" value={CORPORATE_INFO.headquarters} />
            <InfoRow label="Business Registration No." value={CORPORATE_INFO.businessRegistrationNo} />
            <InfoRow label="Tax Identification No." value={CORPORATE_INFO.taxIdentificationNo} />
          </dl>
        </div>

        <div className="fj-card p-6 h-fit">
          <p className="text-xs font-extrabold uppercase tracking-wider mb-4" style={{ color: "var(--cyan-deep)" }}>Certifications</p>
          <ul className="space-y-3 mb-6">
            {CORPORATE_INFO.certifications.map((c) => (
              <li key={c} className="text-sm pb-3 border-b fj-hairline last:border-0 last:pb-0" style={{ color: "var(--ink-soft)" }}>{c}</li>
            ))}
          </ul>

          <p className="text-xs font-extrabold uppercase tracking-wider mb-4" style={{ color: "var(--cyan-deep)" }}>Contact</p>
          <ul className="space-y-2 text-sm" style={{ color: "var(--ink-soft)" }}>
            <li>{CORPORATE_INFO.mainPhone}</li>
            <li>{CORPORATE_INFO.mainEmail}</li>
            <li>{CORPORATE_INFO.website}</li>
          </ul>
        </div>
      </div>
    </Section>
  );
}

export default CorporatePage;