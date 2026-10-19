// One numeric field: locale-aware parsing, a "reads as" line, no spinners.
// The parent remounts it (via key) when period, unit or language changes, so
// the text always starts from the stored value.
"use client";

import { useState } from "react";
import { formatAmount } from "../../lib/format";
import { intlLocale } from "../../lib/i18n";
import { parseAmount } from "../../lib/units";
import { useLanguage } from "../LanguageProvider";

interface AmountFieldProps {
  id: string;
  label: string;
  unit: string;
  /** Display value in the field's own unit (0 when nothing is entered). */
  value: number;
  onChange: (value: number | null) => void;
  autoFocus?: boolean;
}

export default function AmountField({
  id,
  label,
  unit,
  value,
  onChange,
  autoFocus,
}: AmountFieldProps) {
  const { lang, copy } = useLanguage();
  const locale = intlLocale(lang);
  const [text, setText] = useState(() => (value > 0 ? formatAmount(value, locale) : ""));
  const parsed = parseAmount(text, lang);

  const empty = text.trim() === "";
  const showError = !empty && !parsed.ok;
  const message = showError
    ? parsed.reason === "negative"
      ? copy.calculator.cards.negative
      : copy.calculator.cards.invalid
    : !empty && parsed.ok
      ? `${copy.calculator.cards.readBack}: ${formatAmount(parsed.value, locale)} ${unit}`
      : "\u00A0";

  function handleChange(next: string): void {
    setText(next);
    const result = parseAmount(next, lang);
    onChange(result.ok ? result.value : null);
  }

  return (
    <div className="cal-field">
      <label htmlFor={id}>{label}</label>
      <div className="cal-field-box">
        <input
          id={id}
          type="text"
          inputMode="decimal"
          autoComplete="off"
          enterKeyHint="done"
          value={text}
          autoFocus={autoFocus}
          aria-invalid={showError || undefined}
          aria-describedby={`${id}-read`}
          onChange={(event) => handleChange(event.target.value)}
        />
        <span className="cal-field-unit">{unit}</span>
      </div>
      <p
        id={`${id}-read`}
        className={showError ? "cal-field-read is-error" : "cal-field-read"}
        aria-live="polite"
      >
        {message}
      </p>
    </div>
  );
}
