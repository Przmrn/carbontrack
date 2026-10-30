// Dev-only showcase of every shared primitive; rendered by /dev/primitives.
"use client";

import { useState, type ReactNode } from "react";
import { strukFactors } from "../../data/factors";
import { toKg } from "../../lib/emissions";
import { formatAmount, formatFactor, formatKg } from "../../lib/format";
import { factorLabel, intlLocale } from "../../lib/i18n";
import { useLanguage } from "../LanguageProvider";
import Button from "../ui/Button";
import Chip from "../ui/Chip";
import NumberInput from "../ui/NumberInput";
import Segmented from "../ui/Segmented";
import Slider from "../ui/Slider";
import Stepper from "../ui/Stepper";
import Table from "../ui/Table";

// Arbitrary inputs for the sample rows. Factor values come from data/factors.ts.
const DEMO_AMOUNTS = [24.5, 2, 5];

function Section({ title, note, children }: { title: string; note: string; children: ReactNode }) {
  return (
    <section className="cm-kit-section">
      <div className="cm-kit-head">
        <p className="t-label-caps">{title}</p>
        <p className="cm-help">{note}</p>
      </div>
      {children}
    </section>
  );
}

export default function PrimitivesShowcase() {
  const { lang, copy: ui } = useLanguage();
  const copy = ui.dev;
  const locale = intlLocale(lang);
  const [scopeView, setScopeView] = useState<"MARKET" | "LOCATION">("MARKET");
  const [km, setKm] = useState(24.5);
  const [servings, setServings] = useState(1);
  const [gasKwh, setGasKwh] = useState(1200);
  const rows = strukFactors.slice(0, DEMO_AMOUNTS.length);

  return (
    <div className="cm-container cm-kit">
      <header className="cm-kit-hero">
        <p className="t-label-code">{copy.eyebrow}</p>
        <h1 className="t-headline-lg">{copy.title}</h1>
        <p>{copy.intro}</p>
        {/* Tailwind utilities generated from the @theme tokens in styles/tokens.css. */}
        <p className="text-muted t-label-code">{copy.tailwindNote}</p>
      </header>

      <Section title={copy.buttonsTitle} note={copy.buttonsNote}>
        <div className="cm-kit-row">
          <Button variant="primary">{copy.primary}</Button>
          <Button variant="outline">{copy.outline}</Button>
          <Button variant="tertiary">{copy.tertiary}</Button>
          <Button variant="primary" disabled>
            {copy.disabled}
          </Button>
        </div>
      </Section>

      <Section title={copy.fieldsTitle} note={copy.fieldsNote}>
        <div className="cm-kit-grid">
          <NumberInput
            id="dev-gas"
            label={copy.inputLabel}
            unit="kWh"
            help={copy.inputHelp}
            value={gasKwh}
            onChange={setGasKwh}
          />
          <Stepper label={copy.stepperLabel} sub={copy.stepperSub} value={servings} onChange={setServings} />
        </div>
        <Slider
          id="dev-km"
          label={copy.sliderLabel}
          value={km}
          min={0}
          max={100}
          step={0.5}
          unit="km"
          onChange={setKm}
        />
        <Segmented
          label={copy.segmentedLabel}
          options={[copy.segmentMarket, copy.segmentLocation]}
          value={scopeView === "MARKET" ? copy.segmentMarket : copy.segmentLocation}
          onChange={(value) => setScopeView(value === copy.segmentMarket ? "MARKET" : "LOCATION")}
        />
      </Section>

      <Section title={copy.chipsTitle} note={copy.chipsNote}>
        <div className="cm-kit-row">
          <Chip scope={1}>SCOPE 1</Chip>
          <Chip scope={2}>SCOPE 2</Chip>
          <Chip scope={3}>SCOPE 3</Chip>
          <Chip tone="sage">{copy.chipSage}</Chip>
          <Chip tone="alert">{copy.chipAlert}</Chip>
          <Chip>{copy.chipNeutral}</Chip>
        </div>
      </Section>

      <Section title={copy.tableTitle} note={copy.tableNote}>
        <Table caption={copy.tableCaption}>
          <thead>
            <tr>
              <th scope="col">{copy.colActivity}</th>
              <th scope="col" className="num">
                {copy.colAmount}
              </th>
              <th scope="col" className="num">
                {copy.colFactor}
              </th>
              <th scope="col" className="num">
                {copy.colKg}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((factor, index) => (
              <tr key={factor.id}>
                <td>{factorLabel(factor, lang)}</td>
                <td className="num tnum">
                  {formatAmount(DEMO_AMOUNTS[index], locale)} {factor.unit}
                </td>
                <td className="num tnum">
                  {formatFactor(factor.value, locale)} {factor.unit}
                </td>
                <td className="num tnum">{formatKg(toKg(DEMO_AMOUNTS[index], factor), locale)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <p className="t-label-code cm-muted">{copy.tableStatus}</p>
      </Section>

      <Section title={copy.typeTitle} note={copy.typeNote}>
        <p className="t-display">80 / 84 Display</p>
        <p className="t-headline-md">32 / 38 Headline</p>
        <p className="t-data-metric">1 234.56 t CO₂e</p>
        <p className="t-label-caps">Label Caps 10 / 12</p>
        <p className="t-label-code">LABEL CODE 11 / 14</p>
        <p className="tnum">Tabular figures: 0123456789 · {formatAmount(servings, locale)} · {formatAmount(km, locale)}</p>
      </Section>
    </div>
  );
}