// Mobile tab bar for the Struk page: jumps to receipt, inputs, analysis, factors.
"use client";

import { useLanguage } from "../LanguageProvider";

export default function MobileTabBar() {
  const { copy: ui } = useLanguage();
  const items = [
    { label: ui.struk.tabbar.receipt, href: "#struk-receipt" },
    { label: ui.struk.tabbar.ledger, href: "#struk-inputs" },
    { label: ui.struk.tabbar.analysis, href: "#struk-analysis" },
    { label: ui.struk.tabbar.scopes, href: "#struk-factors" },
  ];
  return (
    <nav className="struk-tabbar" aria-label={ui.struk.tabbar.receipt}>
      {items.map((item) => (
        <a key={item.href} href={item.href}>
          {item.label}
        </a>
      ))}
    </nav>
  );
}
