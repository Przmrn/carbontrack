// Audit export route: A4 preview, print CSS and CSV/JSON export.
// State comes from the store mounted in the root layout.
import type { Metadata } from "next";
import DossierWorkspace from "../../components/dossier/DossierWorkspace";
import { en } from "../../content/en";

export const metadata: Metadata = {
  title: en.dossier.metaTitle,
  description: en.dossier.metaDescription,
};

export default function DossierRoute() {
  return <DossierWorkspace />;
}
