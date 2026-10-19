// Glossary: the accounting concepts and units the totals are built from.
import type { GlossaryEntry } from "./types";

export const accountingEntries: GlossaryEntry[] = [
  {
    abbr: "CO₂e",
    expansion: "Carbon dioxide equivalent",
    plain:
      "Every greenhouse gas restated as the amount of CO₂ that would warm the atmosphere the same way. It is the unit of this app: a gas like methane counts for more than its own weight.",
    where: "app",
  },
  {
    abbr: "CO₂",
    expansion: "Carbon dioxide",
    plain:
      "The gas released when fuel is burned. It is the yardstick used to express every CO₂e figure, so CO₂e = 1 × CO₂.",
    where: "app",
  },
  {
    abbr: "GHG",
    expansion: "Greenhouse gas",
    plain:
      "Gases that trap heat: carbon dioxide, methane, nitrous oxide and the fluorinated gases used in cooling equipment. All of them are counted here as CO₂e.",
    where: "app",
  },
  {
    abbr: "S1 / S2 / S3",
    expansion: "Scope 1, Scope 2, Scope 3",
    plain:
      "The three levels of the GHG Protocol. Scope 1 is what you burn yourself, Scope 2 is the electricity and heat you buy, Scope 3 is everything upstream of that: goods, cloud servers, travel and deliveries.",
    where: "calculator",
  },
  {
    abbr: "cat",
    expansion: "Category",
    plain:
      "Shorthand for a numbered Scope 3 category, for example cat 1 bought goods, cat 4 transport you outsource, or cat 6 business travel. Scope 3 is split into fifteen of them.",
    where: "calculator",
  },
  {
    abbr: "EF",
    expansion: "Emission factor",
    plain:
      "The number that turns an activity into CO₂e: litres of diesel × kg CO₂e per litre. Every figure in this app comes from a factor, and every factor shows its source and whether it is verified.",
    where: "app",
  },
  {
    abbr: "t",
    expansion: "Tonne (metric ton)",
    plain: "1,000 kg. The unit the Calculator and Dossier totals are reported in.",
    where: "calculator",
  },
  {
    abbr: "Mt",
    expansion: "Megatonne (million tonnes)",
    plain: "One million tonnes. Used for company-scale numbers, such as the DHL case study on the Methodology page.",
    where: "methodology",
  },
  {
    abbr: "kt",
    expansion: "Kilotonne (thousand tonnes)",
    plain: "One thousand tonnes. DHL reports its realized decarbonization effects in kt.",
    where: "methodology",
  },
  {
    abbr: "g/€",
    expansion: "Grams of CO₂e per euro",
    plain:
      "Intensity: emissions divided by revenue, so a large company and a small one can be compared fairly.",
    where: "calculator",
  },
];