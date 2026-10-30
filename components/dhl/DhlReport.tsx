// DHL reference page shell: hero, page statement, contents and live checks.
"use client";

import Link from "next/link";
import { DHL_PAGE_STATEMENT } from "../../content/dhl/shared";
import { runChecks, targetProgress } from "../../lib/dhl-checks";
import { useLanguage } from "../LanguageProvider";
import ClaimTag from "./ClaimTag";
import DhlAbout from "./DhlAbout";
import DhlChecks from "./DhlChecks";
import DhlFigures from "./DhlFigures";
import DhlLimits from "./DhlLimits";
import DhlMapping from "./DhlMapping";
import DhlMethod from "./DhlMethod";
import DhlSources from "./DhlSources";
import DhlTableauSection from "./DhlTableauSection";
import DhlTargets from "./DhlTargets";

export default function DhlReport() {
  const { copy: ui } = useLanguage();
  const copy = ui.dhl;
  const checks = runChecks("2025");
  const progress = targetProgress();
  const [s1, s2, s3, s4, s5, s6, s7, s8, s9] = copy.sections;

  return (
    <div className="dhl-root">
      <nav className="cm-container dhl-crumbs" aria-label={copy.backLink}>
        <Link href="/methodology">← {copy.backLink}</Link>
      </nav>

      <header className="cm-container dhl-hero">
        <p className="t-label-code">{copy.eyebrow}</p>
        <h1 className="t-headline-lg">{copy.title}</h1>
        <p className="dhl-subtitle t-label-code">{copy.subtitle}</p>
        <p className="dhl-intro">{copy.intro}</p>

        <div className="dhl-statement" role="note">
          <p className="t-label-caps">{copy.statementLabel}</p>
          <p>{DHL_PAGE_STATEMENT}</p>
        </div>

        <div className="dhl-tags-legend">
          <p className="t-label-caps">{copy.tagsLabel}</p>
          <ul>
            {copy.tags.map((tag) => (
              <li key={tag.key}>
                <ClaimTag tag={tag.key} />
                <span>{tag.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </header>

      <nav className="cm-container dhl-toc" aria-label={copy.tocLabel}>
        <p className="t-label-caps">{copy.tocLabel}</p>
        <ol>
          {copy.sections.map((section) => (
            <li key={section.id}>
              <a href={`#${section.id}`}>
                <span className="t-label-code">{section.n}</span>
                <span>{section.label}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="cm-container dhl-body">
        <DhlAbout n={s1.n} />
        <DhlFigures n={s2.n} />
        <DhlMethod n={s3.n} />
        <DhlTableauSection n={s4.n} />
        <DhlChecks n={s5.n} checks={checks} />
        <DhlTargets n={s6.n} progress={progress} />
        <DhlLimits n={s7.n} />
        <DhlMapping n={s8.n} />
        <DhlSources n={s9.n} />
      </div>
    </div>
  );
}
