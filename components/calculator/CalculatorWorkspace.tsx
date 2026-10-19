// Calculator workspace: plain-language hero, activity cards, result panel.
// No animation here on purpose: the Calculator is an instant instrument.
"use client";

import { useRef, useState } from "react";
import {
  emptyCalculatorState,
  isSampleState,
  sampleCalculatorState,
} from "../../lib/calculator";
import { useLanguage } from "../LanguageProvider";
import { useCalculatorStore } from "./CalculatorStore";
import CalculatorCards from "./CalculatorCards";
import CalculatorLedger from "./CalculatorLedger";
import HowToDialog from "./HowToDialog";

export default function CalculatorWorkspace() {
  const { state, ledger, patch } = useCalculatorStore();
  const { copy } = useLanguage();
  const howToRef = useRef<HTMLDialogElement | null>(null);
  const [loadVersion, setLoadVersion] = useState(0);

  function reset(): void {
    patch(emptyCalculatorState);
    setLoadVersion((version) => version + 1);
  }

  function loadSample(): void {
    patch(sampleCalculatorState);
    setLoadVersion((version) => version + 1);
  }

  return (
    <div className="calc-root">
      <section className="cm-container calc-hero">
        <p className="t-label-code">{copy.calculator.eyebrow}</p>
        <h1 className="t-headline-lg">{copy.calculator.title}</h1>
        <div className="calc-hero-row">
          <p className="calc-intro">{copy.calculator.intro}</p>
          <button
            type="button"
            className="cm-btn cm-btn-outline"
            onClick={() => howToRef.current?.showModal()}
          >
            [ {copy.calculator.howToButton} ]
          </button>
        </div>
      </section>

      <div className="cm-container calc-grid">
        <div className="calc-cards-column">
          <CalculatorCards key={loadVersion} state={state} rows={ledger.rows} onPatch={patch} />
        </div>
        <CalculatorLedger
          ledger={ledger}
          sampleActive={isSampleState(state)}
          onReset={reset}
          onSample={loadSample}
        />
      </div>
      <HowToDialog dialogRef={howToRef} />
    </div>
  );
}
