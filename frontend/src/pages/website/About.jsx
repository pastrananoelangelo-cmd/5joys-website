import Section from "../../components/common/Section";
import SectionHeading from "../../components/common/SectionHeading";

function AboutPage() {
  const services = [
    "Everyday Groceries & Snacks",
    "Hot & Cold Ready-to-Eat Food",
    "Bill Payment & E-Load Services",
    "24-Hour Store Availability",
    "Franchise Partnership Support",
  ];

  return (
    <Section tone="surface">
      <SectionHeading
        tag="About Us"
        title="A neighborhood store, built to grow neighborhood by neighborhood"
        intro="5Joys is a convenience store chain serving everyday errands across the Philippines — the quick stop for a snack, a bill payment, or something forgotten on the grocery list."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6 text-base leading-relaxed" style={{ color: "var(--ink-soft)" }}>
          <div>
            <h3 className="fj-display text-xl font-semibold" style={{ color: "var(--ink)" }}>Our history</h3>
            <p className="mt-3">
              5Joys opened its first store on Makati Avenue in 2011 with a simple goal: make the quick
              errand a little easier and a little friendlier. What started as one 24-hour storefront grew
              store by store into a network across Metro Manila, then into Cebu and Davao as more
              neighborhoods asked for a 5Joys of their own. We still run every store the same way we ran
              the first one — fully stocked, fast at the counter, and staffed by people who know their
              regulars.
            </p>
          </div>

          <div>
            <h3 className="fj-display text-xl font-semibold" style={{ color: "var(--ink)" }}>What we do</h3>
            <p className="mt-3">
              We operate and franchise convenience stores stocked with everyday essentials, snacks, and
              ready-to-eat food, alongside bill payment and e-load services that keep customers coming back
              for more than just the shelf. Every store is supported by the same head-office team on
              merchandising, logistics, and store operations.
            </p>
          </div>
        </div>

        <div className="fj-card p-6 h-fit">
          <p className="text-xs font-extrabold uppercase tracking-wider mb-4" style={{ color: "var(--cyan-deep)" }}>What's In Store</p>
          <ul className="space-y-3">
            {services.map((s) => (
              <li key={s} className="text-sm pb-3 border-b fj-hairline last:border-0 last:pb-0">{s}</li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

export default AboutPage;