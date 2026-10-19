// Activity cards orchestrator: ADA|TIDAK ADA state and the optional group.
"use client";

import { useState } from "react";
import type { ActivityRow, CalculatorState } from "../../lib/calculator";
import { isEmptyState } from "../../lib/calculator";
import ElectricityCard from "./ElectricityCard";
import FlightsCard from "./FlightsCard";
import GasCard from "./GasCard";
import OtherCards from "./OtherCards";
import SourcesTable from "./SourcesTable";
import VehiclesCard from "./VehiclesCard";

type CardId = "listrik" | "gas" | "kendaraan" | "penerbangan";

const ZERO_PATCH: Record<CardId, Partial<CalculatorState>> = {
  listrik: { electricityMwh: 0 },
  gas: { gasAmount: 0 },
  kendaraan: { fleetVansL: 0, fleetExecL: 0 },
  penerbangan: { flightsShort: 0, flightsMedium: 0, flightsLong: 0 },
};

interface CalculatorCardsProps {
  state: CalculatorState;
  rows: ActivityRow[];
  onPatch: (patch: Partial<CalculatorState>) => void;
}

export default function CalculatorCards({ state, rows, onPatch }: CalculatorCardsProps) {
  const [ada, setAda] = useState<Record<CardId, boolean>>(() => ({
    listrik: state.electricityMwh > 0 || isEmptyState(state),
    gas: state.gasAmount > 0,
    kendaraan: state.fleetVansL + state.fleetExecL > 0,
    penerbangan: state.flightsShort + state.flightsMedium + state.flightsLong > 0,
  }));

  function toggle(id: CardId, next: boolean): void {
    setAda((previous) => ({ ...previous, [id]: next }));
    if (!next) onPatch(ZERO_PATCH[id]);
  }

  const common = { state, rows, onPatch };

  return (
    <div className="cal-cards">
      <ElectricityCard
        {...common}
        ada={ada.listrik}
        onAdaChange={(next) => toggle("listrik", next)}
        autoFocus={ada.listrik && isEmptyState(state)}
      />
      <GasCard {...common} ada={ada.gas} onAdaChange={(next) => toggle("gas", next)} />
      <VehiclesCard
        {...common}
        ada={ada.kendaraan}
        onAdaChange={(next) => toggle("kendaraan", next)}
      />
      <FlightsCard
        {...common}
        ada={ada.penerbangan}
        onAdaChange={(next) => toggle("penerbangan", next)}
      />
      <OtherCards {...common} />
      <SourcesTable rows={rows} />
    </div>
  );
}
