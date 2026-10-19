// Slider primitive: flat track, square thumb, live mono value at right.
import { formatAmount } from "../../lib/format";

interface SliderProps {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  onChange: (value: number) => void;
}

export default function Slider({ id, label, value, min, max, step, unit, onChange }: SliderProps) {
  return (
    <div className="cm-slider">
      <div className="cm-slider-head">
        <label htmlFor={id} className="t-label-caps">
          {label}
        </label>
        <span className="cm-slider-value tnum">
          {formatAmount(value)} {unit}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </div>
  );
}
