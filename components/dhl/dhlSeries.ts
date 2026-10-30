// Typed display access to generated DHL series; values remain read-only data.
import { DHL, type Year } from "../../data/dhl-fy2025";

export interface DhlSeries {
  unit: string;
  src: string;
  v: Partial<Record<Year, number | null>>;
}

export function dhlSeries(key: string): DhlSeries | undefined {
  return DHL[key as keyof typeof DHL] as DhlSeries | undefined;
}
