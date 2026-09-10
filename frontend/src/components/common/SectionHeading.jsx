import Smile from "../website/Smile";
import SectionTag from "./SectionTag";

function SectionHeading({ tag, title, intro, align = "left" }) {
  const isCenter = align === "center";
  return (
    <div className={`max-w-3xl mb-10 md:mb-14 ${isCenter ? "mx-auto text-center" : ""}`}>
      <SectionTag>{tag}</SectionTag>
      <h2 className="fj-display text-3xl md:text-4xl font-semibold tracking-tight">{title}</h2>
      <div className={isCenter ? "flex justify-center" : ""}><Smile /></div>
      {intro && <p className="mt-3 text-base md:text-lg leading-relaxed" style={{ color: "var(--ink-soft)" }}>{intro}</p>}
    </div>
  );
}

export default SectionHeading;