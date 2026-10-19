// Result panel: yearly total, demo strip, plain scope bar, biggest three,
// report/reset/sample actions. Static on desktop, bottom bar on mobile.
"use client";

import { useState } from "react";
import Link from "next/link";
import type { Ledger } from "../../lib/calculator";
import { formatShare, formatTonnes } from "../../lib/format";
import { intlLocale } from "../../lib/i18n";
import { useLanguage } from "../LanguageProvider";
import EmissionsChart from "./EmissionsChart";

interface CalculatorLedgerProps {
  ledger: Ledger;
  sampleActive: boolean;
  onReset: () => void;
  onSample: () => void;
}

export default function CalculatorLedger({
  ledger,
  sampleActive,
  onReset,
  onSample,
}: CalculatorLedgerProps) {
  const { lang, copy } = useLanguage();
  const labels = copy.calculator.ledger;
  const locale = intlLocale(lang);
  const [open, setOpen] = useState(false);
  const hasTotal = ledger.total > 0;
  const parts = [ledger.s1, ledger.s2, ledger.s3];
  const share = (value: number): number => (hasTotal ? value / ledger.total : 0);
  const barLabel = labels.legends
    .map((label, index) => `${label} ${formatShare(share(parts[index]), locale)}`)
    .join(", ");

  return (
    <aside className="cal-panel" aria-label={labels.tag} data-open={open}>
      <div className="cal-panel-top">
        <div className="cal-panel-head">
          <p className="cal-panel-tag">{labels.tag}</p>
          <p className="cal-panel-total" aria-live="polite">
            {hasTotal ? (
              <>
                <span className="tnum">{formatTonnes(ledger.total, locale)}</span>{" "}
                <span className="cal-panel-unit">{labels.unit}</span>
              </>
            ) : (
              <span className="cal-panel-empty">{labels.empty}</span>
            )}
          </p>
          {hasTotal ? null : <p className="cal-empty-hint">{labels.emptyHint}</p>}
        </div>
        <button
          type="button"
          className="cal-panel-toggle"
          aria-expanded={open}
          onClick={() => setOpen((previous) => !previous)}
        >
          {open ? labels.collapse : labels.expand}
        </button>
      </div>

      <p className="cal-strip">{labels.strip}</p>
      {sampleActive ? <p className="cal-sample-note">{labels.sampleActive}</p> : null}

      <div className="cal-panel-body">
        {hasTotal ? (
          <>
            <div className="cal-bar" role="img" aria-label={barLabel}>
              {(["s1", "s2", "s3"] as const).map((key, index) => (
                <span
                  key={key}
                  className={`cal-bar-seg cal-bar-${key}`}
                  style={{ width: `${share(parts[index]) * 100}%` }}
                />
              ))}
            </div>
            <ul className="cal-legends">
              {labels.legends.map((label, index) => (
                <li key={label}>
                  <span className={`cal-dot cal-dot-${index + 1}`} aria-hidden="true" />
                  <span className="cal-legend-label">{label}</span>
                  <span className="tnum">{formatShare(share(parts[index]), locale)}</span>
                </li>
              ))}
            </ul>
            <EmissionsChart ledger={ledger} />
          </>
        ) : null}

        <div className="cal-actions">
          {hasTotal ? (
            <Link className="cm-btn cm-btn-primary" href="/dossier">
              [ {labels.viewReport} ]
            </Link>
          ) : (
            <button type="button" className="cm-btn cm-btn-primary" disabled>
              [ {labels.viewReport} ]
            </button>
          )}
          <button type="button" className="cm-btn cm-btn-outline" onClick={onReset}>
            [ {labels.reset} ]
          </button>
          {hasTotal ? null : (
            <button type="button" className="cm-btn cm-btn-outline" onClick={onSample}>
              [ {labels.sample} ]
            </button>
          )}
        </div>
        <p className="cal-dhl-note">{labels.dhlNote}</p>
      </div>
    </aside>
  );
}
