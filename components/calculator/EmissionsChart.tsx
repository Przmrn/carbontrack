// Horizontal bar chart of emissions by Calculator card. Bars use the share of
// the yearly total; all values are read from the existing ledger.
"use client";

import type { Ledger } from "../../lib/calculator";
import { emissionsByCard } from "../../lib/calculator-chart";
import { formatShare, formatTonnes } from "../../lib/format";
import { intlLocale } from "../../lib/i18n";
import { useLanguage } from "../LanguageProvider";

// Keep a tiny but non-zero card visible instead of printing a misleading 0.00.
function cardTonnes(value: number, locale: "en" | "id-ID"): string {
  if (value > 0 && value < 0.005) return `<${formatTonnes(0.01, locale)}`;
  return formatTonnes(value, locale);
}

export default function EmissionsChart({ ledger }: { ledger: Ledger }) {
  const { lang, copy } = useLanguage();
  const locale = intlLocale(lang);
  const chart = copy.calculator.ledger.chart;
  const cards = emissionsByCard(ledger);
  if (cards.length === 0) return null;

  return (
    <section className="cal-chart" aria-label={chart.title}>
      <div className="cal-chart-head">
        <h2 className="cal-chart-title">{chart.title}</h2>
        <span className="cal-chart-unit">{chart.unit}</span>
      </div>
      <ul className="cal-chart-rows">
        {cards.map((card, index) => (
          <li key={card.key} className="cal-chart-row">
            <div className="cal-chart-row-head">
              <span className="cal-chart-name">
                <span className="cal-chart-rank tnum" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {chart.cards[card.key]}
              </span>
              <span className="cal-chart-value tnum">
                {cardTonnes(card.tonnes, locale)} · {formatShare(card.share, locale)}
              </span>
            </div>
            <span className="cal-chart-track" aria-hidden="true">
              <span className="cal-chart-bar" style={{ width: `${card.share * 100}%` }} />
            </span>
          </li>
        ))}
      </ul>
      <p className="cal-chart-note">{chart.note}</p>
    </section>
  );
}
