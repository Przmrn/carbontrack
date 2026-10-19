// Glossary: the reporting standards and the factor sources named by DHL and the PRD.
import type { GlossaryEntry } from "./types";

export const sourceEntries: GlossaryEntry[] = [
  {
    abbr: "GHG Protocol",
    expansion: "Greenhouse Gas Protocol",
    plain:
      "The accounting standard that defines Scopes 1–3 and the market/location split. C—METRIC follows its structure; it is not certified against it.",
    where: "app",
  },
  {
    abbr: "GLEC",
    expansion: "Global Logistics Emissions Council Framework",
    plain:
      "The logistics-specific factor framework (version 3.1) that DHL names for fuel and transport factors.",
    where: "methodology",
  },
  {
    abbr: "IEA",
    expansion: "International Energy Agency",
    plain:
      "Publishes the 2024 electricity and district-heating factor set that DHL uses for Scope 2.",
    where: "methodology",
  },
  {
    abbr: "AIB",
    expansion: "Association of Issuing Bodies",
    plain:
      "The European grid-operator association that publishes the residual electricity mix used for market-based Scope 2.",
    where: "calculator",
  },
  {
    abbr: "DEFRA",
    expansion: "UK Department for Environment, Food & Rural Affairs",
    plain:
      "Publishes the annual UK greenhouse-gas conversion factors, widely reused for spend-based Scope 3 estimates.",
    where: "methodology",
  },
  {
    abbr: "IPCC",
    expansion: "Intergovernmental Panel on Climate Change",
    plain:
      "The UN body whose assessment reports set the warming scores for gases such as refrigerants. AR6 means the sixth assessment report.",
    where: "methodology",
  },
  {
    abbr: "ISO 14064-1 / -3",
    expansion: "ISO standards 14064-1 and 14064-3",
    plain:
      "International standards for quantifying a greenhouse gas inventory (-1) and for verifying one (-3).",
    where: "dossier",
  },
  {
    abbr: "ISO 14083",
    expansion: "ISO 14083",
    plain:
      "International standard for calculating greenhouse gas emissions of transport chain operations, including well-to-wheel.",
    where: "methodology",
  },
  {
    abbr: "CSRD",
    expansion: "Corporate Sustainability Reporting Directive",
    plain:
      "The EU rule that requires large companies to report sustainability information, climate included.",
    where: "dossier",
  },
  {
    abbr: "ESRS E1",
    expansion: "European Sustainability Reporting Standards, climate standard",
    plain: "The EU template for reporting climate data inside CSRD.",
    where: "dossier",
  },
  {
    abbr: "S-K",
    expansion: "SEC Regulation S-K",
    plain:
      "The US disclosure form where companies report material information, including climate risks.",
    where: "dossier",
  },
  {
    abbr: "SEC",
    expansion: "US Securities and Exchange Commission",
    plain: "The US market regulator that publishes the S-K disclosure rules.",
    where: "dossier",
  },
  {
    abbr: "SBTi",
    expansion: "Science Based Targets initiative",
    plain:
      "A body that checks whether a company's emissions target matches the Paris Agreement pathways. The Registry shows an illustrative 1.5 °C reference line.",
    where: "registry",
  },
  {
    abbr: "EU ETS",
    expansion: "European Union Emissions Trading System",
    plain:
      "The EU carbon market. DHL names it among the systems its inventory sits in; it is not used as a factor in this app.",
    where: "methodology",
  },
  {
    abbr: "IATA",
    expansion: "International Air Transport Association",
    plain: "Publishes air-transport emission parameters for freight and passenger flights.",
    where: "methodology",
  },
  {
    abbr: "HBEFA",
    expansion: "Handbook of Emission Factors",
    plain: "German reference factors for road transport and fuels.",
    where: "methodology",
  },
  {
    abbr: "SmartWay",
    expansion: "US EPA SmartWay",
    plain:
      "A US database of fuel use and emissions for heavy-duty road freight, used for supplier primary data.",
    where: "methodology",
  },
  {
    abbr: "EPA",
    expansion: "US Environmental Protection Agency",
    plain: "The US environmental regulator behind the SmartWay freight data.",
    where: "methodology",
  },
  {
    abbr: "Clean Cargo",
    expansion: "Clean Cargo Project",
    plain: "A non-profit that maintains the emission factors used for ocean shipping.",
    where: "methodology",
  },
];