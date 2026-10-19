// Audit dossier workspace: parameters plus live A4 preview and exports.
"use client";

import { useEffect, useMemo, useState } from "react";
import { buildDossierEntries } from "../../lib/dossier";
import { totalByScope } from "../../lib/emissions";
import { buildCsv, buildJson } from "../../lib/export";
import { sha256Hex, shortHash } from "../../lib/checksum";
import { en } from "../../content/en";
import { useLanguage } from "../LanguageProvider";
import { useCalculatorStore } from "../calculator/CalculatorStore";
import DossierParams, { type ExportFormat } from "./DossierParams";
import DossierPreview from "./DossierPreview";

function download(text: string, filename: string, mime: string): void {
  const blob = new Blob([text], { type: `${mime};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export default function DossierWorkspace() {
  const { state } = useCalculatorStore();
  const { copy: ui } = useLanguage();
  const [intervalIndex, setIntervalIndex] = useState<number>(0);
  const [frameworks, setFrameworks] = useState<boolean[]>([true, true, true, false]);
  const [format, setFormat] = useState<ExportFormat>("PDF");
  const [headcount, setHeadcount] = useState<number>(0);
  const [checkCode, setCheckCode] = useState<string>("…");

  const entries = useMemo(() => buildDossierEntries(state), [state]);
  const totals = useMemo(() => totalByScope(entries), [entries]);
  const s12 = totals.s1 + totals.s2;
  const intensity = headcount > 0 ? totals.total / headcount : null;
  const selectedFrameworks = en.dossier.frameworks
    .filter((_, index) => frameworks[index] ?? false)
    .map((framework) => framework.name);
  const json = useMemo(
    () => buildJson(entries, `dossier-cycle-${intervalIndex + 1}`),
    [entries, intervalIndex],
  );

  useEffect(() => {
    let live = true;
    sha256Hex(json)
      .then((hex) => {
        if (live) setCheckCode(shortHash(hex, 6, 4));
      })
      .catch(() => {
        if (live) setCheckCode("—");
      });
    return () => {
      live = false;
    };
  }, [json]);

  function handleCompile(): void {
    if (format === "PDF") {
      window.print();
    } else if (format === "JSON") {
      download(json, `dossier-cycle-${intervalIndex + 1}.json`, "application/json");
    } else if (format === "CSV") {
      download(buildCsv(entries), `dossier-cycle-${intervalIndex + 1}.csv`, "text/csv");
    }
  }

  function toggleFramework(index: number): void {
    if (index === 0) return;
    setFrameworks((prev) => prev.map((on, i) => (i === index ? !on : on)));
  }

  const copy = en.dossier;
  return (
    <div className="dossier-root">
      <section className="cm-container dossier-hero">
        <p className="t-label-code">[ {copy.eyebrow} ]</p>
        <h1 className="t-headline-lg">{copy.title}</h1>
        <p className="dossier-intro">{copy.intro}</p>
        {totals.total === 0 ? (
          <p className="dossier-empty-hint">{ui.dossier.emptyHint}</p>
        ) : null}
      </section>
      <div className="cm-container dossier-grid">
        <DossierParams
          intervalIndex={intervalIndex}
          onInterval={setIntervalIndex}
          frameworks={frameworks}
          onToggleFramework={toggleFramework}
          headcount={headcount}
          onHeadcount={setHeadcount}
          checkCode={checkCode}
          format={format}
          onFormat={setFormat}
          onCompile={handleCompile}
        />
        <div>
          <DossierPreview
            entries={entries}
            total={totals.total}
            s12={s12}
            s3={totals.s3}
            frameworks={selectedFrameworks}
            headcount={headcount}
            intensity={intensity}
            checkCode={checkCode}
          />
          <button
            type="button"
            className="cm-btn cm-btn-outline dossier-print"
            onClick={() => window.print()}
          >
            [ {copy.printBtn} ]
          </button>
        </div>
      </div>
    </div>
  );
}
