// Section 05: live reconciliation checks, including the unreconciled location gap.
"use client";

import type { Check } from "../../lib/dhl-checks";
import { formatFactor, formatTonnes } from "../../lib/format";
import { intlLocale } from "../../lib/i18n";
import { useLanguage } from "../LanguageProvider";
import ClaimTag from "./ClaimTag";
import DhlSection from "./DhlSection";
import { formatDhlValue } from "./formatDhl";

export default function DhlChecks({ n, checks }: { n: string; checks: readonly Check[] }) {
  const { lang, copy: ui } = useLanguage();
  const copy = ui.dhl.checks;
  const locale = intlLocale(lang);
  const labels = copy.labels as Record<string, string>;
  const notes = copy.notes as Record<string, string>;
  const units = copy.units as Record<string, string>;
  const gap = checks.find((check) => check.id === "total-loc");

  return (
    <DhlSection id="dhl-checks" n={n} title={copy.title}>
      <p>
        {copy.intro} <ClaimTag tag="calculated" />
      </p>
      <p className="dhl-note">
        {copy.summary} <ClaimTag tag={copy.summaryTag} />
      </p>

      {gap ? (
        <div className="dhl-gap" role="note">
          <div className="dhl-gap-head">
            <p className="t-label-caps">{copy.gapTitle}</p>
            <ClaimTag tag="calculated" />
          </div>
          <p>{copy.gapBody}</p>
          <p className="t-label-code tnum">
            {copy.gapDiffLabel}: {formatTonnes(gap.diff, locale)} {units["total-loc"]}
          </p>
        </div>
      ) : null}

      <div className="cm-table-wrap">
        <table className="cm-table dhl-checks-table">
          <caption className="cm-table-caption t-label-caps">{copy.caption}</caption>
          <thead>
            <tr>
              <th scope="col">{copy.columns.check}</th>
              <th scope="col" className="num">{copy.columns.computed}</th>
              <th scope="col" className="num">{copy.columns.reported}</th>
              <th scope="col" className="num">{copy.columns.diff}</th>
              <th scope="col" className="num">{copy.columns.tolerance}</th>
              <th scope="col">{copy.columns.status}</th>
              <th scope="col">{copy.columns.note}</th>
            </tr>
          </thead>
          <tbody>
            {checks.map((check) => {
              const unit = units[check.id] ?? "";
              const note = notes[check.id] ?? check.note ?? "—";
              return (
                <tr key={check.id} className={check.id === "total-loc" ? "dhl-gap-row" : undefined}>
                  <td>
                    {labels[check.id] ?? check.label}
                    <div>
                      <ClaimTag tag="calculated" />
                    </div>
                  </td>
                  <td className="tnum num">{formatDhlValue(check.computed, unit, locale)}</td>
                  <td className="tnum num">{formatDhlValue(check.reported, unit, locale)}</td>
                  <td className="tnum num">{formatFactor(check.diff, locale)}</td>
                  <td className="tnum num">{formatFactor(check.tolerance, locale)}</td>
                  <td>
                    <span className={`cm-chip ${check.status === "gap" ? "cm-chip-alert" : ""}`}>
                      {check.status === "gap" ? copy.statusGap : copy.statusOk}
                    </span>
                  </td>
                  <td className="dhl-check-note">{note}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </DhlSection>
  );
}
