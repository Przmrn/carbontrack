// One-time opening curtain: hides the first paint, then leaves as soon as the
// page and fonts are ready (minimum display so the intro stays legible).
"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "./LanguageProvider";

const MIN_VISIBLE_MS = 600;
const MAX_WAIT_MS = 1800;
const EXIT_MS = 320;

export default function BootCurtain() {
  const { copy } = useLanguage();
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const skip = window.setTimeout(() => setGone(true), 0);
      return () => window.clearTimeout(skip);
    }

    const started = performance.now();
    let cancelled = false;
    let minTimer = 0;
    let capTimer = 0;

    const pageReady =
      document.readyState === "complete"
        ? Promise.resolve()
        : new Promise<void>((resolve) => {
            window.addEventListener("load", () => resolve(), { once: true });
          });
    const fontsReady = document.fonts.ready.then(() => undefined);
    const ready = Promise.all([pageReady, fontsReady]);
    const cap = new Promise<void>((resolve) => {
      capTimer = window.setTimeout(resolve, MAX_WAIT_MS);
    });

    void Promise.race([ready, cap]).then(() => {
      window.clearTimeout(capTimer);
      if (cancelled) return;
      const remaining = Math.max(0, MIN_VISIBLE_MS - (performance.now() - started));
      minTimer = window.setTimeout(() => {
        if (!cancelled) setLeaving(true);
      }, remaining);
    });

    return () => {
      cancelled = true;
      window.clearTimeout(minTimer);
      window.clearTimeout(capTimer);
    };
  }, []);

  useEffect(() => {
    if (!leaving) return;
    const exit = window.setTimeout(() => setGone(true), EXIT_MS);
    return () => window.clearTimeout(exit);
  }, [leaving]);

  if (gone) return null;

  return (
    <div className="boot-curtain" data-leaving={leaving ? "true" : "false"} aria-hidden="true">
      <div className="boot-top">
        <span className="boot-name">{copy.brand.name}</span>
        <span className="boot-meta">{copy.brand.sub}</span>
      </div>
      <div className="boot-center">
        <p className="boot-title">{copy.brand.name}</p>
        <p className="boot-sub">{copy.brand.sub}</p>
      </div>
      <div className="boot-bottom">
        <span>{copy.brand.status}</span>
        <span>{copy.footer.rev}</span>
      </div>
    </div>
  );
}
