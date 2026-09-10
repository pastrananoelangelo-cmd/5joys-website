import Container from "./Container";

function Section({ id, children, tone = "paper" }) {
  const bg = tone === "surface" ? "var(--surface)" : "var(--paper)";
  return (
    <section id={id} style={{ background: bg }} className="py-16 md:py-24 border-t fj-hairline">
      <Container>{children}</Container>
    </section>
  );
}

export default Section;