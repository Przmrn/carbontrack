// Dev-only page: every UI primitive on one screen. Not linked in the navigation.
import type { Metadata } from "next";
import PrimitivesShowcase from "../../../components/dev/PrimitivesShowcase";
import { en } from "../../../content/en";

export const metadata: Metadata = {
  title: en.dev.metaTitle,
  description: en.dev.intro,
};

export default function DevPrimitivesRoute() {
  return <PrimitivesShowcase />;
}