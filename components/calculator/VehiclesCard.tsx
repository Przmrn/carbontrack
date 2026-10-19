// Card: company vehicles. Two diesel fields share one period toggle.
"use client";

import { useState } from "react";
import type { ActivityRow, CalculatorState } from "../../lib/calculator";
import { formatAmount, formatFactor, formatKg } from "../../lib/format";
import { intlLocale } from "../../lib/i18n";
import { fromAnnual, toAnnual, type Period } from "../../lib/units";
import { useLanguage } from "../LanguageProvider";
import AmountField from "./AmountField";
import CalculationDetail, { type DetailLine } from "./CalculationDetail";
import CardShell from "./CardShell";
import Segmented from "../ui/Segmented";

export interface VehiclesCardProps {
  state: CalculatorState;
  rows: ActivityRow[];
  onPatch: (patch: Partial<CalculatorState>) => void;
  ada: boolean;
  onAdaChange: (next: boolean) => void;
}

export default function VehiclesCard({
  state,
  rows,
  onPatch,
  ada,
  onAdaChange,
}: VehiclesCardProps) {
  const { lang, copy } = useLanguage();
  const cards = copy.calculator.cards;
  const locale = intlLocale(lang);
  const [period, setPeriod] = useState<Period>("month");

  const vans = rows.find((row) => row.id === "fleetVansL");
  const cars = rows.find((row) => row.id === "fleetExecL");
  const diesel = vans?.factor ?? cars?.factor ?? null;
  const vansField = fromAnnual(state.fleetVansL, period);
  const carsField = fromAnnual(state.fleetExecL, period);
  const suffix = period === "month" ? " × 12" : "";
  const lines: DetailLine[] = [];
  if (vans !== undefined) {
    lines.push({
      key: "vans",
      row: vans,
      working: `${formatAmount(vansField, locale)} L${suffix} × ${formatFactor(diesel?.value ?? 0, locale)} kg/L = ${formatKg(vans.kg, locale)} kg`,
    });
  }
  if (cars !== undefined) {
    lines.push({
      key: "cars",
      row: cars,
      working: `${formatAmount(carsField, locale)} L${suffix} × ${formatFactor(diesel?.value ?? 0, locale)} kg/L = ${formatKg(cars.kg, locale)} kg`,
    });
  }

  return (
    <CardShell
      id="kendaraan"
      title={cards.kendaraan.title}
      help={cards.kendaraan.help}
      ada={ada}
      onAdaChange={onAdaChange}
      resultKg={
        state.fleetVansL + state.fleetExecL > 0 ? (vans?.kg ?? 0) + (cars?.kg ?? 0) : null
      }
      detail={<CalculationDetail lines={lines} />}
    >
      <div className="cal-fields cal-fields-two">
        <AmountField
          key={`vans-${period}-${lang}`}
          id="kendaraan-vans"
          label={cards.kendaraan.vanField}
          unit={cards.kendaraan.unit}
          value={vansField}
          onChange={(value) =>
            onPatch({ fleetVansL: value === null ? 0 : toAnnual(value, period) })
          }
        />
        <AmountField
          key={`cars-${period}-${lang}`}
          id="kendaraan-cars"
          label={cards.kendaraan.carField}
          unit={cards.kendaraan.unit}
          value={carsField}
          onChange={(value) =>
            onPatch({ fleetExecL: value === null ? 0 : toAnnual(value, period) })
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
    </CardShell>
  );
}
