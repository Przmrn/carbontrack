// Floating How-to-use dialog for the calculator (modal, not a route).
"use client";

import type { MouseEvent, RefObject } from "react";
import { useLanguage } from "../LanguageProvider";

interface HowToDialogProps {
  dialogRef: RefObject<HTMLDialogElement | null>;
}

export default function HowToDialog({ dialogRef }: HowToDialogProps) {
  const { copy } = useLanguage();
  const howTo = copy.calculator.howTo;

  function close(): void {
    dialogRef.current?.close();
  }

  function handleBackdrop(event: MouseEvent<HTMLDialogElement>): void {
    if (event.target === event.currentTarget) close();
  }

  return (
    <dialog
      ref={dialogRef}
      className="calc-dialog"
      aria-labelledby="howto-title"
      onClick={handleBackdrop}
    >
      <div className="calc-dialog-head">
        <h2 id="howto-title">{howTo.title}</h2>
        <button
          type="button"
          className="calc-close"
          onClick={close}
          aria-label={copy.common.close}
        >
          ×
        </button>
      </div>
      <p>{howTo.intro}</p>
      <ol className="calc-steps">
        {howTo.steps.map((step, index) => (
          <li key={step.title}>
            <span className="tnum">0{index + 1}</span>
            <div>
              <p className="calc-step-title">{step.title}</p>
              <p className="calc-step-desc">{step.desc}</p>
            </div>
          </li>
        ))}
      </ol>
    </dialog>
  );
}
