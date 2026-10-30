// The closed-by-default "how this number is made" block for one card.
"use client";

import type { ActivityRow } from "../../lib/calculator";
import { statusForFactor } from "../../lib/export";
import { formatFactor } from "../../lib/format";
import { factorLabel, intlLocale } from "../../lib/i18n";
import { useLanguage } from "../LanguageProvider";

export interface DetailLine {
  key: string;
  /** The working, with real numbers, e.g. "12.400 L × 2,68 kg/L = 33.232,00 kg". */
  working: string;
  row: ActivityRow;
}

interface CalculationDetailProps {
  lines: DetailLine[];
  /** Electricity only: the location-based figure that never enters the total. */
  reference?: string;
}

export default function CalculationDetail({ lines, reference }: CalculationDetailProps) {
  const { lang, copy } = useLanguage();
  const detail = copy.calculator.detail;
  const locale = intlLocale(lang);

  return (
    <div className="cal-calc">
      <ul className="cal-calc-lines">
        {lines.map((line) => (
          <li key={line.key}>
            <p className="cal-calc-working tnum">{line.working}</p>
            <p className="cal-calc-scope">
              {line.row.scope === null
                ? detail.notAvailable
                : `${detail.scopes[line.row.scope - 1]} · ${detail.inTotal}`}
            </p>
            <dl className="cal-calc-rows">
              <div>
                <dt>{detail.factor}</dt>
                <dd>
                  {line.row.factor === null
                    ? detail.notAvailable
                    : `${factorLabel(line.row.factor, lang)} · ${formatFactor(line.row.factor.value, locale)} ${line.row.factor.unit}`}
                </dd>
              </div>
              <div>
                <dt>{detail.source}</dt>
                <dd>{line.row.factor?.source ?? "—"}</dd>
              </div>
              <div>
                <dt>{detail.status}</dt>
                <dd>
                  <span className="cm-demo">
                    {line.row.factor === null ? detail.notAvailable : statusForFactor(line.row.factor)}
                  </span>
                </dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>
      {reference ? <p className="cal-calc-reference tnum">{reference}</p> : null}
    </div>
  );
}
