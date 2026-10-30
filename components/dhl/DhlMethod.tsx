// Section 03: DHL's per-scope methods and the published data-quality shares.
"use client";

import { intlLocale } from "../../lib/i18n";
import { useLanguage } from "../LanguageProvider";
import ClaimTag from "./ClaimTag";
import DhlSection from "./DhlSection";
import { dhlSeries } from "./dhlSeries";
import { formatDhlValue } from "./formatDhl";

export default function DhlMethod({ n }: { n: string }) {
  const { lang, copy: ui } = useLanguage();
  const copy = ui.dhl.method;
  const locale = intlLocale(lang);

  return (
    <DhlSection id="dhl-method" n={n} title={copy.title}>
      <p>
        {copy.intro} <ClaimTag tag={copy.introTag} />
      </p>

      <div className="dhl-standard-form">
        <div className="dhl-standard-head">
          <p className="t-label-caps">{copy.standard.label}</p>
          <ClaimTag tag={copy.standard.tag} />
        </div>
        <p className="dhl-formula tnum">{copy.standard.formula}</p>
        <p>{copy.standard.body}</p>
      </div>

      <div className="cm-table-wrap">
        <table className="cm-table dhl-method-table">
          <caption className="cm-table-caption t-label-caps">{copy.caption}</caption>
          <thead>
            <tr>
              <th scope="col">{copy.columns.part}</th>
              <th scope="col">{copy.columns.method}</th>
              <th scope="col">{copy.columns.data}</th>
              <th scope="col">{copy.columns.cite}</th>
              <th scope="col">{copy.columns.evidence}</th>
            </tr>
          </thead>
          <tbody>
            {copy.rows.map((row) => (
              <tr key={row.part}>
                <td>{row.part}</td>
                <td>{row.method}</td>
                <td>{row.data}</td>
                <td className="t-label-code tnum">{row.cite}</td>
                <td>
                  <ClaimTag tag={row.tag} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="dhl-note">
        {copy.citeNote} <ClaimTag tag={copy.citeTag} />
      </p>

      <div className="dhl-quality">
        <div className="dhl-quality-head">
          <p className="t-label-caps">{copy.quality.title}</p>
          <ClaimTag tag={copy.quality.tag} />
        </div>
        <div className="dhl-quality-grid">
          {copy.quality.groups.map((group) => (
            <div key={group.title} className="dhl-quality-group">
              <p className="t-label-code">{group.title}</p>
              <dl>
                {group.rows.map((row) => {
                  const item = dhlSeries(row.key);
                  return (
                    <div key={row.key} className="dhl-quality-row">
                      <dt>{row.label}</dt>
                      <dd className="tnum">
                        {formatDhlValue(item?.v["2025"] ?? null, item?.unit ?? "", locale)}
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </div>
          ))}
        </div>
        <p className="dhl-note">
          {copy.quality.note} <ClaimTag tag={copy.quality.tag} />
        </p>
      </div>
    </DhlSection>
  );
}
