// Mobile-only bottom tab bar with in-page anchors (≤767px via CSS).
import { en } from "../../content/en";

const ITEMS = [
  { label: en.struk.tabbar.receipt, href: "#struk-receipt" },
  { label: en.struk.tabbar.ledger, href: "#struk-inputs" },
  { label: en.struk.tabbar.analysis, href: "#struk-analysis" },
  { label: en.struk.tabbar.scopes, href: "#struk-factors" },
];

export default function MobileTabBar() {
  return (
    <nav className="struk-tabbar" aria-label={en.struk.tabbar.receipt}>
      {ITEMS.map((item) => (
        <a key={item.href} href={item.href}>
          {item.label}
        </a>
      ))}
    </nav>
  );
}
