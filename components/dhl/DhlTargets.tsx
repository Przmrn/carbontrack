// Section 06: published targets and computed progress, with the no-decarbonization note.
"use client";

import { TARGETS } from "../../data/dhl-fy2025";
import type { targetProgress } from "../../lib/dhl-checks";
import { formatTonnes } from "../../lib/format";
import { intlLocale } from "../../lib/i18n";
import { useLanguage } from "../LanguageProvider";
import ClaimTag from "./ClaimTag";
import DhlSection from "./DhlSection";
import { formatDhlValue } from "./formatDhl";

type Progress = ReturnType<typeof targetProgress>;

function targetNumber(key: string): number | null {
  const value = TARGETS[key as keyof typeof TARGETS];
  return typeof value === "number" ? value : null;
}

export default function DhlTargets({ n, progress }: { n: string; progress: Progress }) {
  const { lang, copy: ui } = useLanguage();
  const copy = ui.dhl.targets;
  const locale = intlLocale(lang);

  return (
    <DhlSection id="dhl-targets" n={n} title={copy.title}>
      <p>
        {copy.intro} <ClaimTag tag={copy.introTag} />
      </p>

      <div className="dhl-target-grid">
        <div>
          <p className="t-label-caps">{copy.targetsTitle}</p>
          <div className="cm-table-wrap">
            <table className="cm-table">
              <caption className="cm-table-caption t-label-caps">{copy.targetCaption}</caption>
              <thead>
                <tr>
                  <th scope="col">{copy.targetColumns.label}</th>
                  <th scope="col" className="num">{copy.targetColumns.base}</th>
                  <th scope="col" className="num">{copy.targetColumns.value}</th>
                  <th scope="col">{copy.targetColumns.evidence}</th>
                </tr>
              </thead>
              <tbody>
                {copy.targets.map((row) => (
                  <tr key={row.label}>
                    <td>{row.label}</td>
                    <td className="tnum num">
                      {formatDhlValue(targetNumber(row.baseKey), copy.targetUnit, locale)}
                    </td>
                    <td className="tnum num">
                      {formatDhlValue(targetNumber(row.targetKey), copy.targetUnit, locale)}
                    </td>
                    <td>
                      <ClaimTag tag={row.tag} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="dhl-note">
            {copy.netZero.text} <ClaimTag tag={copy.netZero.tag} />
          </p>
        </div>

        <div>
          <p className="t-label-caps">{copy.progressTitle}</p>
          <div className="cm-table-wrap">
            <table className="cm-table">
              <caption className="cm-table-caption t-label-caps">{copy.progressCaption}</caption>
              <thead>
                <tr>
                  <th scope="col">{copy.progressColumns.label}</th>
                  <th scope="col" className="num">{copy.progressColumns.value}</th>
                  <th scope="col">{copy.progressColumns.evidence}</th>
                </tr>
              </thead>
              <tbody>
                {copy.progress.map((row) => (
                  <tr key={row.key}>
                    <td>{row.label}</td>
                    <td className="tnum num">
                      {formatDhlValue(progress[row.key as keyof Progress], "share %", locale)}
                    </td>
                    <td>
                      <ClaimTag tag={row.tag} />
                    </td>
                  </tr>
                ))}
                <tr>
                  <td>{copy.gapLabel}</td>
                  <td className="tnum num">
                    {formatTonnes(progress.gapTo2030Mt, locale)} {copy.gapUnit}
                  </td>
                  <td>
                    <ClaimTag tag={copy.gapTag} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="dhl-callout">
        <div className="dhl-callout-head">
          <p className="t-label-caps">{copy.notDecarbonization.title}</p>
          <ClaimTag tag={copy.notDecarbonization.tag} />
        </div>
        <p>{copy.notDecarbonization.text}</p>
        <p className="dhl-note">
          {copy.volumeNote.text} <ClaimTag tag={copy.volumeNote.tag} />
        </p>
      </div>
    </DhlSection>
  );
}
