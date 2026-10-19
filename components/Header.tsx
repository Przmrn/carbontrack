// Global header: logo lockup, status label, ID|EN toggle, five module tabs.
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "./LanguageProvider";
import Logo from "./Logo";

export default function Header() {
  const pathname = usePathname();
  const { lang, copy, setLang } = useLanguage();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <header className="cm-header">
      <a className="cm-skip" href="#content">
        {copy.common.skipToContent}
      </a>
      <div className="cm-header-row">
        <Link href="/" className="cm-brand" aria-label={copy.brand.name}>
          <Logo />
        </Link>
        <span className="cm-status">{copy.brand.status}</span>
        <div className="cm-lang" role="group" aria-label="Bahasa / Language">
          <button type="button" aria-pressed={lang === "id"} onClick={() => setLang("id")}>
            ID
          </button>
          <button type="button" aria-pressed={lang === "en"} onClick={() => setLang("en")}>
            EN
          </button>
        </div>
        <button
          type="button"
          className="cm-menu-btn"
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? copy.menu.close : copy.menu.open}
        </button>
        <ul className="cm-tabs" data-open={open}>
          {copy.nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                <span>{item.n}</span>
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
