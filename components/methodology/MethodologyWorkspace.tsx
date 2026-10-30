// Methodology workspace: hero, codex grid, verify/export/print actions.
"use client";

import { useEffect, useMemo, useState } from "react";
import { calculatorFactors, strukFactors } from "../../data/factors";
import { buildFactorCsv, buildFactorJson } from "../../lib/export";
import { sha256Hex, shortHash } from "../../lib/checksum";
import { useLanguage } from "../LanguageProvider";
import MethodologyAside from "./MethodologyAside";
import MethodologySections from "./MethodologySections";

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

export default function MethodologyWorkspace() {
  const { copy: ui } = useLanguage();
  const copy = ui.methodology;
  const [storedHash, setStoredHash] = useState<string>("…");
  const [verdict, setVerdict] = useState<string | null>(null);

  const factorJson = useMemo(
    () => buildFactorJson([...strukFactors, ...calculatorFactors], "factor-db-v1"),
    [],
  );

  useEffect(() => {
    let live = true;
    sha256Hex(factorJson)
      .then((hex) => {
        if (live) setStoredHash(shortHash(hex, 6, 4));
      })
      .catch(() => {
        if (live) setStoredHash("—");
      });
    return () => {
      live = false;
    };
  }, [factorJson]);

  function handleExportDb(): void {
    download(
      buildFactorCsv([...strukFactors, ...calculatorFactors]),
      "factor-db.csv",
      "text/csv",
    );
    download(factorJson, "factor-db.json", "application/json");
  }

  async function handleVerify(): Promise<void> {
    try {
      const fresh = await sha256Hex(factorJson);
      setVerdict(shortHash(fresh, 6, 4) === storedHash ? copy.actions.match : copy.actions.mismatch);
    } catch {
      setVerdict(copy.actions.mismatch);
    }
  }

  return (
    <div className="method-root">
      <section className="cm-container method-hero">
        <p className="t-label-code">{copy.eyebrow}</p>
        <h1 className="t-headline-lg">{copy.title}</h1>
        <div className="method-chips">
          {copy.chips.map((chip) => (
            <span key={chip} className="cm-demo">
              {chip}
            </span>
          ))}
        </div>
      </section>
      <div className="cm-container method-grid">
        <MethodologyAside />
        <div>
          <MethodologySections />
          <div className="method-actions">
            <button type="button" className="cm-btn cm-btn-outline" onClick={() => window.print()}>
              [ {copy.actions.whitepaper} ]
            </button>
            <button type="button" className="cm-btn cm-btn-outline" onClick={handleExportDb}>
              [ {copy.actions.exportDb} ]
            </button>
            <button type="button" className="cm-btn cm-btn-primary" onClick={handleVerify}>
              [ {copy.actions.verify} ]
            </button>
          </div>
          <p className="t-label-code" aria-live="polite">
            {copy.actions.hashLabel}: {storedHash}
            {verdict === null ? "" : ` · ${verdict}`}
          </p>
        </div>
      </div>
    </div>
  );
}
