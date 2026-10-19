// GENERATED from "DHL Group 2025 Sustainability Statbook" (xlsx). Do not edit by hand.
// null = not reported (statbook "-" = KPI introduced later, "n/d" = not disclosed).
// Mt = million metric tons. Revenue is from the DHL Group 2025 Annual Report, key-figures table (p.3).

export type Year = '2016'|'2017'|'2018'|'2019'|'2020'|'2021'|'2022'|'2023'|'2024'|'2025';
export type Series = { unit: string; src: string; v: Partial<Record<Year, number | null>> };

export const REVENUE_EUR_M: Partial<Record<Year, number>> = { '2021': 81747, '2022': 94436, '2023': 81758, '2024': 84186, '2025': 82855 };

export const DHL = {
  logistics_total: { unit: 'Mt CO2e', src: 'Statbook GHG Footprint row 19', v: { '2016': 32.53, '2017': 34.88, '2018': 35.63, '2019': 33.2, '2020': 33.64, '2021': 40.22, '2022': 36.59, '2023': 33.27, '2024': 33.77, '2025': 32.31 } },
  share_air: { unit: 'share', src: 'Statbook GHG Footprint row 20', v: { '2016': 0.66, '2017': 0.64, '2018': 0.65, '2019': 0.64, '2020': 0.67, '2021': 0.7, '2022': 0.69, '2023': 0.68, '2024': 0.68, '2025': 0.65 } },
  share_ocean: { unit: 'share', src: 'Statbook GHG Footprint row 21', v: { '2016': 0.11, '2017': 0.12, '2018': 0.11, '2019': 0.11, '2020': 0.08, '2021': 0.07, '2022': 0.08, '2023': 0.07, '2024': 0.09, '2025': 0.11 } },
  share_road: { unit: 'share', src: 'Statbook GHG Footprint row 22', v: { '2016': 0.2, '2017': 0.21, '2018': 0.21, '2019': 0.22, '2020': 0.24, '2021': 0.22, '2022': 0.22, '2023': 0.24, '2024': 0.22, '2025': 0.23 } },
  share_buildings: { unit: 'share', src: 'Statbook GHG Footprint row 23', v: { '2016': 0.02, '2017': 0.02, '2018': 0.02, '2019': 0.02, '2020': 0.02, '2021': 0.01, '2022': 0.01, '2023': 0.01, '2024': 0.01, '2025': 0.01 } },
  total_sbt2050: { unit: 'Mt CO2e', src: 'Statbook GHG Footprint row 32', v: { '2021': 45.41, '2022': 41.88, '2023': 38.54, '2024': 39.15, '2025': 38.09 } },
  total_location: { unit: 'Mt CO2e', src: 'Statbook GHG Footprint row 33', v: { '2023': 39.87, '2024': 40.53, '2025': 39.48 } },
  total_market: { unit: 'Mt CO2e', src: 'Statbook GHG Footprint row 34', v: { '2023': 39.15, '2024': 39.77, '2025': 38.71 } },
  scope1: { unit: 'Mt CO2e', src: 'Statbook GHG Footprint row 35', v: { '2016': 5.68, '2017': 5.9, '2018': 6.3, '2019': 6.27, '2020': 6.59, '2021': 7.31, '2022': 8.3, '2023': 8.25, '2024': 7.66, '2025': 6.46 } },
  scope2_location: { unit: 'Mt CO2e', src: 'Statbook GHG Footprint row 44', v: { '2021': 0.87, '2022': 0.69, '2023': 0.67, '2024': 0.73, '2025': 0.73 } },
  scope2_market: { unit: 'Mt CO2e', src: 'Statbook GHG Footprint row 45', v: { '2016': 0.37, '2017': 0.44, '2018': 0.27, '2019': 0.21, '2020': 0.19, '2021': 0.22, '2022': 0.07, '2023': 0.05, '2024': 0.08, '2025': 0.06 } },
  s1s2_market: { unit: 'Mt CO2e', src: 'Statbook GHG Footprint row 53', v: { '2016': 6.05, '2017': 6.34, '2018': 6.57, '2019': 6.48, '2020': 6.78, '2021': 7.52, '2022': 8.37, '2023': 8.3, '2024': 7.74, '2025': 6.52 } },
  scope3_total: { unit: 'Mt CO2e', src: 'Statbook GHG Footprint row 54', v: { '2016': 29.98, '2017': 32.03, '2018': 33.13, '2019': 31.74, '2020': 32.19, '2021': 38.49, '2022': 34.13, '2023': 30.85, '2024': 32.03, '2025': 32.19 } },
  scope3_logistics: { unit: 'Mt CO2e', src: 'Statbook GHG Footprint row 55', v: { '2016': 26.48, '2017': 28.53, '2018': 29.06, '2019': 26.72, '2020': 26.86, '2021': 32.7, '2022': 28.22, '2023': 24.97, '2024': 26.03, '2025': 25.79 } },
  cat1: { unit: 'Mt CO2e', src: 'Statbook GHG Footprint row 68', v: { '2016': 2, '2017': 2.1, '2018': 2.05, '2019': 2.58, '2020': 2.6, '2021': 2.81, '2022': 3, '2023': 2.78, '2024': 2.89, '2025': 3.12 } },
  cat2: { unit: 'Mt CO2e', src: 'Statbook GHG Footprint row 69', v: { '2016': 0.8, '2017': 0.7, '2018': 1.28, '2019': 1.7, '2020': 1.96, '2021': 2.37, '2022': 2.29, '2023': 2.49, '2024': 2.49, '2025': 2.66 } },
  cat3: { unit: 'Mt CO2e', src: 'Statbook GHG Footprint row 56', v: { '2016': 1.3, '2017': 1.4, '2018': 1.43, '2019': 1.43, '2020': 1.47, '2021': 1.64, '2022': 1.87, '2023': 1.87, '2024': 1.77, '2025': 1.59 } },
  cat4: { unit: 'Mt CO2e', src: 'Statbook GHG Footprint row 57', v: { '2016': 25.1, '2017': 27.1, '2018': 27.56, '2019': 25.25, '2020': 25.36, '2021': 31.03, '2022': 26.28, '2023': 23.02, '2024': 24.18, '2025': 24.12 } },
  cat6: { unit: 'Mt CO2e', src: 'Statbook GHG Footprint row 58', v: { '2016': 0.1, '2017': 0.1, '2018': 0.07, '2019': 0.07, '2020': 0.03, '2021': 0.03, '2022': 0.07, '2023': 0.08, '2024': 0.08, '2025': 0.08 } },
  cat7: { unit: 'Mt CO2e', src: 'Statbook GHG Footprint row 71', v: { '2016': 0.7, '2017': 0.7, '2018': 0.74, '2019': 0.74, '2020': 0.77, '2021': 0.61, '2022': 0.62, '2023': 0.61, '2024': 0.62, '2025': 0.62 } },
  scope3_other: { unit: 'Mt CO2e', src: 'Statbook GHG Footprint row 67', v: { '2016': 3.5, '2017': 3.5, '2018': 4.07, '2019': 5.02, '2020': 5.33, '2021': 5.79, '2022': 5.91, '2023': 5.88, '2024': 6.0, '2025': 6.4 } },
  rde: { unit: 'kt CO2e', src: 'Statbook GHG Footprint row 3', v: { '2021': 728, '2022': 1004, '2023': 1335, '2024': 1584, '2025': 2083 } },
  rde_sustainable_fuels: { unit: 'kt CO2e', src: 'Statbook GHG Footprint row 4', v: { '2024': 644, '2025': 1107 } },
  rde_electrification: { unit: 'kt CO2e', src: 'Statbook GHG Footprint row 5', v: { '2024': 148, '2025': 183 } },
  rde_renewable_electricity: { unit: 'kt CO2e', src: 'Statbook GHG Footprint row 6', v: { '2024': 744, '2025': 748 } },
  rde_further: { unit: 'kt CO2e', src: 'Statbook GHG Footprint row 7', v: { '2024': 48, '2025': 44 } },
  mandatory_blend: { unit: 'kt CO2e', src: 'Statbook GHG Footprint row 8', v: { '2022': 140, '2023': 128, '2024': 98, '2025': 221 } },
  total_reduced_vs_conventional: { unit: 'kt CO2e', src: 'Statbook GHG Footprint row 2', v: { '2023': 1463, '2024': 1682, '2025': 2304 } },
  intensity_market: { unit: 'g CO2e / EUR revenue', src: 'Statbook GHG Footprint row 17', v: { '2023': 479, '2024': 472, '2025': 467 } },
  intensity_location: { unit: 'g CO2e / EUR revenue', src: 'Statbook GHG Footprint row 18', v: { '2023': 488, '2024': 481, '2025': 477 } },
  primary_s12: { unit: 'share %', src: 'Statbook GHG Footprint row 82', v: { '2024': 94.6, '2025': 95.1 } },
  secondary_s12: { unit: 'share %', src: 'Statbook GHG Footprint row 83', v: { '2024': 5.4, '2025': 4.9 } },
  primary_s3: { unit: 'share %', src: 'Statbook GHG Footprint row 85', v: { '2024': 19.3, '2025': 19.9 } },
  secondary_s3: { unit: 'share %', src: 'Statbook GHG Footprint row 86', v: { '2024': 80.7, '2025': 80.1 } },
  modeled_s3: { unit: 'share %', src: 'Statbook GHG Footprint row 87', v: { '2024': 61.9, '2025': 60.2 } },
  default_s3: { unit: 'share %', src: 'Statbook GHG Footprint row 88', v: { '2024': 18.7, '2025': 19.9 } },
  biogenic_total: { unit: 'kt CO2', src: 'Statbook GHG Footprint row 89', v: { '2023': 605, '2024': 717, '2025': 1331 } },
  biogenic_s1: { unit: 'kt CO2', src: 'Statbook GHG Footprint row 90', v: { '2024': 349, '2025': 782 } },
  biogenic_s3: { unit: 'kt CO2', src: 'Statbook GHG Footprint row 91', v: { '2024': 367, '2025': 549 } },
  credits_retired: { unit: 'Mt CO2e', src: 'Statbook GHG Footprint row 92', v: { '2021': 0.4, '2022': 0.7, '2023': 1, '2024': 1.1, '2025': 0.8 } },
  energy_total: { unit: 'GWh', src: 'Statbook Energy Consumption Scope 1&2 row 2', v: { '2016': 23837, '2017': 24927, '2018': 26437, '2019': 26199, '2020': 27427, '2021': 30486, '2022': 34493, '2023': 35056, '2024': 32473, '2025': 29458 } },
  energy_fossil: { unit: 'GWh', src: 'Statbook Energy Consumption Scope 1&2 row 11', v: { '2016': 20798, '2017': 21733, '2018': 23243, '2019': 23100, '2020': 24336, '2021': 28660, '2022': 32226, '2023': 31992, '2024': 29134, '2025': 24565 } },
  fossil_crude: { unit: 'GWh', src: 'Statbook Energy Consumption Scope 1&2 row 12', v: { '2024': 28145, '2025': 23669 } },
  fossil_gas: { unit: 'GWh', src: 'Statbook Energy Consumption Scope 1&2 row 13', v: { '2024': 803, '2025': 711 } },
  fossil_purchased: { unit: 'GWh', src: 'Statbook Energy Consumption Scope 1&2 row 14', v: { '2024': 187, '2025': 185 } },
  fossil_air: { unit: 'GWh', src: 'Statbook Energy Consumption Scope 1&2 row 16', v: { '2016': 16323, '2017': 17227, '2018': 18598, '2019': 18613, '2020': 19622, '2021': 22484, '2022': 26648, '2023': 26853, '2024': 24329, '2025': 20321 } },
  fossil_road: { unit: 'GWh', src: 'Statbook Energy Consumption Scope 1&2 row 17', v: { '2016': 4475, '2017': 4506, '2018': 4645, '2019': 4487, '2020': 4711, '2021': 4486, '2022': 4237, '2023': 3896, '2024': 3636, '2025': 3145 } },
  fossil_buildings: { unit: 'GWh', src: 'Statbook Energy Consumption Scope 1&2 row 18', v: { '2016': 1964, '2017': 1929, '2018': 1677, '2019': 1525, '2020': 1454, '2021': 1690, '2022': 1341, '2023': 1243, '2024': 1169, '2025': 1099 } },
  nuclear: { unit: 'GWh', src: 'Statbook Energy Consumption Scope 1&2 row 19', v: { '2024': 7, '2025': 6 } },
  renewable_total: { unit: 'GWh', src: 'Statbook Energy Consumption Scope 1&2 row 20', v: { '2021': 1826, '2022': 2267, '2023': 3064, '2024': 3332, '2025': 4887 } },
  renewable_biomass: { unit: 'GWh', src: 'Statbook Energy Consumption Scope 1&2 row 21', v: { '2024': 1437, '2025': 2969 } },
  renewable_purchased: { unit: 'GWh', src: 'Statbook Energy Consumption Scope 1&2 row 22', v: { '2024': 1853, '2025': 1877 } },
  renewable_selfgen: { unit: 'GWh', src: 'Statbook Energy Consumption Scope 1&2 row 23', v: { '2024': 41, '2025': 41 } },
  renewable_air: { unit: 'GWh', src: 'Statbook Energy Consumption Scope 1&2 row 25', v: { '2020': 3, '2021': 175, '2022': 343, '2023': 881, '2024': 887, '2025': 2263 } },
  renewable_road: { unit: 'GWh', src: 'Statbook Energy Consumption Scope 1&2 row 26', v: { '2016': 167, '2017': 170, '2018': 160, '2019': 141, '2020': 128, '2021': 150, '2022': 242, '2023': 392, '2024': 613, '2025': 715 } },
  renewable_buildings: { unit: 'GWh', src: 'Statbook Energy Consumption Scope 1&2 row 27', v: { '2021': 1501, '2022': 1682, '2023': 1791, '2024': 1832, '2025': 1909 } },
  elec_renewable_share: { unit: 'share', src: 'Statbook Energy Consumption Scope 1&2 row 35', v: { '2016': 0.62, '2017': 0.63, '2018': 0.77, '2019': 0.83, '2020': 0.86, '2021': 0.86, '2022': 0.94, '2023': 0.972, '2024': 0.952, '2025': 0.969 } },
  energy_intensity: { unit: 'kWh / EUR revenue', src: 'Statbook Energy Consumption Scope 1&2 row 39', v: { '2022': 0.37, '2023': 0.43, '2024': 0.39, '2025': 0.36 } },
} as const satisfies Record<string, Series>;

export const TARGETS = {
  src: 'Statbook, Climate targets sheet',
  base2021_s1s2_market: 7.52,
  target2030_s1s2_market: 4.36,
  base2021_s3_logistics: 32.7,
  target2030_s3_logistics: 24.53,
  base2021_s3_sbt2050: 37.88,
  base2021_logistics: 40.22,
  target2026_logistics: 32.1,
  target2030_logistics: 28.89,
  base2021_total_sbt2050: 45.41,
  target2050_total: 4.54,
} as const;

// 2025 logistics-related emissions by corporate division (Mt CO2e). 'consolidation' is negative; see docs/DHL-METHODOLOGY.md.
export const LOGISTICS_BY_DIVISION_2025 = { src: 'Statbook GHG Footprint rows 25-31', v: {express: 13.69, gf_freight: 14.61, supply_chain: 1.81, ecommerce: 1.62, post_parcel_de: 1.48, group_functions: 0.02, consolidation: -0.92} } as const;

// Scope 1 by division, 2024 and 2025 (Mt CO2e)
export const SCOPE1_BY_DIVISION = { src: 'Statbook GHG Footprint rows 36-42', v: {
  express: { '2024': 6.62, '2025': 5.54 },
  gf_freight: { '2024': 0.08, '2025': 0.05 },
  supply_chain: { '2024': 0.43, '2025': 0.37 },
  ecommerce: { '2024': 0.25, '2025': 0.24 },
  post_parcel_de: { '2024': 0.28, '2025': 0.25 },
  group_functions: { '2024': 0.01, '2025': 0.01 },
  consolidation: { '2024': 0, '2025': 0 },
} } as const;

// Scope 3 logistics-related by division, 2024 and 2025 (Mt CO2e)
export const SCOPE3LOG_BY_DIVISION = { src: 'Statbook GHG Footprint rows 60-66', v: {
  express: { '2024': 8.8, '2025': 8.13 },
  gf_freight: { '2024': 14.15, '2025': 14.56 },
  supply_chain: { '2024': 1.57, '2025': 1.43 },
  ecommerce: { '2024': 1.25, '2025': 1.38 },
  post_parcel_de: { '2024': 1.17, '2025': 1.2 },
  group_functions: { '2024': 0.01, '2025': 0.01 },
  consolidation: { '2024': -0.93, '2025': -0.92 },
} } as const;
