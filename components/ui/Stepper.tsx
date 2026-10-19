// Stepper primitive: square [-] n [+] controls, 44px touch targets.
import { en } from "../../content/en";

interface StepperProps {
  label: string;
  sub?: string;
  value: number;
  onChange: (value: number) => void;
  max?: number;
  decreaseLabel?: string;
  increaseLabel?: string;
}

export default function Stepper({
  label,
  sub,
  value,
  onChange,
  max = 99,
  decreaseLabel = en.common.decrease,
  increaseLabel = en.common.increase,
}: StepperProps) {
  return (
    <div className="cm-stepper">
      <div className="cm-stepper-text">
        <span className="cm-stepper-label">{label}</span>
        {sub ? <span className="t-label-code">{sub}</span> : null}
      </div>
      <div className="cm-stepper-controls">
        <button
          type="button"
          aria-label={`${decreaseLabel} ${label}`}
          onClick={() => onChange(Math.max(0, value - 1))}
        >
          −
        </button>
        <span aria-live="polite" className="tnum">
          {value}
        </span>
        <button
          type="button"
          aria-label={`${increaseLabel} ${label}`}
          onClick={() => onChange(Math.min(max, value + 1))}
        >
          +
        </button>
      </div>
    </div>
  );
}
