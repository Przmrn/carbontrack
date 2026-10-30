// Evidence tag for one DHL report claim; labels stay in English by design.
import { DHL_CLAIM_TAGS, type DhlClaimTag } from "../../content/dhl/shared";

const KNOWN_TAGS: readonly string[] = ["reported", "standard", "calculated"];

export default function ClaimTag({ tag }: { tag: string }) {
  const key = KNOWN_TAGS.includes(tag) ? (tag as DhlClaimTag) : "calculated";
  const label = (DHL_CLAIM_TAGS as Record<string, string>)[tag] ?? tag;
  return <span className={`dhl-tag dhl-tag-${key}`}>{label}</span>;
}
