import logo from "../../assets/5Joys_with_tagline.png";
import Container from "../../components/common/Container";
import Section from "../../components/common/Section";
import SectionHeading from "../../components/common/SectionHeading";
import SectionTag from "../../components/common/SectionTag";

function HomePage({ setPage }) {
  const reasons = [
    { title: "Always Open", body: "Most stores run 24 hours, so a quick stop is never off the table." },
    { title: "Fresh Picks", body: "Snacks, drinks, and everyday essentials, checked and restocked daily." },
    { title: "Friendly Faces", body: "Crew who know their regulars and greet everyone the same way." },
    { title: "Fast Checkout", body: "In, paid, and out in minutes — no matter the hour." },
    { title: "Around the Corner", body: "New stores opening in more neighborhoods every year." },
  ];

  const quickLinks = [
    { key: "locations", title: "Our Locations", body: "Find a 5Joys near you, from Metro Manila to Mindanao." },
    { key: "vision", title: "Vision & Values", body: "The five values behind every store we run." },
    { key: "corporate", title: "Corporate Information", body: "Registration, certifications, and contact details." },
    { key: "careers", title: "Careers", body: "Open store, operations, and head office roles." },
  ];

  return (
    <>
      <section
        className="border-b fj-hairline"
        style={{ background: "var(--red)", color: "#FFFFFF" }}
      >
        <Container className="pt-16 pb-16 md:pt-24 md:pb-24 text-center">

          <img
            src={logo}
            alt="5Joys"
            className="w-48 sm:w-56 md:w-[400px] mx-auto"
          />

          <p
            className="mt-3 text-lg md:text-xl max-w-2xl mx-auto font-semibold"
            style={{ color: "var(--gold)" }}
          >
            Five reasons to smile, every time you stop by.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setPage("about")}
              className="fj-btn-primary-onred"
            >
              Learn More
            </button>

            <button
              onClick={() => setPage("careers")}
              className="fj-btn-secondary-onred"
            >
              View Careers
            </button>
          </div>

        </Container>
      </section>

      <Section tone="surface">
        <SectionHeading tag="Why 5Joys" title="Five reasons customers keep coming back" align="center" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {reasons.map((r, i) => (
            <div key={r.title} className="fj-card p-5 text-center">
              <p className="fj-display text-2xl font-semibold" style={{ color: "var(--red)" }}>{i + 1}</p>
              <h3 className="fj-display font-semibold text-base mt-2">{r.title}</h3>
              <p className="mt-2 text-sm" style={{ color: "var(--ink-soft)" }}>{r.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionTag>Where to go next</SectionTag>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-4">
          {quickLinks.map((q) => (
            <button key={q.key} onClick={() => setPage(q.key)} className="fj-card p-6 text-left">
              <h3 className="fj-display font-semibold text-base">{q.title}</h3>
              <p className="mt-2 text-sm" style={{ color: "var(--ink-soft)" }}>{q.body}</p>
              <span className="mt-4 inline-block text-sm font-extrabold" style={{ color: "var(--red)" }}>View &rarr;</span>
            </button>
          ))}
        </div>
      </Section>
    </>
  );
}

export default HomePage;