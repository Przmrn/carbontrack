// Struk Karbon route: daily estimator plus live receipt.
import type { Metadata } from "next";
import StrukWorkspace from "../../components/receipt/StrukWorkspace";
import { en } from "../../content/en";

export const metadata: Metadata = {
  title: en.struk.metaTitle,
  description: en.struk.metaDescription,
};

export default function StrukRoute() {
  return <StrukWorkspace />;
}
