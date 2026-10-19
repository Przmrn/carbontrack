// Card: gas. kWh by default, MMBtu behind the advanced toggle.
"use client";

import { useState } from "react";
import type { ActivityRow, CalculatorState } from "../../lib/calculator";
import { MMBTU_TO_KWH, gasKwhOf } from "../../lib/calculator";
import { formatAmount, formatFactor, formatKg } from "../../lib/format";
import { intlLocale } from "../../lib/i18n";
import { fromAnnual, toAnnual, type Period } from "../../lib/units";
import { useLanguage } from "../LanguageProvider";
import AmountField from "./AmountField";
import CalculationDetail, { type DetailLine } from "./CalculationDetail";
import CardShell from "./CardShell";
import Segmented from "../ui/Segmented";

export interface GasCardProps {
  state: CalculatorState;
  rows: ActivityRow[];
  onPatch: (patch: Partial<CalculatorState>) => void;
  ada: boolean;
  onAdaChange: (next: boolean) => void;
}

export default function GasCard({ state, rows, onPatch, ada, onAdaChange }: GasCardProps) {
  const { lang, copy } = useLanguage();
  const cards = copy.calculator.cards;
  const locale = intlLocale(lang);
  const [period, setPeriod] = useState<Period>("month");

  const gas = rows.find((row) => row.id === "gasAmount");
  const factor = gas?.factor ?? null;
  const mmbtu = state.gasUnit === "MMBTU";
  const unit = cards.gas.units[mmbtu ? 1 : 0];
  const fieldValue = fromAnnual(state.gasAmount, period);
  const annualKwh = gasKwhOf(state);
  const source = mmbtu
    ? `${formatAmount(fieldValue, locale)} MMBtu${
        period === "month" ? " × 12" : ""
      } → ${formatAmount(annualKwh, locale)} kWh`
    : `${formatAmount(fieldValue, locale)} kWh${period === "month" ? " × 12" : ""}`;
  const lines: DetailLine[] =
    gas !== undefined
      ? [
          {
            key: "gas",
            row: gas,
            working: `${source} × ${formatFactor(factor?.value ?? 0, locale)} kg CO₂e/kWh = ${formatKg(gas.kg, locale)} kg`,
          },
        ]
      : [];

  return (
    <CardShell
      id="gas"
      title={cards.gas.title}
      help={cards.gas.help}
      ada={ada}
      onAdaChange={onAdaChange}
      resultKg={state.gasAmount > 0 ? (gas?.kg ?? 0) : null}
      detail={<CalculationDetail lines={lines} />}
    >
      <div className="cal-fields">
        <AmountField
          key={`${period}-${state.gasUnit}-${lang}`}
          id="gas-value"
          label={cards.gas.field}
          unit={unit}
          value={fieldValue}
          onChange={(value) =>
            onPatch({ gasAmount: value === null ? 0 : toAnnual(value, period) })
          }
        />
        <div className="cal-period">
          <Segmented
            label={cards.periodLabel}
            options={cards.periods}
            value={period === "month" ? cards.periods[0] : cards.periods[1]}
            onChange={(value) => setPeriod(value === cards.periods[0] ? "month" : "year")}
          />
        </div>
      </div>
      <details className="cal-advanced">
        <summary>{cards.advanced}</summary>
        <div className="cal-advanced-body">
          <div>
            <p className="cal-field-label">{cards.gas.advancedTitle}</p>
            <Segmented
              label={cards.gas.advancedTitle}
              options={cards.gas.units}
              value={unit}
              onChange={(value) => {
                const next = value === cards.gas.units[1] ? "MMBTU" : "KWH";
                const kWh = gasKwhOf(state);
                onPatch({
                  gasUnit: next,
                  gasAmount: next === "MMBTU" ? kWh / MMBTU_TO_KWH : kWh,
                });
              }}
            />
            <p className="cal-help">{cards.gas.unitHelp}</p>
          </div>
        </div>
      </details>
    </CardShell>
  );
}
