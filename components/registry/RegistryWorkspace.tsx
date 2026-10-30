// Peer registry workspace: labelled sample table with filters and sorting.
"use client";

import { useMemo, useState } from "react";
import {
  fteScaleOf,
  sampleStudios,
  scaleValues,
  tierValues,
  typologyValues,
  type AssuranceTier,
  type FteScale,
  type SampleStudio,
  type Typology,
} from "../../data/sample-registry";
import { intensityPerFte, percentOf, splitScopes } from "../../lib/emissions";
import { formatAmount, formatTonnes } from "../../lib/format";
import { intlLocale } from "../../lib/i18n";
import { useLanguage } from "../LanguageProvider";
import RegistryPanels from "./RegistryPanels";

type TypologyFilter = "ALL" | Typology;
type StatusFilter = "ALL" | AssuranceTier;
type ScaleFilter = "ALL" | FteScale;
type SortKey = "intensity" | "gross" | "fte";

interface Row {
  studio: SampleStudio;
  intensity: number;
}

function shareLabel(share: number): string {
  return String(Math.round(percentOf(share, 1))).padStart(2, "0");
}

export default function RegistryWorkspace() {
  const { lang, copy: ui } = useLanguage();
  const copy = ui.registry;
  const locale = intlLocale(lang);
  const [typology, setTypology] = useState<TypologyFilter>("ALL");
  const [status, setStatus] = useState<StatusFilter>("ALL");
  const [scale, setScale] = useState<ScaleFilter>("ALL");
  const [sortKey, setSortKey] = useState<SortKey>("intensity");
  const [sortDesc, setSortDesc] = useState<boolean>(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  const poolMean =
    sampleStudios.reduce((sum, studio) => sum + intensityPerFte(studio.grossTonnes, studio.fte), 0) /
    sampleStudios.length;

  const rows: Row[] = useMemo(() => {
    const filtered = sampleStudios.filter(
      (studio) =>
        (typology === "ALL" || studio.classification === typology) &&
        (status === "ALL" || studio.tier === status) &&
        (scale === "ALL" || fteScaleOf(studio.fte) === scale),
    );
    const mapped = filtered.map((studio) => ({
      studio,
      intensity: intensityPerFte(studio.grossTonnes, studio.fte),
    }));
    const pick = (row: Row): number =>
      sortKey === "intensity" ? row.intensity : sortKey === "gross" ? row.studio.grossTonnes : row.studio.fte;
    return mapped.sort((a, b) => (sortDesc ? pick(b) - pick(a) : pick(a) - pick(b)));
  }, [typology, status, scale, sortKey, sortDesc]);

  const maxIntensity = Math.max(...sampleStudios.map((s) => intensityPerFte(s.grossTonnes, s.fte)));

  function toggleSort(key: SortKey): void {
    if (key === sortKey) {
      setSortDesc((prev) => !prev);
    } else {
      setSortKey(key);
      setSortDesc(true);
    }
  }

  function pillRow<T extends string>(
    label: string,
    options: T[],
    value: T,
    onPick: (v: T) => void,
    format?: (value: T) => string,
  ) {
    return (
      <div className="reg-filters-row">
        <span className="t-label-code">{label}</span>
        <div className="cm-pills" role="group" aria-label={label}>
          {options.map((option) => (
            <button
              key={option}
              type="button"
              className="cm-pill"
              aria-pressed={value === option}
              onClick={() => onPick(option)}
            >
              {format ? format(option) : option}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="reg-root">
      <section className="cm-container reg-hero">
        <p className="t-label-code">{copy.eyebrow}</p>
        <h1 className="t-headline-lg">{copy.title}</h1>
        <div className="reg-hero-row">
          <p className="reg-intro">{copy.intro}</p>
          <div className="reg-pool">
            <p className="t-label-caps">{copy.poolLabel}</p>
            <p className="tnum reg-pool-value">{formatTonnes(poolMean, locale)}</p>
            <p className="t-label-code">{copy.poolUnit}</p>
            <p className="t-label-code">
              {copy.sbtiLabel}: {copy.sbtiValue} ({copy.sbtiIllustrative})
            </p>
            <div className="reg-sbti" aria-hidden="true">
              <span style={{ width: `${Math.min(poolMean, 3) / 3 * 100}%` }} />
              <i style={{ left: "50%" }} />
            </div>
          </div>
        </div>
        <p>
          <span className="cm-demo">{ui.common.illustrativeSample}</span>
        </p>
      </section>

      <section className="cm-container" aria-label={copy.title}>
        <details className="cm-disclosure">
          <summary className="t-label-caps">{copy.filtersToggle}</summary>
          {pillRow<TypologyFilter>(
            copy.filterTypology,
            ["ALL", ...typologyValues],
            typology,
            setTypology,
            (value) => (value === "ALL" ? copy.all : copy.typologyLabels[value]),
          )}
          {pillRow<StatusFilter>(
            copy.filterStatus,
            ["ALL", ...tierValues],
            status,
            setStatus,
            (value) => (value === "ALL" ? copy.all : copy.tierLabels[value]),
          )}
          {pillRow<ScaleFilter>(
            copy.filterScale,
            ["ALL", ...scaleValues],
            scale,
            setScale,
            (value) => (value === "ALL" ? copy.all : value),
          )}
        </details>

        <div className="cm-table-wrap">
          <table className="cm-table reg-table">
            <thead>
              <tr>
                <th scope="col">{copy.colCode}</th>
                <th scope="col">{copy.colClass}</th>
                <th scope="col" aria-sort={sortKey === "fte" ? (sortDesc ? "descending" : "ascending") : "none"}>
                  <button type="button" className="reg-sort" onClick={() => toggleSort("fte")}>
                    {copy.colFte} {sortKey === "fte" ? (sortDesc ? "↓" : "↑") : ""}
                  </button>
                </th>
                <th scope="col" aria-sort={sortKey === "gross" ? (sortDesc ? "descending" : "ascending") : "none"}>
                  <button type="button" className="reg-sort" onClick={() => toggleSort("gross")}>
                    {copy.colGross} {sortKey === "gross" ? (sortDesc ? "↓" : "↑") : ""}
                  </button>
                </th>
                <th scope="col" aria-sort={sortKey === "intensity" ? (sortDesc ? "descending" : "ascending") : "none"}>
                  <button type="button" className="reg-sort" onClick={() => toggleSort("intensity")}>
                    {copy.colIntensity} {sortKey === "intensity" ? (sortDesc ? "↓" : "↑") : ""}
                  </button>
                </th>
                <th scope="col">{copy.colRatio}</th>
                <th scope="col">{copy.colTier}</th>
                <th scope="col">{copy.colRecord}</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={8} className="cm-muted">
                    {copy.empty}
                  </td>
                </tr>
              ) : (
                rows.flatMap((row) => {
                  const split = splitScopes(row.studio.grossTonnes, row.studio.shares);
                  const main = (
                    <tr key={row.studio.code}>
                      <td>
                        <p className="tnum">{row.studio.code}</p>
                        <p>{row.studio.practice}</p>
                      </td>
                      <td>{copy.typologyLabels[row.studio.classification]}</td>
                      <td className="tnum">{formatAmount(row.studio.fte, locale)}</td>
                      <td className="tnum">{formatTonnes(row.studio.grossTonnes, locale)} t</td>
                      <td>
                        <p className="tnum">{formatTonnes(row.intensity, locale)}</p>
                        <span className="reg-bar" aria-hidden="true">
                          <span style={{ width: `${(row.intensity / maxIntensity) * 100}%` }} />
                        </span>
                      </td>
                      <td className="tnum">
                        {shareLabel(row.studio.shares[0])} : {shareLabel(row.studio.shares[1])} :{" "}
                        {shareLabel(row.studio.shares[2])}
                      </td>
                      <td>{copy.tierLabels[row.studio.tier]}</td>
                      <td>
                        <button
                          type="button"
                          className="cm-btn cm-btn-tertiary"
                          aria-expanded={expanded === row.studio.code}
                          onClick={() =>
                            setExpanded((prev) => (prev === row.studio.code ? null : row.studio.code))
                          }
                        >
                          {expanded === row.studio.code ? copy.detailsHide : copy.detailsShow}
                        </button>
                      </td>
                    </tr>
                  );
                  if (expanded !== row.studio.code) return [main];
                  return [
                    main,
                    <tr key={`${row.studio.code}-detail`}>
                      <td colSpan={8} className="tnum">
                        S1 {formatTonnes(split.s1, locale)} t · S2 {formatTonnes(split.s2, locale)} t · S3{" "}
                        {formatTonnes(split.s3, locale)} t
                      </td>
                    </tr>,
                  ];
                })
              )}
            </tbody>
          </table>
        </div>
        <p className="t-label-code">
          {copy.showing} {String(rows.length).padStart(2, "0")} {copy.of}{" "}
          {String(sampleStudios.length).padStart(2, "0")} {copy.sampleRecords}
        </p>
      </section>

      <RegistryPanels />
    </div>
  );
}
