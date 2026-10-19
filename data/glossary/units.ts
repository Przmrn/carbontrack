// Glossary: units of mass, distance, energy and compute.
import type { GlossaryEntry } from "./types";

export const unitEntries: GlossaryEntry[] = [
  {
    abbr: "kg",
    expansion: "Kilogram",
    plain: "One kilogram. The base mass unit here: grams, tonnes and thousands of tonnes all convert into it.",
    where: "app",
  },
  {
    abbr: "g",
    expansion: "Gram",
    plain:
      "One thousandth of a kilogram. Transport factors are usually per gram, for example 28 g per kilometre for rail.",
    where: "app",
  },
  {
    abbr: "km",
    expansion: "Kilometre",
    plain: "Distance. The commute slider counts kilometres travelled per day.",
    where: "struk",
  },
  {
    abbr: "m³",
    expansion: "Cubic metre",
    plain:
      "A volume of gas, about 10.5 kWh of natural gas. Gas meters often show it, so the Calculator can convert it to kWh before you enter it.",
    where: "calculator",
  },
  {
    abbr: "kWh",
    expansion: "Kilowatt-hour",
    plain:
      "The unit on an electricity meter: one kilowatt running for one hour. kWh measures energy, while kW measures power.",
    where: "app",
  },
  {
    abbr: "MWh",
    expansion: "Megawatt-hour",
    plain: "1,000 kWh. Business electricity is usually billed in MWh.",
    where: "calculator",
  },
  {
    abbr: "GWh",
    expansion: "Gigawatt-hour",
    plain: "1,000,000 kWh. Used for group-scale energy totals, such as DHL's 29,458 GWh.",
    where: "methodology",
  },
  {
    abbr: "MJ",
    expansion: "Megajoule",
    plain: "A unit of energy worth about 0.278 kWh. District heating is often billed in MJ.",
    where: "calculator",
  },
  {
    abbr: "MMBTU",
    expansion: "Million British thermal units",
    plain:
      "A heating unit worth about 293 kWh, used on some gas bills. Industry standards usually write it MMBtu.",
    where: "calculator",
  },
  {
    abbr: "vCPU",
    expansion: "Virtual central processing unit",
    plain: "One virtual processor core. Cloud computing is measured and priced per vCPU-hour.",
    where: "calculator",
  },
  {
    abbr: "RFC / CAMX",
    expansion: "Regional grid codes",
    plain:
      "Labels for the electricity grids in the Calculator's demo list. They are region codes carried over from the prototype, not standard abbreviations, and their factors are unverified.",
    where: "calculator",
  },
];