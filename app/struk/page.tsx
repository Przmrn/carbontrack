// Struk Karbon route: daily estimator plus live receipt.
import type { Metadata } from "next";
import StrukWorkspace from "../../components/receipt/StrukWorkspace";
import { id } from "../../content/id";

export const metadata: Metadata = {
  title: id.struk.metaTitle,
  description: id.struk.metaDescription,
};

export default function StrukRoute() {
  return <StrukWorkspace />;
}
