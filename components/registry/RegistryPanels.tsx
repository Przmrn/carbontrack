// Intelligence panels and spread histogram, computed from the sample only.
import { intensityPerFte } from "../../lib/emissions";
import { formatAmount, formatTonnes } from "../../lib/format";
import { sampleStudios } from "../../data/sample-registry";
import { en } from "../../content/en";

export default function RegistryPanels() {
  const copy = en.registry;
  const intensities = sampleStudios.map((studio) =>
    intensityPerFte(studio.grossTonnes, studio.fte),
  );
  const mean = intensities.reduce((sum, value) => sum + value, 0) / intensities.length;
  const min = Math.min(...intensities);
  const max = Math.max(...intensities);
  const median = [...intensities].sort((a, b) => a - b)[Math.floor(intensities.length / 2)];
  const meanS3 =
    sampleStudios.reduce((sum, studio) => sum + studio.shares[2], 0) / sampleStudios.length;
  const below = intensities.filter((value) => value <= 1.5).length;

  return (
    <section className="cm-container reg-panels">
      <p className="t-label-caps">{copy.panelsEyebrow}</p>
      <h2 className="t-headline-md">{copy.panelsTitle}</h2>
      <div className="reg-cards">
        <div>
          <p className="t-label-caps">{copy.meanLabel}</p>
          <p className="tnum reg-big">{formatTonnes(mean)} t</p>
          <p>
            {copy.rangeLabel}: {formatTonnes(min)} – {formatTonnes(max)} t
          </p>
        </div>
        <div>
          <p className="t-label-caps">{copy.s3Label}</p>
          <p className="tnum reg-big">{formatAmount(meanS3 * 100)}%</p>
          <p>
            {copy.belowLabel}: {below} / {sampleStudios.length}
          </p>
        </div>
        <div>
          <p className="t-label-caps">{copy.sbtiLabel}</p>
          <p className="tnum reg-big">{copy.sbtiValue}</p>
          <p>{copy.sbtiIllustrative}</p>
        </div>
      </div>

      <p className="t-label-caps">{copy.spreadEyebrow}</p>
      <h3 className="t-headline-md">{copy.spreadTitle}</h3>
      <p>{copy.spreadNote}</p>
      <svg
        className="reg-hist"
        viewBox="0 0 500 220"
        role="img"
        aria-label={`${copy.spreadTitle}. ${copy.medianLabel} ${formatTonnes(median)}`}
      >
        {intensities.map((value, index) => {
          const width = 500 / intensities.length;
          const height = (value / max) * 160;
          return (
            <rect
              key={index}
              x={index * width + 8}
              y={180 - height}
              width={width - 16}
              height={height}
              fill={value === median ? "var(--ink)" : "var(--rule)"}
            />
          );
        })}
        <text x={4} y={200} fontSize={10}>
          {copy.medianLabel} {formatTonnes(median)}
        </text>
      </svg>
    </section>
  );
}
