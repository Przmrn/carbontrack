// Shared section frame for the DHL reference page.
"use client";

import type { ReactNode } from "react";
import { useLanguage } from "../LanguageProvider";

interface DhlSectionProps {
  id: string;
  n: string;
  title: string;
  children: ReactNode;
}

export default function DhlSection({ id, n, title, children }: DhlSectionProps) {
  const { copy } = useLanguage();
  return (
    <section id={id} aria-label={title} className="dhl-section">
      <p className="t-label-caps">
        {copy.common.section} {n}
      </p>
      <h2 className="t-headline-sm">{title}</h2>
      {children}
    </section>
  );
}
