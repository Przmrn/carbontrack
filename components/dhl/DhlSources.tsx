// Section 09: Annual Report printed pages and Statbook sheet + row sources.
"use client";

import { LOGISTICS_BY_DIVISION_2025, TARGETS } from "../../data/dhl-fy2025";
import { useLanguage } from "../LanguageProvider";
import ClaimTag from "./ClaimTag";
import DhlSection from "./DhlSection";
import { dhlSeries } from "./dhlSeries";

function statbookSource(key: string, explicit: string): string {
  if (explicit.trim().length > 0) return explicit;
  if (key === "targets") return TARGETS.src;
  if (key === "divisions") return LOGISTICS_BY_DIVISION_2025.src;
  return dhlSeries(key)?.src ?? "—";
}

export default function DhlSources({ n }: { n: string }) {
  const { copy: ui } = useLanguage();
  const copy = ui.dhl.sources;
  return (
    <DhlSection id="dhl-sources" n={n} title={copy.title}>
      <p>
        {copy.intro} <ClaimTag tag={copy.introTag} />
      </p>
      <div className="cm-table-wrap">
        <table className="cm-table dhl-sources-table">
          <caption className="cm-table-caption t-label-caps">{copy.caption}</caption>
          <thead>
            <tr>
              <th scope="col">{copy.columns.item}</th>
              <th scope="col">{copy.columns.page}</th>
              <th scope="col">{copy.columns.statbook}</th>
              <th scope="col">{copy.columns.evidence}</th>
            </tr>
          </thead>
          <tbody>
            {copy.rows.map((row) => (
              <tr key={row.key}>
                <td>{row.label}</td>
                <td className="t-label-code tnum">{row.page}</td>
                <td className="t-label-code tnum">{statbookSource(row.key, row.statbook)}</td>
                <td>
                  <ClaimTag tag="reported" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="dhl-note">
        {copy.note} <ClaimTag tag={copy.noteTag} />
      </p>
    </DhlSection>
  );
}
