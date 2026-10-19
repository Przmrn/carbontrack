// Collapsible source table: every included activity, its factor and its status.
"use client";

import type { ActivityRow } from "../../lib/calculator";
import { statusForFactor } from "../../lib/export";
import { formatFactor } from "../../lib/format";
import { intlLocale } from "../../lib/i18n";
import { useLanguage } from "../LanguageProvider";
import { activityLabel } from "./activityLabel";

export default function SourcesTable({ rows }: { rows: ActivityRow[] }) {
  const { lang, copy } = useLanguage();
  const locale = intlLocale(lang);
  const sources = copy.calculator.sources;
  const included = rows.filter((row) => row.included);

  return (
    <details className="cal-sources">
      <summary>{sources.title}</summary>
      <table className="cm-table">
        <thead>
          <tr>
            <th>{sources.colActivity}</th>
            <th>{sources.colFactor}</th>
            <th>{sources.colStatus}</th>
          </tr>
        </thead>
        <tbody>
          {included.map((row) => (
            <tr key={row.id}>
              <td>{activityLabel(copy, row.id)}</td>
              <td className="tnum">
                {row.factor === null
                  ? copy.calculator.detail.notAvailable
                  : `${formatFactor(row.factor.value, locale)} ${row.factor.unit}`}
              </td>
              <td>
                <span className="cm-demo">
                  {row.factor === null ? "—" : statusForFactor(row.factor)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </details>
  );
}
