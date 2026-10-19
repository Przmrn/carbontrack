// Card: flights. Three annual counters, one-way counts as one flight.
"use client";

import type { ActivityRow, CalculatorState } from "../../lib/calculator";
import { formatAmount, formatFactor, formatKg } from "../../lib/format";
import { intlLocale } from "../../lib/i18n";
import { useLanguage } from "../LanguageProvider";
import CalculationDetail, { type DetailLine } from "./CalculationDetail";
import CardShell from "./CardShell";
import Stepper from "../ui/Stepper";

type FlightId = "flightsShort" | "flightsMedium" | "flightsLong";

const FLIGHT_IDS: FlightId[] = ["flightsShort", "flightsMedium", "flightsLong"];

export interface FlightsCardProps {
  state: CalculatorState;
  rows: ActivityRow[];
  onPatch: (patch: Partial<CalculatorState>) => void;
  ada: boolean;
  onAdaChange: (next: boolean) => void;
}

function flightPatch(id: FlightId, value: number): Partial<CalculatorState> {
  switch (id) {
    case "flightsShort":
      return { flightsShort: value };
    case "flightsMedium":
      return { flightsMedium: value };
    case "flightsLong":
      return { flightsLong: value };
  }
}

export default function FlightsCard({ state, rows, onPatch, ada, onAdaChange }: FlightsCardProps) {
  const { lang, copy } = useLanguage();
  const cards = copy.calculator.cards;
  const locale = intlLocale(lang);
  const labels: Record<FlightId, string> = {
    flightsShort: cards.penerbangan.short,
    flightsMedium: cards.penerbangan.medium,
    flightsLong: cards.penerbangan.long,
  };
  const lines: DetailLine[] = [];
  let kg = 0;
  for (const id of FLIGHT_IDS) {
    const row = rows.find((item) => item.id === id);
    if (row === undefined) continue;
    kg += row.kg;
    lines.push({
      key: id,
      row,
      working: `${formatAmount(state[id], locale)} × ${formatFactor(row.factor?.value ?? 0, locale)} kg/flight = ${formatKg(row.kg, locale)} kg`,
    });
  }
  const entered = state.flightsShort + state.flightsMedium + state.flightsLong > 0;

  return (
    <CardShell
      id="penerbangan"
      title={cards.penerbangan.title}
      help={cards.penerbangan.help}
      ada={ada}
      onAdaChange={onAdaChange}
      resultKg={entered ? kg : null}
      detail={<CalculationDetail lines={lines} />}
    >
      <div className="cal-counters">
        {FLIGHT_IDS.map((id) => (
          <Stepper
            key={id}
            label={labels[id]}
            value={state[id]}
            max={999}
            decreaseLabel={copy.common.decrease}
            increaseLabel={copy.common.increase}
            onChange={(value) => onPatch(flightPatch(id, value))}
          />
        ))}
      </div>
    </CardShell>
  );
}
