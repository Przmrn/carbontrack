// One activity card: title, plain help, ADA|TIDAK ADA toggle, fields,
// one result line and a closed-by-default calculation detail.
"use client";

import type { ReactNode } from "react";
import { formatAmount } from "../../lib/format";
import { intlLocale } from "../../lib/i18n";
import { useLanguage } from "../LanguageProvider";
import Segmented from "../ui/Segmented";

interface CardShellProps {
  id: string;
  title: string;
  help: string;
  ada: boolean;
  onAdaChange: (ada: boolean) => void;
  /** kg CO₂e for this card, or null when nothing is entered. */
  resultKg: number | null;
  children: ReactNode;
  detail: ReactNode;
}

export default function CardShell({
  id,
  title,
  help,
  ada,
  onAdaChange,
  resultKg,
  children,
  detail,
}: CardShellProps) {
  const { lang, copy } = useLanguage();
  const cards = copy.calculator.cards;
  const locale = intlLocale(lang);

  return (
    <article className="cal-card" id={id} data-ada={ada}>
      <header className="cal-card-head">
        <div className="cal-card-text">
          <h2 className="cal-card-title">{title}</h2>
          <p className="cal-card-help">{help}</p>
        </div>
        <Segmented
          label={title}
          options={[cards.yes, cards.no]}
          value={ada ? cards.yes : cards.no}
          onChange={(value) => onAdaChange(value === cards.yes)}
        />
      </header>
      {ada ? (
        <div className="cal-card-body">
          {children}
          <p className="cal-card-result" aria-live="polite">
            {resultKg === null ? (
              <span className="cal-card-empty">{cards.emptyResult}</span>
            ) : (
              <>
                <span aria-hidden="true">≈ </span>
                <strong className="cal-card-value tnum">
                  {formatAmount(resultKg, locale)} {cards.kgUnit}
                </strong>{" "}
                {cards.perYear}
              </>
            )}
          </p>
          <details className="cal-detail">
            <summary>{copy.calculator.detail.open}</summary>
            {detail}
          </details>
        </div>
      ) : null}
    </article>
  );
}
