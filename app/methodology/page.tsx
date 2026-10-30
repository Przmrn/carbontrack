// Methodology route: scope demarcation, formulas, lineage and uncertainty.
import type { Metadata } from "next";
import MethodologyWorkspace from "../../components/methodology/MethodologyWorkspace";
import { id } from "../../content/id";

export const metadata: Metadata = {
  title: id.methodology.metaTitle,
  description: id.methodology.metaDescription,
};

export default function MethodologyRoute() {
  return <MethodologyWorkspace />;
}
