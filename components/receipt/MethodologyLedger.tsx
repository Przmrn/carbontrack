// Section F: collapsed coefficient methodology and citation ledger.
import { strukFactors } from "../../data/factors";
import { formatFactor } from "../../lib/format";
import { statusForFactor } from "../../lib/export";
import { en } from "../../content/en";

export default function MethodologyLedger() {
  const copy = en.struk.secF;
  return (
    <details className="struk-sec" id="struk-factors">
      <summary className="t-label-caps">
        SECTION F // {copy.title}
      </summary>
      <div className="cm-table-wrap">
        <table className="cm-table">
          <thead>
            <tr>
              <th scope="col">{copy.colFactor}</th>
              <th scope="col">{copy.colUnit}</th>
              <th scope="col">{copy.colValue}</th>
              <th scope="col">{copy.colStatus}</th>
            </tr>
          </thead>
          <tbody>
            {strukFactors.map((factor) => (
              <tr key={factor.id}>
                <td>{factor.label}</td>
                <td>{factor.unit}</td>
                <td className="tnum num">{formatFactor(factor.value)}</td>
                <td>
                  <span className="cm-demo">{statusForFactor(factor)}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </details>
  );
}
