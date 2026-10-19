// Brand logo as an inline SVG component (mirrors public/brand/c-metric-logo.svg).
export default function Logo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 160 48"
      fill="none"
      width="160"
      height="48"
      role="img"
      aria-label="C—METRIC Studio / Lab"
    >
      <rect x="0.5" y="0.5" width="47" height="47" style={{ stroke: "var(--ink)" }} strokeWidth="1.5" />
      <circle cx="24" cy="24" r="14" style={{ stroke: "var(--ink)" }} strokeWidth="1.5" />
      <line x1="24" y1="10" x2="24" y2="38" style={{ stroke: "var(--ink)" }} strokeWidth="1.5" />
      <line x1="10" y1="24" x2="38" y2="24" style={{ stroke: "var(--ink)" }} strokeWidth="1.5" />
      <circle cx="24" cy="24" r="3.5" style={{ fill: "var(--ink)" }} />
      <text
        x="58"
        y="28"
        fontFamily="'Inter', -apple-system, sans-serif"
        fontWeight="700"
        fontSize="14"
        letterSpacing="-0.04em"
        style={{ fill: "var(--ink)" }}
      >
        C—METRIC
      </text>
      <text
        x="58"
        y="39"
        fontFamily="'Inter', -apple-system, sans-serif"
        fontWeight="500"
        fontSize="8.5"
        letterSpacing="0.14em"
        style={{ fill: "var(--muted)" }}
      >
        STUDIO / LAB
      </text>
    </svg>
  );
}
