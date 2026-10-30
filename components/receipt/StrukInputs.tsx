// Struk input sections A–E: identity, commute, diet, domestic, consumables.
import { findFactor } from "../../data/factors";
import { toKg } from "../../lib/emissions";
import { formatAmount, formatFactor, formatKg } from "../../lib/format";
import { COMMUTE_MODE_IDS, type DietCounts, type StrukState } from "../../lib/struk";
import { factorLabel, intlLocale } from "../../lib/i18n";
import { useLanguage } from "../LanguageProvider";
import Slider from "../ui/Slider";
import Stepper from "../ui/Stepper";
import type { ReceiptLineView } from "./StrukReceipt";

interface StrukInputsProps {
  state: StrukState;
  views: ReceiptLineView[];
  dateLabel: string;
  onPatch: (patch: Partial<StrukState>) => void;
}

function subtotal(views: ReceiptLineView[], prefix: string): number {
  return views.filter((view) => view.key.startsWith(prefix)).reduce((sum, view) => sum + view.kg, 0);
}

function Chip({ value, locale }: { value: number; locale: "en" | "id-ID" }) {
  return <span className="struk-chip tnum">{formatKg(value, locale)} KG CO₂E</span>;
}

const DIET_SLOTS: { slot: keyof DietCounts; factorId: string }[] = [
  { slot: "beef", factorId: "diet-beef-lamb" },
  { slot: "poultry", factorId: "diet-poultry-fish" },
  { slot: "eggs", factorId: "diet-eggs" },
  { slot: "plant", factorId: "diet-plant-tofu" },
];

function perUnitKg(factorId: string): number {
  const factor = findFactor(factorId);
  if (!factor) throw new Error(`unknown factor ${factorId}`);
  return toKg(1, factor);
}

export default function StrukInputs({ state, views, dateLabel, onPatch }: StrukInputsProps) {
  const { lang, copy: ui } = useLanguage();
  const locale = intlLocale(lang);
  const copy = ui.struk;
  function setDiet(slot: keyof DietCounts, value: number) {
    onPatch({ diet: { ...state.diet, [slot]: value } });
  }

  return (
    <div id="struk-inputs" className="struk-inputs">
      <section aria-label={copy.secA.title} className="struk-sec">
        <p className="t-label-caps">
          {ui.common.section} A // {copy.secA.title}
        </p>
        <div className="struk-grid-2">
          <div className="cm-field">
            <label htmlFor="struk-handle" className="t-label-caps">
              {copy.secA.handleLabel}
            </label>
            <input
              id="struk-handle"
              type="text"
              value={state.handle}
              onChange={(event) => onPatch({ handle: event.target.value })}
              placeholder="@handle"
              autoComplete="off"
            />
          </div>
          <div className="cm-field">
            <span className="t-label-caps" id="struk-date-label">
              {copy.secA.dateLabel}
            </span>
            <span className="cm-readonly" aria-labelledby="struk-date-label">
              {dateLabel}
            </span>
          </div>
        </div>
      </section>

      <section aria-label={copy.secB.title} className="struk-sec">
        <div className="struk-sec-head">
          <p className="t-label-caps">
            {ui.common.section} B // {copy.secB.title} ({copy.secB.bilingual})
          </p>
          <Chip value={subtotal(views, "commute")} locale={locale} />
        </div>
        <h3 className="struk-h">{copy.secB.heading}</h3>
        <p className="t-label-caps">{copy.secB.engineLabel}</p>
        <div className="struk-pills" role="group" aria-label={copy.secB.engineLabel}>
          {COMMUTE_MODE_IDS.map((id, index) => {
            const factor = findFactor(id);
            if (!factor) return null;
            return (
              <button
                key={id}
                type="button"
                aria-pressed={state.modeId === id}
                onClick={() => onPatch({ modeId: id })}
              >
                <span>
                  0{index + 1} {factorLabel(factor, lang).toUpperCase()}
                </span>
                <span className="tnum">
                  {formatAmount(factor.value, locale)} {factor.unit.toUpperCase()}
                </span>
              </button>
            );
          })}
        </div>
        <Slider
          id="struk-distance"
          label={copy.secB.radiusLabel}
          value={state.distanceKm}
          min={0}
          max={100}
          step={0.5}
          unit={copy.units.km}
          onChange={(value) => onPatch({ distanceKm: value })}
        />
        <div className="struk-scale t-label-code" aria-hidden="true">
          <span>{copy.secB.min}</span>
          <span>{copy.secB.mid}</span>
          <span>{copy.secB.max}</span>
        </div>
      </section>

      <section aria-label={copy.secC.title} className="struk-sec">
        <div className="struk-sec-head">
          <p className="t-label-caps">
            {ui.common.section} C // {copy.secC.title} ({copy.secC.bilingual})
          </p>
          <Chip value={subtotal(views, "diet-")} locale={locale} />
        </div>
        <h3 className="struk-h">{copy.secC.heading}</h3>
        <div className="struk-grid-2">
          {DIET_SLOTS.map(({ slot, factorId }, index) => (
            <Stepper
              key={slot}
              label={`0${index + 1} ${copy.secC.items[index]}`}
              sub={`${formatFactor(perUnitKg(factorId), locale)} ${copy.units.kgServing}`}
              value={state.diet[slot]}
              onChange={(value) => setDiet(slot, value)}
            />
          ))}
        </div>
      </section>

      <section aria-label={copy.secD.title} className="struk-sec">
        <div className="struk-sec-head">
          <p className="t-label-caps">
            {ui.common.section} D // {copy.secD.title} ({copy.secD.bilingual})
          </p>
          <Chip value={subtotal(views, "ac") + subtotal(views, "ws")} locale={locale} />
        </div>
        <h3 className="struk-h">{copy.secD.heading}</h3>
        <div className="struk-grid-2">
          <div>
            <Slider
              id="struk-ac"
              label={copy.secD.ac}
              value={state.acHours}
              min={0}
              max={24}
              step={0.5}
              unit={copy.units.hrs}
              onChange={(value) => onPatch({ acHours: value })}
            />
          </div>
          <div>
            <Slider
              id="struk-ws"
              label={copy.secD.ws}
              value={state.wsHours}
              min={0}
              max={18}
              step={0.5}
              unit={copy.units.hrs}
              onChange={(value) => onPatch({ wsHours: value })}
            />
          </div>
        </div>
      </section>

      <section aria-label={copy.secE.title} className="struk-sec">
        <div className="struk-sec-head">
          <p className="t-label-caps">
            {ui.common.section} E // {copy.secE.title} ({copy.secE.bilingual})
          </p>
          <Chip value={subtotal(views, "parcels") + subtotal(views, "cups")} locale={locale} />
        </div>
        <h3 className="struk-h">{copy.secE.heading}</h3>
        <div className="struk-grid-2">
          <Stepper
            label={copy.secE.parcel}
            sub={`${copy.secE.parcelSub} — ${formatFactor(perUnitKg("goods-parcel"), locale)} ${copy.units.kgUnit}`}
            value={state.parcels}
            onChange={(value) => onPatch({ parcels: value })}
          />
          <Stepper
            label={copy.secE.cups}
            sub={`${copy.secE.cupsSub} — ${formatFactor(perUnitKg("goods-cup"), locale)} ${copy.units.kgUnit}`}
            value={state.cups}
            onChange={(value) => onPatch({ cups: value })}
          />
        </div>
      </section>
    </div>
  );
}
