// Number input primitive: label above, mono value, static unit at right.
import { validateAmount } from "../../lib/emissions";

interface NumberInputProps {
  id: string;
  label: string;
  value: number;
  min?: number;
  max?: number;
  step?: number | string;
  unit?: string;
  help?: string;
  onChange: (value: number) => void;
}

export default function NumberInput({
  id,
  label,
  value,
  min = 0,
  max,
  step = "any",
  unit,
  help,
  onChange,
}: NumberInputProps) {
  return (
    <div className="cm-field">
      <label htmlFor={id} className="t-label-caps">
        {label}
      </label>
      <div className="cm-number-wrap">
        <input
          id={id}
          type="number"
          className="tnum"
          min={min}
          max={max}
          step={step}
          value={Number.isFinite(value) ? value : 0}
          onChange={(event) => {
            const parsed = validateAmount(event.target.value);
            onChange(parsed.ok ? parsed.value : 0);
          }}
        />
        {unit ? <span className="t-label-code">{unit}</span> : null}
      </div>
      {help ? <p className="t-label-code cm-help">{help}</p> : null}
    </div>
  );
}
