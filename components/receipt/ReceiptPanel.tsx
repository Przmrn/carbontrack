// Sticky receipt column: slip, PNG / 9:16 / caption actions, caption preview.
"use client";

import { useRef, useState } from "react";
import { toPng } from "html-to-image";
import { formatKg } from "../../lib/format";
import type { Tier } from "../../lib/emissions";
import { intlLocale } from "../../lib/i18n";
import { useLanguage } from "../LanguageProvider";
import StrukReceipt, { type ReceiptLineView } from "./StrukReceipt";
import Barcode from "./Barcode";
import Button from "../ui/Button";

interface ReceiptPanelProps {
  views: ReceiptLineView[];
  net: number;
  tier: Tier;
  handle: string;
  dateLabel: string;
  checkCode: string;
}

function download(dataUrl: string, filename: string): void {
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
}

// The export canvas needs a literal colour, so read it back from the token file.
function exportBackground(): string {
  const token = getComputedStyle(document.documentElement).getPropertyValue("--surface-white").trim();
  return token === "" ? "white" : token;
}

export default function ReceiptPanel({
  views,
  net,
  tier,
  handle,
  dateLabel,
  checkCode,
}: ReceiptPanelProps) {
  const receiptRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [failed, setFailed] = useState<boolean>(false);
  const { lang, copy: ui } = useLanguage();
  const locale = intlLocale(lang);
  const copy = ui.struk.actions;

  const caption = `${ui.struk.caption.print}: ${formatKg(net, locale)} kg CO₂e [${ui.struk.tiers[tier]}]. ${ui.struk.caption.calculatedWith}. ${ui.struk.caption.tags}`;

  async function handlePng(): Promise<void> {
    if (!receiptRef.current) return;
    setFailed(false);
    try {
      const dataUrl = await toPng(receiptRef.current, { pixelRatio: 2, backgroundColor: exportBackground() });
      download(dataUrl, "struk-karbon.png");
    } catch {
      setFailed(true);
    }
  }

  async function handleStory(): Promise<void> {
    if (!storyRef.current) return;
    setFailed(false);
    try {
      const dataUrl = await toPng(storyRef.current, { pixelRatio: 2, backgroundColor: exportBackground() });
      download(dataUrl, "struk-karbon-story.png");
    } catch {
      setFailed(true);
    }
  }

  async function handleCopy(): Promise<void> {
    try {
      await navigator.clipboard.writeText(caption);
    } catch {
      const area = document.createElement("textarea");
      area.value = caption;
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      area.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="struk-side">
      <StrukReceipt
        ref={receiptRef}
        handle={handle}
        dateLabel={dateLabel}
        lines={views}
        net={net}
        tier={tier}
        checkCode={checkCode}
      />
      <div className="struk-actions">
        <Button variant="primary" onClick={handlePng}>
          {copy.download}
        </Button>
        <Button variant="outline" onClick={handleStory}>
          {copy.story}
        </Button>
      </div>
      {failed ? (
        <p className="t-label-code" role="alert">
          {copy.failed}
        </p>
      ) : null}
      <div className="struk-caption">
        <div className="struk-caption-head">
          <span className="t-label-caps">{copy.captionTitle}</span>
          <span className="t-label-code">{copy.ready}</span>
        </div>
        <p aria-live="polite">{caption}</p>
        <Button variant="primary" onClick={handleCopy}>
          {copied ? copy.copied : copy.copy}
        </Button>
      </div>
      <div aria-hidden="true" className="struk-story-wrap">
        <div ref={storyRef} className="struk-story">
          <p className="t-label-code">{copy.storyLabel}</p>
          <p className="struk-story-total tnum">{formatKg(net, locale)} KG</p>
          <p className="struk-stamp">{ui.common.stamp}: {ui.struk.tiers[tier]}</p>
          <p className="t-label-code">
            {dateLabel} · {checkCode}
          </p>
          <Barcode code={checkCode} />
        </div>
      </div>
    </div>
  );
}
