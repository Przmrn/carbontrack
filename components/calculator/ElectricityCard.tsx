// Card: electricity. kWh in, month or year; market total plus the location
// reference that never enters the total.
"use client";

import { useState } from "react";
import { calculatorFactors } from "../../data/factors";
import type { ActivityRow, CalculatorState } from "../../lib/calculator";
import { ppaShare } from "../../lib/calculator";
import { formatAmount, formatFactor, formatKg } from "../../lib/format";
import { intlLocale } from "../../lib/i18n";
import { fromAnnual, kwhToMwh, mwhToKwh, toAnnual, type Period } from "../../lib/units";
import { useLanguage } from "../LanguageProvider";
import AmountField from "./AmountField";
import CalculationDetail, { type DetailLine } from "./CalculationDetail";
import CardShell from "./CardShell";
import Segmented from "../ui/Segmented";

const GREEN_SHARES = [0, 0.15, 0.5, 0.75, 1];
const GRID_FACTORS = calculatorFactors.filter((factor) => factor.unit === "g/kWh");

export interface ElectricityCardProps {
  state: CalculatorState;
  rows: ActivityRow[];
  onPatch: (patch: Partial<CalculatorState>) => void;
  ada: boolean;
  onAdaChange: (next: boolean) => void;
  autoFocus: boolean;
}

export default function ElectricityCard({
  state,
  rows,
  onPatch,
  ada,
  onAdaChange,
  autoFocus,
}: ElectricityCardProps) {
  const { lang, copy } = useLanguage();
  const cards = copy.calculator.cards;
  const detail = copy.calculator.detail;
  const locale = intlLocale(lang);
  const [period, setPeriod] = useState<Period>("month");

  const market = rows.find((row) => row.id === "electricityMwh" && row.variant === "market");
  const location = rows.find((row) => row.id === "electricityMwh" && row.variant === "location");
  const grid = market?.factor ?? null;
  const marketKg = market?.kg ?? 0;
  const locationKg = location?.kg ?? 0;
  const greenPct = Math.round(ppaShare(state) * 100);
  const fieldValue = fromAnnual(mwhToKwh(state.electricityMwh), period);
  const working = `${formatAmount(fieldValue, locale)} kWh${
    period === "month" ? " × 12" : ""
  } × ${formatFactor(grid?.value ?? 0, locale)} g CO₂e/kWh ÷ ${formatAmount(1000, locale)} = ${formatKg(locationKg, locale)} kg${
    greenPct > 0
      ? `; ${detail.greenShare} ${formatAmount(greenPct, locale)}% → ${formatKg(marketKg, locale)} kg`
      : ""
  }`;
  const lines: DetailLine[] =
    market !== undefined ? [{ key: "listrik", row: market, working }] : [];
  const reference =
    location !== undefined
      ? `${detail.locationLabel}: ${formatKg(location.kg, locale)} kg (${detail.locationNote})`
      : undefined;

  return (
    <CardShell
      id="listrik"
      title={cards.listrik.title}
      help={cards.listrik.help}
      ada={ada}
      onAdaChange={onAdaChange}
      resultKg={state.electricityMwh > 0 ? marketKg : null}
      detail={<CalculationDetail lines={lines} reference={reference} />}
    >
      <div className="cal-fields">
        <AmountField
          key={`${period}-${lang}`}
          id="listrik-kwh"
          label={cards.listrik.field}
          unit={cards.listrik.unit}
          value={fieldValue}
          autoFocus={autoFocus}
          onChange={(value) =>
            onPatch({ electricityMwh: value === null ? 0 : kwhToMwh(toAnnual(value, period)) })
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
          <div className="cal-select">
            <label htmlFor="listrik-grid">{cards.listrik.grid}</label>
            <select
              id="listrik-grid"
              value={state.gridId}
              onChange={(event) => onPatch({ gridId: event.target.value })}
            >
              {GRID_FACTORS.map((factor) => (
                <option key={factor.id} value={factor.id}>
                  {factor.label} — {formatFactor(factor.value, locale)} {factor.unit}
                </option>
              ))}
            </select>
            <p className="cal-help">{cards.listrik.gridHelp}</p>
          </div>
          <div>
            <p className="cal-field-label">{cards.listrik.green}</p>
            <Segmented
              label={cards.listrik.green}
              options={cards.listrik.greenLevels}
              value={cards.listrik.greenLevels[Math.max(0, GREEN_SHARES.indexOf(ppaShare(state)))]}
              onChange={(value) => {
                const index = cards.listrik.greenLevels.indexOf(value);
                onPatch({ ppa: GREEN_SHARES[Math.max(0, index)] });
              }}
            />
            <p className="cal-help">{cards.listrik.greenHelp}</p>
          </div>
        </div>
      </details>
    </CardShell>
  );
}
