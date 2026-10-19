// Glossary: accounting methods, certificates and fuel types.
import type { GlossaryEntry } from "./types";

export const methodEntries: GlossaryEntry[] = [
  {
    abbr: "TTW",
    expansion: "Tank-to-wheel",
    plain:
      "Emissions from burning fuel in the vehicle, ignoring how the fuel was made.",
    where: "calculator",
  },
  {
    abbr: "WTT",
    expansion: "Well-to-tank",
    plain:
      "Emissions from producing and moving fuel to the tank: the part before it is burned.",
    where: "calculator",
  },
  {
    abbr: "WTW",
    expansion: "Well-to-wheel",
    plain:
      "TTW plus WTT: the whole fuel cycle. DHL reports its fleet emissions on this basis.",
    where: "methodology",
  },
  {
    abbr: "market-based",
    expansion: "Market-based Scope 2",
    plain:
      "One of the two required ways to report bought electricity. Certificate-covered kWh count as zero, the rest uses the residual grid mix, so the number is usually much lower than location-based.",
    where: "calculator",
  },
  {
    abbr: "location-based",
    expansion: "Location-based Scope 2",
    plain:
      "The other way to report bought electricity: every kWh multiplied by the grid factor of the region it was consumed in, ignoring certificates.",
    where: "calculator",
  },
  {
    abbr: "EAC",
    expansion: "Energy attribute certificate",
    plain:
      "A certificate proving a kWh of electricity came from a renewable source. Covered kWh count as zero in the market-based Scope 2 figure.",
    where: "calculator",
  },
  {
    abbr: "PPA",
    expansion: "Power purchase agreement",
    plain:
      "A long-term contract to buy renewable electricity. The Calculator subtracts the share of your electricity covered by one from the market-based figure.",
    where: "calculator",
  },
  {
    abbr: "GWP",
    expansion: "Global warming potential",
    plain:
      "How much one tonne of a gas warms the atmosphere compared with CO₂, over a stated period.",
    where: "calculator",
  },
  {
    abbr: "GWP100",
    expansion: "100-year global warming potential",
    plain:
      "The standard 100-year warming score used for cooling gases, so a leak can be turned into kg CO₂e.",
    where: "calculator",
  },
  {
    abbr: "SAF",
    expansion: "Sustainable aviation fuel",
    plain:
      "Aviation fuel made from waste or non-food feedstocks instead of crude oil. Its saving is measured against conventional kerosene.",
    where: "methodology",
  },
  {
    abbr: "HVO",
    expansion: "Hydrotreated vegetable oil",
    plain: "A diesel substitute made from used cooking oil or vegetable oil.",
    where: "methodology",
  },
  {
    abbr: "RDE",
    expansion: "Realized Decarbonization Effects",
    plain:
      "DHL's own second indicator: emissions avoided by switching to sustainable fuel, electric vehicles or renewable power. Reported next to the inventory, never inside it.",
    where: "methodology",
  },
  {
    abbr: "SHA-256",
    expansion: "Secure Hash Algorithm, 256-bit",
    plain:
      "A one-way fingerprint of the exported data, computed in your browser. It shows whether data changed; it is not proof that anything is true.",
    where: "dossier",
  },
];