// Dev-only page: every UI primitive on one screen. Not linked in the navigation.
import type { Metadata } from "next";
import PrimitivesShowcase from "../../../components/dev/PrimitivesShowcase";
import { id } from "../../../content/id";

export const metadata: Metadata = {
  title: id.dev.metaTitle,
  description: id.dev.intro,
};

export default function DevPrimitivesRoute() {
  return <PrimitivesShowcase />;
}