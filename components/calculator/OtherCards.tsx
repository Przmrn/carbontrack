// The optional "Other" group: five technical sub-cards, collapsed by default.
"use client";

import { useState } from "react";
import type { ActivityRow, CalculatorState } from "../../lib/calculator";
import { formatAmount, formatFactor, formatKg } from "../../lib/format";
import { intlLocale } from "../../lib/i18n";
import { useLanguage } from "../LanguageProvider";
import AmountField from "./AmountField";
import CalculationDetail, { type DetailLine } from "./CalculationDetail";
import CardShell from "./CardShell";

type OtherKey = "district" | "cloud" | "freight" | "r410a" | "hfc134a";

const OTHER_KEYS: OtherKey[] = ["district", "cloud", "freight", "r410a", "hfc134a"];

function valueOf(state: CalculatorState, key: OtherKey): number {
  switch (key) {
    case "district":
      return state.districtMj;
    case "cloud":
      return state.cloudVcpuHrs;
    case "freight":
      return state.freightTonneKm;
    case "r410a":
      return state.r410aKg;
    case "hfc134a":
      return state.hfc134aKg;
  }
}

function patchOf(key: OtherKey, value: number): Partial<CalculatorState> {
  switch (key) {
    case "district":
      return { districtMj: value };
    case "cloud":
      return { cloudVcpuHrs: value };
    case "freight":
      return { freightTonneKm: value };
    case "r410a":
      return { r410aKg: value };
    case "hfc134a":
      return { hfc134aKg: value };
  }
}

function rowIdOf(key: OtherKey): ActivityRow["id"] {
  switch (key) {
    case "district":
      return "districtMj";
    case "cloud":
      return "cloudVcpuHrs";
    case "freight":
      return "freightTonneKm";
    case "r410a":
      return "r410aKg";
    case "hfc134a":
      return "hfc134aKg";
  }
}

interface OtherCardsProps {
  state: CalculatorState;
  rows: ActivityRow[];
  onPatch: (patch: Partial<CalculatorState>) => void;
}

export default function OtherCards({ state, rows, onPatch }: OtherCardsProps) {
  const { lang, copy } = useLanguage();
  const cards = copy.calculator.cards.lainnya;
  const locale = intlLocale(lang);
  const [ada, setAda] = useState<Record<OtherKey, boolean>>(() => {
    const initial = {} as Record<OtherKey, boolean>;
    for (const key of OTHER_KEYS) initial[key] = valueOf(state, key) > 0;
    return initial;
  });
  const [open, setOpen] = useState<boolean>(OTHER_KEYS.some((key) => valueOf(state, key) > 0));

  function toggle(key: OtherKey, next: boolean): void {
    setAda((previous) => ({ ...previous, [key]: next }));
    if (!next) onPatch(patchOf(key, 0));
  }

  return (
    <details
      className="cal-other"
      open={open}
      onToggle={(event) => setOpen(event.currentTarget.open)}
    >
      <summary>
        <span className="cal-other-title">{cards.title}</span>
        <span className="cal-other-hint">{cards.help}</span>
      </summary>
      <div className="cal-other-body">
        {OTHER_KEYS.map((key) => {
          const row = rows.find((item) => item.id === rowIdOf(key));
          const value = valueOf(state, key);
          const lines: DetailLine[] =
            row !== undefined && row.factor !== null
              ? [
                  {
                    key,
                    row,
                    working: `${formatAmount(value, locale)} ${cards[key].unit} × ${formatFactor(row.factor.value, locale)} ${row.factor.unit} = ${formatKg(row.kg, locale)} kg`,
                  },
                ]
              : [];
          return (
            <CardShell
              key={key}
              id={`lainnya-${key}`}
              title={cards[key].title}
              help={cards[key].hint}
              ada={ada[key]}
              onAdaChange={(next) => toggle(key, next)}
              resultKg={value > 0 ? (row?.kg ?? 0) : null}
              detail={<CalculationDetail lines={lines} />}
            >
              <div className="cal-fields">
                <AmountField
                  key={`${key}-${lang}`}
                  id={`lainnya-${key}-value`}
                  label={cards[key].title}
                  unit={cards[key].unit}
                  value={value}
                  onChange={(next) => onPatch(patchOf(key, next ?? 0))}
                />
              </div>
            </CardShell>
          );
        })}
      </div>
    </details>
  );
}
