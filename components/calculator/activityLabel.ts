// Plain label for an activity row, reused by the ledger and the source table.
import type { Copy } from "../../content/en";
import type { ActivityId } from "../../data/activities";

export function activityLabel(copy: Copy, id: ActivityId): string {
  const cards = copy.calculator.cards;
  switch (id) {
    case "gasAmount":
      return cards.gas.title;
    case "fleetVansL":
      return cards.kendaraan.vanField;
    case "fleetExecL":
      return cards.kendaraan.carField;
    case "electricityMwh":
      return cards.listrik.title;
    case "districtMj":
      return cards.lainnya.district.title;
    case "flightsShort":
      return cards.penerbangan.short;
    case "flightsMedium":
      return cards.penerbangan.medium;
    case "flightsLong":
      return cards.penerbangan.long;
    case "cloudVcpuHrs":
      return cards.lainnya.cloud.title;
    case "freightTonneKm":
      return cards.lainnya.freight.title;
    case "r410aKg":
      return cards.lainnya.r410a.title;
    case "hfc134aKg":
      return cards.lainnya.hfc134a.title;
  }
}
