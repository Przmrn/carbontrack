// Dossier parameters: interval, frameworks, headcount, integrity, formats.
import { en } from "../../content/en";
import NumberInput from "../ui/NumberInput";

export type ExportFormat = "PDF" | "JSON" | "CSV" | "XBRL";

interface DossierParamsProps {
  intervalIndex: number;
  onInterval: (index: number) => void;
  frameworks: boolean[];
  onToggleFramework: (index: number) => void;
  headcount: number;
  onHeadcount: (value: number) => void;
  checkCode: string;
  format: ExportFormat;
  onFormat: (format: ExportFormat) => void;
  onCompile: () => void;
}

const FORMATS: ExportFormat[] = ["PDF", "JSON", "CSV", "XBRL"];

export default function DossierParams({
  intervalIndex,
  onInterval,
  frameworks,
  onToggleFramework,
  headcount,
  onHeadcount,
  checkCode,
  format,
  onFormat,
  onCompile,
}: DossierParamsProps) {
  const copy = en.dossier;
  return (
    <div className="dossier-params">
      <div className="dossier-params-head">
        <p className="t-label-caps">
          SECTION 01 {copy.paramsTitle}
        </p>
        <span className="t-label-code">{copy.ledgerRef}</span>
      </div>
      <p className="t-label-code">{copy.figuresNote}</p>

      <p className="t-label-caps">{copy.intervalLabel}</p>
      <div className="dossier-intervals" role="group" aria-label={copy.intervalLabel}>
        {copy.intervals.map((item, index) => (
          <button
            key={item.sub}
            type="button"
            aria-pressed={intervalIndex === index}
            onClick={() => onInterval(index)}
          >
            <span>{item.label}</span>
            <span>{item.sub}</span>
          </button>
        ))}
      </div>
      <p className="t-label-code" aria-live="polite">
        {copy.intervals[intervalIndex].window}
      </p>

      <details className="cm-disclosure">
        <summary className="t-label-caps">{copy.frameworksLabel}</summary>
        <ul className="dossier-frameworks">
          {copy.frameworks.map((framework, index) => (
            <li key={framework.name}>
              <label>
                <input
                  type="checkbox"
                  checked={frameworks[index] ?? false}
                  disabled={index === 0}
                  onChange={() => onToggleFramework(index)}
                />
                <span>
                  <span className="dossier-fw-name">{framework.name}</span>
                  <span className="t-label-code">{framework.desc}</span>
                </span>
                <span className="cm-demo">{framework.tag}</span>
              </label>
            </li>
          ))}
        </ul>
      </details>

      <div className="dossier-integrity">
        <p className="t-label-caps">{copy.integrityTitle}</p>
        <p className="t-label-code">{copy.integrityNote}</p>
        <p className="t-label-code" aria-live="polite">
          {copy.checksumLabel}: {checkCode}
        </p>
      </div>

      <NumberInput
        id="dossier-headcount"
        label={copy.headcountLabel}
        value={headcount}
        unit={copy.headcountUnit}
        help={copy.headcountHelp}
        onChange={onHeadcount}
      />

      <p className="t-label-caps">{copy.formatsLabel}</p>
      <div className="dossier-formats" role="group" aria-label={copy.formatsLabel}>
        {FORMATS.map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={format === item}
            disabled={item === "XBRL"}
            title={item === "XBRL" ? copy.xbrlNote : undefined}
            onClick={() => onFormat(item)}
          >
            {copy.formats[FORMATS.indexOf(item)]}
          </button>
        ))}
      </div>
      <p className="t-label-code">{copy.xbrlNote}</p>

      <button type="button" className="cm-btn cm-btn-primary dossier-compile" onClick={onCompile}>
        [ {copy.compile} ]
      </button>
      <button type="button" className="cm-btn cm-btn-outline" disabled title={copy.sendNote}>
        [ {copy.sendAuditor} ]
      </button>
      <p className="t-label-code">{copy.sendNote}</p>
    </div>
  );
}
