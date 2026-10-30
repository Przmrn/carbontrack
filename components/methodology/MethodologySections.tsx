// Methodology sections 01–06: demarcation, formulas, lineage, topology, DHL link.
"use client";

import Link from "next/link";
import { calculatorFactors, strukFactors } from "../../data/factors";
import { formatFactor } from "../../lib/format";
import { statusForFactor } from "../../lib/export";
import { factorLabel, intlLocale } from "../../lib/i18n";
import { useLanguage } from "../LanguageProvider";
import Formula from "./Formula";

function ScopeChip({ scope }: { scope: 1 | 2 | 3 }) {
  return <span className={`scope-chip scope-s${scope}`}>SCOPE {scope}</span>;
}

export default function MethodologySections() {
  const { lang, copy: ui } = useLanguage();
  const copy = ui.methodology;
  const locale = intlLocale(lang);
  const allFactors = [...strukFactors, ...calculatorFactors];
  return (
    <div className="method-sections">
      <section id="s01" aria-label={copy.s01.title} className="method-sec">
        <p className="t-label-caps">{ui.common.section} 01 // {copy.s01.title}</p>
        <p>{copy.s01.body}</p>
        <div className="method-cols-3">
          {copy.s01.cols.map((col, index) => (
            <div key={col.scope}>
              <ScopeChip scope={index === 0 ? 1 : index === 1 ? 2 : 3} />
              <p className="t-label-code">{col.tag}</p>
              <p>{col.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="s02" aria-label={copy.s02.title} className="method-sec">
        <p className="t-label-caps">{ui.common.section} 02 // {copy.s02.title}</p>
        <p>{copy.s02.body}</p>
        {copy.s02.formulas.map((formula) => (
          <Formula key={formula.label} label={formula.label} tex={formula.tex} />
        ))}
      </section>

      <section id="s03" aria-label={copy.s03.title} className="method-sec">
        <p className="t-label-caps">{ui.common.section} 03 // {copy.s03.title}</p>
        <p>{copy.s03.body}</p>
        <div className="cm-table-wrap">
          <table className="cm-table">
            <thead>
              <tr>
                <th scope="col">{copy.s03.colId}</th>
                <th scope="col">{copy.s03.colSubstance}</th>
                <th scope="col">{copy.s03.colScope}</th>
                <th scope="col" className="num">{copy.s03.colFactor}</th>
                <th scope="col">{copy.s03.colUnit}</th>
                <th scope="col">{copy.s03.colSource}</th>
                <th scope="col">{copy.s03.colStatus}</th>
              </tr>
            </thead>
            <tbody>
              {allFactors.map((factor) => (
                <tr key={factor.id}>
                  <td className="tnum">{factor.id}</td>
                  <td>{factorLabel(factor, lang)}</td>
                  <td>
                    <ScopeChip scope={factor.scope} />
                  </td>
                  <td className="tnum num">{formatFactor(factor.value, locale)}</td>
                  <td>{factor.unit}</td>
                  <td>{factor.source ?? "—"}</td>
                  <td>
                    <span className="cm-demo">{statusForFactor(factor)}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="s04" aria-label={copy.s04.title} className="method-sec">
        <p className="t-label-caps">{ui.common.section} 04 // {copy.s04.title}</p>
        <p>{copy.s04.body}</p>
        <pre className="method-topology tnum" aria-label={copy.s04.title}>
          {copy.s04.diagram}
        </pre>
      </section>

      <section id="s05" aria-label={copy.s05.title} className="method-sec">
        <p className="t-label-caps">{ui.common.section} 05 // {copy.s05.title}</p>
        <p>{copy.s05.body}</p>
        <p>
          <span className="cm-demo">{copy.s05.illustrative}</span>
        </p>
      </section>

      <section id="s06" aria-label={copy.s06.title} className="method-sec">
        <p className="t-label-caps">{ui.common.section} 06 // {copy.s06.title}</p>
        <p>{copy.s06.body}</p>
        <p>
          <Link className="cm-btn cm-btn-outline" href="/methodology/dhl">
            [ {copy.s06.link} ]
          </Link>
        </p>
      </section>
    </div>
  );
}
