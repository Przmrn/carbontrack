// A4 vector preview: executive summary, breakdown, intensity, sign-off.
"use client";

import { toKg } from "../../lib/emissions";
import { formatAmount, formatShare, formatTonnes } from "../../lib/format";
import type { ActivityEntry } from "../../lib/emissions";
import { intlLocale } from "../../lib/i18n";
import { useLanguage } from "../LanguageProvider";

interface A4Row {
  code: string;
  activity: string;
  tonnes: number;
}

interface DossierPreviewProps {
  entries: ActivityEntry[];
  total: number;
  s12: number;
  s3: number;
  frameworks: string[];
  headcount: number;
  intensity: number | null;
  checkCode: string;
}

function tonnesFor(entries: ActivityEntry[], keys: string[]): number {
  return entries
    .filter((entry) => keys.includes(entry.key))
    .reduce((sum, entry) => sum + toKg(entry.amount, entry.factor), 0);
}

const ROW_KEYS: { code: string; keys: string[] }[] = [
  { code: "S1.01", keys: ["S1.01"] },
  { code: "S1.02", keys: ["S1.02"] },
  { code: "S1.03", keys: ["S1.03", "S1.04"] },
  { code: "S2.01", keys: ["S2.01"] },
  { code: "S2.02", keys: ["S2.02"] },
  { code: "S3.01", keys: ["S3.01", "S3.02", "S3.03"] },
  { code: "S3.02", keys: ["S3.04"] },
  { code: "S3.03", keys: ["S3.05"] },
];

export default function DossierPreview({
  entries,
  total,
  s12,
  s3,
  frameworks,
  headcount,
  intensity,
  checkCode,
}: DossierPreviewProps) {
  const { lang, copy: ui } = useLanguage();
  const copy = ui.dossier.a4;
  const locale = intlLocale(lang);
  const rows: A4Row[] = ROW_KEYS.map(({ code, keys }) => ({
    code,
    activity: copy.rows.find((item) => item.code === code)?.class ?? code,
    tonnes: tonnesFor(entries, keys),
  }));
  const share = total === 0 ? "0%" : formatShare(s12 / total, locale);

  return (
    <div>
      <div className="dossier-preview-head">
        <p className="t-label-caps">■ {ui.dossier.previewTag}</p>
        <span className="t-label-code">{ui.dossier.previewNote}</span>
        <span className="t-label-code">{ui.dossier.scale}</span>
      </div>
      <div className="a4">
        <div className="a4-head">
          <div>
            <p className="a4-studio">{copy.studio}</p>
            <p className="t-label-caps">{copy.monograph}</p>
            <p className="t-label-code">
              {copy.refLabel}: {copy.ref}
            </p>
          </div>
          <p className="a4-stamp">{copy.stamp}</p>
        </div>
        <p className="t-label-caps">
          01 / {copy.s01}
        </p>
        <div className="a4-summary">
          <div>
            <p className="t-label-caps">{copy.totalLabel}</p>
            <p className="tnum">{formatTonnes(total, locale)}</p>
            <p className="t-label-code">{copy.totalUnit}</p>
          </div>
          <div>
            <p className="t-label-caps">{copy.s12}</p>
            <p className="tnum">{formatTonnes(s12, locale)}</p>
            <p className="t-label-code">t CO₂E ({share})</p>
          </div>
          <div>
            <p className="t-label-caps">{copy.s3}</p>
            <p className="tnum">{formatTonnes(s3, locale)}</p>
            <p className="t-label-code">
              t CO₂E ({total === 0 ? "0%" : formatShare(s3 / total, locale)})
            </p>
          </div>
        </div>
        <p className="t-label-caps">02 / {copy.s02}</p>
        <div className="cm-table-wrap">
          <table className="cm-table">
          <thead>
            <tr>
              <th scope="col">{copy.colScope}</th>
              <th scope="col">{copy.colClass}</th>
              <th scope="col">{copy.colActivity}</th>
              <th scope="col" className="num">
                {copy.colT}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.code}>
                <td>{row.code}</td>
                <td>{row.activity}</td>
                <td>{row.activity}</td>
                <td className="tnum num">{formatTonnes(row.tonnes, locale)}</td>
              </tr>
            ))}
          </tbody>
          </table>
        </div>
        <p className="t-label-caps">03 / {copy.s03}</p>
        <div className="a4-intensity">
          <div>
            <p className="t-label-caps">{copy.headcount}</p>
            <p className="tnum">
              {formatAmount(headcount, locale)} FTE
            </p>
          </div>
          <div>
            <p className="t-label-caps">{copy.intensityLabel}</p>
            <p className="tnum">
              {intensity === null ? copy.insufficient : `${formatTonnes(intensity, locale)} ${copy.intensity}`}
            </p>
          </div>
        </div>
        <p className="t-label-caps">{copy.signTitle}</p>
        <p className="a4-sign">{copy.signName}</p>
        <p className="t-label-code">{copy.signOrg}</p>
        <p className="t-label-code">
          {copy.pageNote} · {checkCode} · {frameworks.join(" / ") || "—"}
        </p>
      </div>
    </div>
  );
}
