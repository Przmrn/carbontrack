// Procedural barcode: deterministic SVG bars derived from a code string.
interface BarcodeProps {
  code: string;
}

export default function Barcode({ code }: BarcodeProps) {
  const bars: { x: number; w: number }[] = [];
  let cursor = 0;
  for (let i = 0; i < code.length; i++) {
    const width = 1 + (code.charCodeAt(i) % 3);
    bars.push({ x: cursor, w: width });
    cursor += width + 1 + (i % 2);
  }
  return (
    <svg
      className="struk-barcode"
      viewBox={`0 0 ${cursor} 48`}
      role="img"
      aria-label={`Barcode ${code}`}
    >
      {bars.map((bar, index) => (
        <rect key={index} x={bar.x} y={0} width={bar.w} height={48} fill="var(--ink)" />
      ))}
    </svg>
  );
}
