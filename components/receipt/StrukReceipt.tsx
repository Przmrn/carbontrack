// Struk Karbon receipt slip: mono rows, net block, tier stamp, check footer.
import type { Ref } from "react";
import { formatKg } from "../../lib/format";
import type { Tier } from "../../lib/emissions";
import { en } from "../../content/en";
import Barcode from "./Barcode";

export interface ReceiptLineView {
  key: string;
  label: string;
  detail: string;
  kg: number;
}

interface StrukReceiptProps {
  ref?: Ref<HTMLDivElement>;
  handle: string;
  dateLabel: string;
  lines: ReceiptLineView[];
  net: number;
  tier: Tier;
  checkCode: string;
}

export default function StrukReceipt({
  ref,
  handle,
  dateLabel,
  lines,
  net,
  tier,
  checkCode,
}: StrukReceiptProps) {
  const copy = en.struk.receipt;
  return (
    <div ref={ref} id="struk-receipt" className="struk-slip">
      <p className="struk-slip-title">{copy.title}</p>
      <p className="struk-slip-sub">{copy.sub}</p>
      <dl className="struk-meta">
        <div>
          <dt>{copy.holderLabel}</dt>
          <dd>{handle === "" ? "—" : handle}</dd>
        </div>
        <div>
          <dt>{copy.dateLabel}</dt>
          <dd>{dateLabel}</dd>
        </div>
      </dl>
      <p className="struk-sep" aria-hidden="true">
        {"=".repeat(42)}
      </p>
      <div className="struk-row struk-row-head" aria-hidden="true">
        <span>{copy.itemsHeader}</span>
        <span>{copy.emissionHeader}</span>
      </div>
      {lines.map((line, index) => (
        <div className="struk-row" key={line.key}>
          <span>
            {String(index + 1).padStart(2, "0")} {line.label} ({line.detail})
          </span>
          <span className="tnum">{formatKg(line.kg)} kg</span>
        </div>
      ))}
      <p className="struk-sep" aria-hidden="true">
        {"-".repeat(42)}
      </p>
      <div className="struk-net">
        <div>
          <p className="t-label-caps">{copy.netLabel}</p>
          <p className="t-label-caps">{copy.totalLabel}</p>
        </div>
        <p className="struk-net-value tnum" aria-live="polite">
          {formatKg(net)} <span>KG</span>
        </p>
      </div>
      <div className="struk-tier" id="struk-analysis">
        <span className="t-label-caps">{copy.tierLabel}</span>
        <span className="struk-stamp">STAMP: {en.struk.tiers[tier]}</span>
      </div>
      <div className="struk-check">
        <p className="struk-demo-note t-label-code">{copy.demoNote}</p>
        <p className="t-label-code">
          {copy.checkLabel}: {checkCode}
        </p>
        <p className="t-label-code">{copy.checkNote}</p>
        <Barcode code={checkCode} />
      </div>
      <div className="struk-tear" aria-hidden="true" />
    </div>
  );
}
