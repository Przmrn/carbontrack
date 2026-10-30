// Section 01: the two DHL publications, period, boundary and standards.
"use client";

import { useLanguage } from "../LanguageProvider";
import ClaimTag from "./ClaimTag";
import DhlSection from "./DhlSection";

export default function DhlAbout({ n }: { n: string }) {
  const { copy: ui } = useLanguage();
  const copy = ui.dhl.about;
  return (
    <DhlSection id="dhl-about" n={n} title={copy.title}>
      <p>{copy.intro}</p>
      <p>
        <ClaimTag tag={copy.introTag} />
      </p>
      <dl className="dhl-facts">
        {copy.facts.map((fact) => (
          <div key={fact.label} className="dhl-fact">
            <dt>
              <span className="t-label-caps">{fact.label}</span>
              <ClaimTag tag={fact.tag} />
            </dt>
            <dd className="tnum">{fact.value}</dd>
          </div>
        ))}
      </dl>
    </DhlSection>
  );
}
