// Formula block: clean monospace maths (swap internals for KaTeX when back online).
interface FormulaProps {
  label: string;
  tex: string;
}

export default function Formula({ label, tex }: FormulaProps) {
  return (
    <div className="method-formula">
      <p className="t-label-code">{label}</p>
      <pre className="tnum" aria-label={tex}>
        {tex}
      </pre>
    </div>
  );
}
