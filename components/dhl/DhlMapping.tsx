// Section 08: how this build maps to the calculator (DHL-METHODOLOGY §9).
"use client";

import { useLanguage } from "../LanguageProvider";
import ClaimTag from "./ClaimTag";
import DhlSection from "./DhlSection";

export default function DhlMapping({ n }: { n: string }) {
  const { copy: ui } = useLanguage();
  const copy = ui.dhl.mapping;
  return (
    <DhlSection id="dhl-mapping" n={n} title={copy.title}>
      <p>
        {copy.intro} <ClaimTag tag={copy.introTag} />
      </p>
      <div className="cm-table-wrap">
        <table className="cm-table dhl-mapping-table">
          <caption className="cm-table-caption t-label-caps">{copy.caption}</caption>
          <thead>
            <tr>
              <th scope="col">{copy.columns.app}</th>
              <th scope="col">{copy.columns.basedOn}</th>
              <th scope="col">{copy.columns.evidence}</th>
            </tr>
          </thead>
          <tbody>
            {copy.rows.map((row) => (
              <tr key={row.app}>
                <td>{row.app}</td>
                <td>{row.basedOn}</td>
                <td>
                  <ClaimTag tag={row.tag} />
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
