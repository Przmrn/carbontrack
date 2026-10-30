// Section 07: the disclosure gaps from DHL-METHODOLOGY §8.
"use client";

import { useLanguage } from "../LanguageProvider";
import ClaimTag from "./ClaimTag";
import DhlSection from "./DhlSection";

export default function DhlLimits({ n }: { n: string }) {
  const { copy: ui } = useLanguage();
  const copy = ui.dhl.limits;
  return (
    <DhlSection id="dhl-limits" n={n} title={copy.title}>
      <p>
        {copy.intro} <ClaimTag tag={copy.introTag} />
      </p>
      <ol className="dhl-limits">
        {copy.items.map((item) => (
          <li key={item}>
            <span>{item}</span>
            <ClaimTag tag={copy.itemTag} />
          </li>
        ))}
      </ol>
      <p className="dhl-note">
        {copy.conclusion} <ClaimTag tag={copy.conclusionTag} />
      </p>
      <p className="dhl-note">
        {copy.statbookNote} <ClaimTag tag={copy.statbookTag} />
      </p>
    </DhlSection>
  );
}
