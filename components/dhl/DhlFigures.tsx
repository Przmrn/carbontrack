// Section 02: FY2025 headline figures and separate memo lines from generated data.
"use client";

import type { Year } from "../../data/dhl-fy2025";
import { intlLocale } from "../../lib/i18n";
import { useLanguage } from "../LanguageProvider";
import ClaimTag from "./ClaimTag";
import DhlSection from "./DhlSection";
import { dhlSeries } from "./dhlSeries";
import { displayDhlUnit, formatDhlValue } from "./formatDhl";

const YEARS: readonly Year[] = ["2021", "2024", "2025"];

export default function DhlFigures({ n }: { n: string }) {
  const { lang, copy: ui } = useLanguage();
  const copy = ui.dhl.figures;
  const locale = intlLocale(lang);

  return (
    <DhlSection id="dhl-figures" n={n} title={copy.title}>
      <p>
        {copy.intro} <ClaimTag tag="calculated" />
      </p>
      <div className="cm-table-wrap">
        <table className="cm-table dhl-figure-table">
          <caption className="cm-table-caption t-label-caps">{copy.caption}</caption>
          <thead>
            <tr>
              <th scope="col">{copy.columns.item}</th>
              <th scope="col" className="num">{copy.columns.base}</th>
              <th scope="col" className="num">{copy.columns.y2024}</th>
              <th scope="col" className="num">{copy.columns.y2025}</th>
              <th scope="col">{copy.columns.unit}</th>
              <th scope="col">{copy.columns.evidence}</th>
            </tr>
          </thead>
          <tbody>
            {copy.rows.map((row) => {
              const item = dhlSeries(row.key);
              return (
                <tr key={row.key}>
                  <td>
                    {row.label}
                    {row.estimate ? <span className="dhl-estimate">{copy.estimate}</span> : null}
                  </td>
                  {YEARS.map((year) => (
                    <td key={year} className="tnum num">
                      {formatDhlValue(item?.v[year] ?? null, item?.unit ?? "", locale)}
                    </td>
                  ))}
                  <td>{displayDhlUnit(item?.unit ?? "—")}</td>
                  <td>
                    <ClaimTag tag={row.tag} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="cm-table-wrap dhl-memo">
        <table className="cm-table dhl-figure-table">
          <caption className="cm-table-caption t-label-caps">{copy.memoCaption}</caption>
          <thead>
            <tr>
              <th scope="col">{copy.columns.item}</th>
              <th scope="col" className="num">{copy.columns.base}</th>
              <th scope="col" className="num">{copy.columns.y2024}</th>
              <th scope="col" className="num">{copy.columns.y2025}</th>
              <th scope="col">{copy.columns.unit}</th>
              <th scope="col">{copy.columns.evidence}</th>
            </tr>
          </thead>
          <tbody>
            {copy.memoRows.map((row) => {
              const item = dhlSeries(row.key);
              return (
                <tr key={row.key}>
                  <td>{row.label}</td>
                  {YEARS.map((year) => (
                    <td key={year} className="tnum num">
                      {formatDhlValue(item?.v[year] ?? null, item?.unit ?? "", locale)}
                    </td>
                  ))}
                  <td>{displayDhlUnit(item?.unit ?? "—")}</td>
                  <td>
                    <ClaimTag tag={row.tag} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="dhl-note">
        {copy.note} <ClaimTag tag={copy.noteTag} />
      </p>
    </DhlSection>
  );
}
