// Methodology route: scope demarcation, formulas, lineage and uncertainty.
import type { Metadata } from "next";
import MethodologyWorkspace from "../../components/methodology/MethodologyWorkspace";
import { en } from "../../content/en";

export const metadata: Metadata = {
  title: en.methodology.metaTitle,
  description: en.methodology.metaDescription,
};

export default function MethodologyRoute() {
  return <MethodologyWorkspace />;
}
