// A4 vector preview: executive summary, breakdown, intensity, sign-off.
import { toKg } from "../../lib/emissions";
import { formatAmount, formatShare, formatTonnes } from "../../lib/format";
import type { ActivityEntry } from "../../lib/emissions";
import { en } from "../../content/en";

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
  const copy = en.dossier.a4;
  const rows: A4Row[] = [
    { code: "S1.01", activity: "Mobile Combustion (Fleet)", tonnes: tonnesFor(entries, ["S1.01"]) },
    { code: "S1.02", activity: "Stationary Heating Natural Gas", tonnes: tonnesFor(entries, ["S1.02"]) },
    { code: "S1.03", activity: "Refrigerant Gases", tonnes: tonnesFor(entries, ["S1.03", "S1.04"]) },
    { code: "S2.01", activity: "Purchased Electricity (Grid)", tonnes: tonnesFor(entries, ["S2.01"]) },
    { code: "S2.02", activity: "District Heating", tonnes: tonnesFor(entries, ["S2.02"]) },
    { code: "S3.01", activity: "Business Travel & Aviation", tonnes: tonnesFor(entries, ["S3.01", "S3.02", "S3.03"]) },
    { code: "S3.02", activity: "Cloud Compute", tonnes: tonnesFor(entries, ["S3.04"]) },
    { code: "S3.03", activity: "Freight & Logistics", tonnes: tonnesFor(entries, ["S3.05"]) },
  ];
  const share = total === 0 ? "0%" : formatShare(s12 / total);

  return (
    <div>
      <div className="dossier-preview-head">
        <p className="t-label-caps">■ {en.dossier.previewTag}</p>
        <span className="t-label-code">{en.dossier.previewNote}</span>
        <span className="t-label-code">{en.dossier.scale}</span>
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
            <p className="tnum">{formatTonnes(total)}</p>
            <p className="t-label-code">{copy.totalUnit}</p>
          </div>
          <div>
            <p className="t-label-caps">{copy.s12}</p>
            <p className="tnum">{formatTonnes(s12)}</p>
            <p className="t-label-code">t CO₂E ({share})</p>
          </div>
          <div>
            <p className="t-label-caps">{copy.s3}</p>
            <p className="tnum">{formatTonnes(s3)}</p>
            <p className="t-label-code">t CO₂E ({total === 0 ? "0%" : formatShare(s3 / total)})</p>
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
                <td>{copy.rows.find((item) => item.code === row.code)?.class ?? row.code}</td>
                <td>{row.activity}</td>
                <td className="tnum num">{formatTonnes(row.tonnes)}</td>
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
              {formatAmount(headcount)} FTE
            </p>
          </div>
          <div>
            <p className="t-label-caps">{copy.intensityLabel}</p>
            <p className="tnum">
              {intensity === null ? copy.insufficient : `${formatTonnes(intensity)} ${copy.intensity}`}
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
