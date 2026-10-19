// Struk Karbon workspace: daily inputs plus sticky live receipt.
"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { buildStrukEntries, defaultStrukState, type StrukState } from "../../lib/struk";
import { classifyTier, receiptNet, toKg } from "../../lib/emissions";
import { formatAmount, formatReceiptDate } from "../../lib/format";
import { sha256Hex, shortHash } from "../../lib/checksum";
import { en } from "../../content/en";
import StrukInputs from "./StrukInputs";
import MethodologyLedger from "./MethodologyLedger";
import ReceiptPanel from "./ReceiptPanel";
import MobileTabBar from "./MobileTabBar";
import type { ReceiptLineView } from "./StrukReceipt";

function subscribe(): () => void {
  return () => {};
}

// Server prerenders an empty stamp; the client snapshot fills in session date.
function useReceiptDate(): string {
  return useSyncExternalStore(subscribe, () => formatReceiptDate(new Date()), () => "");
}

export default function StrukWorkspace() {
  const [state, setState] = useState<StrukState>(defaultStrukState);
  const dateLabel = useReceiptDate();
  const [checkCode, setCheckCode] = useState<string>("…");

  function patch(update: Partial<StrukState>): void {
    setState((prev) => ({ ...prev, ...update }));
  }

  const views: ReceiptLineView[] = useMemo(() => {
    const units = en.struk.units;
    return buildStrukEntries(state).map((entry) => {
      const suffix =
        entry.key === "commute" ? units.km : entry.key === "ac" || entry.key === "ws" ? units.hrs : units.times;
      return {
        key: entry.key,
        label: entry.factor.label,
        detail: `${formatAmount(entry.amount)} ${suffix}`,
        kg: toKg(entry.amount, entry.factor),
      };
    });
  }, [state]);

  const net = receiptNet(views);
  const tier = classifyTier(net);

  useEffect(() => {
    const canonical = JSON.stringify(views.map((view) => [view.key, view.label, view.kg]));
    let live = true;
    sha256Hex(canonical)
      .then((hex) => {
        if (live) setCheckCode(shortHash(hex, 8, 4));
      })
      .catch(() => {
        if (live) setCheckCode("—");
      });
    return () => {
      live = false;
    };
  }, [views]);

  return (
    <div className="struk-root">
      <section className="cm-container struk-hero">
        <p className="t-label-code">{en.struk.eyebrow}</p>
        <h1 className="t-display">
          {en.struk.titleA}
          <br />
          {en.struk.titleB}
        </h1>
        <div className="struk-hero-row">
          <p className="struk-intro">{en.struk.intro}</p>
          <div className="struk-hero-chips">
            <div className="struk-chipbox">
              <p className="t-label-caps">{en.struk.benchmarkLabel}</p>
              <p className="tnum">
                {en.struk.benchmarkValue} {en.struk.benchmarkUnit}
              </p>
              <p className="t-label-code">{en.struk.benchmarkNote}</p>
            </div>
            <div className="struk-chipbox struk-chipbox-dark">
              <p className="t-label-code">{en.struk.standardLabel}</p>
            </div>
          </div>
        </div>
        <p>
          <span className="cm-demo">{en.struk.demoNote}</span>
        </p>
      </section>
      <div className="cm-container struk-grid">
        <div>
          <StrukInputs state={state} views={views} dateLabel={dateLabel} onPatch={patch} />
          <MethodologyLedger />
        </div>
        <ReceiptPanel
          views={views}
          net={net}
          tier={tier}
          handle={state.handle}
          dateLabel={dateLabel}
          checkCode={checkCode}
        />
      </div>
      <MobileTabBar />
    </div>
  );
}
