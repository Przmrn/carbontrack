// Global footer: four metadata columns plus legal strip (claims per §8).
"use client";

import Link from "next/link";
import { useLanguage } from "./LanguageProvider";

export default function Footer() {
  const { copy } = useLanguage();

  return (
    <footer className="cm-footer">
      <div className="cm-footer-grid">
        {copy.footer.cols.map((col) => (
          <div key={col.k}>
            <p className="t-label-caps">{col.k}</p>
            {col.lines.map((line) => (
              <p key={line} className="t-label-code cm-footer-line">
                {line}
              </p>
            ))}
          </div>
        ))}
      </div>
      <div className="cm-footer-legal t-label-code">
        <span>{copy.footer.legal}</span>
        <Link href="/glossary">{copy.footer.glossary}</Link>
        <span>{copy.footer.rev}</span>
      </div>
    </footer>
  );
}
