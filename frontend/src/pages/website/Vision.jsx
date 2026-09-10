import Section from "../../components/common/Section";
import SectionHeading from "../../components/common/SectionHeading";
import SectionTag from "../../components/common/SectionTag";
import ValueCard from "../../components/website/ValueCard";

import { VALUES } from "../../data/website/values";

const MISSION_POINTS = [
  "To bring superior food products and deliver exceptional dining experience to our customers at all time.",
  "To foster a dynamic work environment, championing excellence, integrity, and team work for collective success.",
  "To be a trailblazer in market expansion, achieving and sustaining profitability while creating lasting value for our company and the communities we serve.",
];

function VisionPage() {
  return (
    <Section tone="surface">
      <SectionHeading tag="Vision, Mission & Values" title="What guides every store" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-14 items-stretch">
        {/* Vision — kept as one prominent statement */}
        <div
          className="fj-card p-7 flex flex-col justify-center h-full"
          style={{ background: "var(--red)", borderColor: "var(--red)" }}
        >
          <p className="fj-tag mb-3 w-fit" style={{ background: "rgba(255,255,255,0.15)", color: "var(--gold)" }}>
            Vision
          </p>
          <p className="fj-display text-xl md:text-2xl font-semibold leading-snug text-white">
            We aim to become the most successful JFC franchise group in terms of store network expansion and
            achievements by 2034.
          </p>
        </div>

        {/* Mission — three distinct points, smaller supporting text, visually separated */}
        <div
          className="fj-card p-7 flex flex-col h-full"
          style={{ background: "var(--cyan)", borderColor: "var(--cyan)" }}
        >
          <p className="fj-tag mb-4 w-fit" style={{ background: "rgba(255,255,255,0.25)", color: "#0B4A56" }}>
            Mission
          </p>

          <div className="flex-1 flex flex-col justify-center divide-y" style={{ borderColor: "rgba(11,74,86,0.18)" }}>
            {MISSION_POINTS.map((point, i) => (
              <div key={i} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
                <span
                  className="fj-display text-xs font-bold shrink-0 mt-0.5 w-5"
                  style={{ color: "#0B4A56" }}
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-sm md:text-base leading-relaxed font-medium" style={{ color: "#0B4A56" }}>
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <SectionTag>Our eight core values</SectionTag>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-4">
        {VALUES.map((v, i) => (
          <ValueCard key={v.title} index={i} title={v.title} body={v.body} />
        ))}
      </div>
    </Section>
  );
}

export default VisionPage;