function Smile({ color = "var(--gold)", width = 72 }) {
  return (
    <svg width={width} height={width / 3} viewBox="0 0 72 24" fill="none" aria-hidden="true">
      <path d="M2 4C14 20 58 20 70 4" stroke={color} strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

export default Smile;