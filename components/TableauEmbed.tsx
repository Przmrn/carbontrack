// Tableau Public embed: click-to-load iframe, preview, caption and comparison table.
"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";
import {
  DHL_TABLEAU_NOT_LINKED,
  DHL_TABLEAU_OPEN,
  DHL_TABLEAU_PRIVACY,
  DHL_TABLEAU_SEPARATE,
} from "../content/dhl/shared";
import { tableau } from "../content/tableau";
import { useLanguage } from "./LanguageProvider";
import Button from "./ui/Button";
import Table from "./ui/Table";
import ClaimTag from "./dhl/ClaimTag";

export interface TableauNumber {
  label: string;
  value: string;
  unit: string;
}

export default function TableauEmbed({ numbers }: { numbers: readonly TableauNumber[] }) {
  const { copy: ui } = useLanguage();
  const copy = ui.dhl.tableau;
  const [loaded, setLoaded] = useState(false);
  const [previewFailed, setPreviewFailed] = useState(false);
  const [embedError, setEmbedError] = useState(false);

  const src = tableau.src.trim();
  const openUrl = tableau.openUrl.trim();
  const hasSrc = src.length > 0;
  const hasOpen = openUrl.length > 0;
  const hasPreview = tableau.previewImage.trim().length > 0 && !previewFailed;
  const openLink = hasOpen ? (
    <a className="dhl-open-link" href={openUrl} target="_blank" rel="noopener noreferrer">
      {DHL_TABLEAU_OPEN}
    </a>
  ) : (
    <span className="dhl-open-link" aria-disabled="true">
      {DHL_TABLEAU_OPEN}
      <span className="dhl-open-todo t-label-code">{copy.openTodo}</span>
    </span>
  );

  return (
    <div className="dhl-tableau">
      <p className="dhl-tableau-mobile t-label-code">{copy.mobileNote}</p>

      {!hasSrc ? (
        <>
          <div className="dhl-tableau-preview dhl-tableau-placeholder dhl-tableau-preview-empty">
            <p className="t-label-caps">{DHL_TABLEAU_NOT_LINKED}</p>
            <p className="t-label-code">{copy.todo}</p>
          </div>
          <p className="dhl-privacy">{DHL_TABLEAU_PRIVACY}</p>
          <div className="dhl-tableau-actions">{openLink}</div>
        </>
      ) : null}

      {hasSrc && !loaded ? (
        <>
          <div className="dhl-tableau-preview">
            {hasPreview ? (
              <Image
                src={tableau.previewImage}
                alt={copy.previewAlt}
                fill
                sizes="(max-width: 767px) 100vw, 960px"
                onError={() => setPreviewFailed(true)}
              />
            ) : (
              <div className="dhl-tableau-placeholder">
                <p className="t-label-caps">{copy.previewMissing}</p>
              </div>
            )}
          </div>
          <p className="dhl-privacy">{DHL_TABLEAU_PRIVACY}</p>
          <div className="dhl-tableau-actions">
            <Button variant="outline" onClick={() => setLoaded(true)}>
              [ {copy.load} ]
            </Button>
            {openLink}
          </div>
        </>
      ) : null}

      {hasSrc && loaded ? (
        <div className="dhl-tableau-loaded">
          <div className="dhl-tableau-frame-wrap">
            <iframe
              className="dhl-tableau-frame"
              style={{ "--tableau-height": `${tableau.heightDesktop}px` } as CSSProperties}
              src={src}
              title={copy.iframeTitle}
              loading="lazy"
              width="100%"
              sandbox="allow-scripts allow-same-origin allow-popups allow-downloads"
              onError={() => setEmbedError(true)}
            />
          </div>
          {embedError ? (
            <p role="alert" className="dhl-embed-error">
              {copy.error}
            </p>
          ) : null}
          <div className="dhl-tableau-actions">
            {openLink}
          </div>
        </div>
      ) : null}

      <dl className="dhl-caption">
        <div>
          <dt className="t-label-caps">{copy.caption.author}</dt>
          <dd>{tableau.caption.author.trim() || copy.caption.missing}</dd>
        </div>
        <div>
          <dt className="t-label-caps">{copy.caption.dataSource}</dt>
          <dd>{tableau.caption.dataSource.trim() || copy.caption.missing}</dd>
        </div>
        <div>
          <dt className="t-label-caps">{copy.caption.updated}</dt>
          <dd>{tableau.caption.updated.trim() || copy.caption.missing}</dd>
        </div>
      </dl>

      <div className="dhl-compare">
        <div className="dhl-compare-head">
          <p className="t-label-caps">{copy.compare.title}</p>
          <ClaimTag tag="calculated" />
        </div>
        <p>{copy.compare.intro}</p>
        <Table aria-label={copy.compare.title}>
          <thead>
            <tr>
              <th scope="col">{copy.compare.columns.item}</th>
              <th scope="col" className="num">{copy.compare.columns.value}</th>
              <th scope="col">{copy.compare.columns.unit}</th>
              <th scope="col">{copy.compare.columns.evidence}</th>
            </tr>
          </thead>
          <tbody>
            {numbers.map((row) => (
              <tr key={row.label}>
                <td>{row.label}</td>
                <td className="tnum num">{row.value}</td>
                <td>{row.unit}</td>
                <td>
                  <ClaimTag tag="reported" />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <p className="dhl-separate">
          {DHL_TABLEAU_SEPARATE} <ClaimTag tag={copy.compare.noteTag} />
        </p>
      </div>
    </div>
  );
}
