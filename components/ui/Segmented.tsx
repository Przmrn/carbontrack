// Segmented toggle primitive: bordered row, selected is solid ink.
interface SegmentedProps {
  label: string;
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
}

export default function Segmented({ label, options, value, onChange }: SegmentedProps) {
  return (
    <div className="cm-segmented" role="group" aria-label={label}>
      {options.map((option) => (
        <button
          key={option}
          type="button"
          aria-pressed={value === option}
          onClick={() => onChange(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
