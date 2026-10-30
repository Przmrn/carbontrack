// Section 04: Tableau embed plus the six values a reader can compare.
"use client";

import { intlLocale } from "../../lib/i18n";
import TableauEmbed, { type TableauNumber } from "../TableauEmbed";
import { useLanguage } from "../LanguageProvider";
import ClaimTag from "./ClaimTag";
import DhlSection from "./DhlSection";
import { dhlSeries } from "./dhlSeries";
import { displayDhlUnit, formatDhlValue } from "./formatDhl";

export default function DhlTableauSection({ n }: { n: string }) {
  const { lang, copy: ui } = useLanguage();
  const copy = ui.dhl.tableau;
  const locale = intlLocale(lang);

  const numbers: TableauNumber[] = copy.compare.rows.map((row) => {
    const item = dhlSeries(row.key);
    return {
      label: row.label,
      value: formatDhlValue(item?.v["2025"] ?? null, item?.unit ?? "", locale),
      unit: item ? displayDhlUnit(item.unit) : "—",
    };
  });

  return (
    <DhlSection id="dhl-tableau" n={n} title={copy.title}>
      <p>
        {copy.intro} <ClaimTag tag="calculated" />
      </p>
      <TableauEmbed numbers={numbers} />
    </DhlSection>
  );
}
