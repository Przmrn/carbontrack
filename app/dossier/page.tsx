// Audit export route: A4 preview, print CSS and CSV/JSON export.
// State comes from the store mounted in the root layout.
import type { Metadata } from "next";
import DossierWorkspace from "../../components/dossier/DossierWorkspace";
import { id } from "../../content/id";

export const metadata: Metadata = {
  title: id.dossier.metaTitle,
  description: id.dossier.metaDescription,
};

export default function DossierRoute() {
  return <DossierWorkspace />;
}
