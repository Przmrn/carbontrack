// Methodology aside: sticky codex index, axiom card and principle quote.
import { en } from "../../content/en";
import Formula from "./Formula";

const ANCHORS = ["s01", "s02", "s03", "s04", "s05"];

export default function MethodologyAside() {
  const copy = en.methodology;
  return (
    <div className="method-aside">
      <p className="t-label-caps">
        00 / {copy.asideTitle} [{copy.codex.length} SECTIONS]
      </p>
      <ol className="method-codex">
        {copy.codex.map((item, index) => (
          <li key={item}>
            <a href={`#${ANCHORS[index]}`}>
              0{index + 1} {item}
            </a>
          </li>
        ))}
      </ol>
      <div className="method-axiom">
        <p className="t-label-caps">{copy.axiomTitle}</p>
        <Formula label="AXIOM" tex={copy.axiom} />
        {copy.axiomLegend.map((line) => (
          <p key={line} className="t-label-code">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}
