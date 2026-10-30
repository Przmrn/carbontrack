// Glossary route: plain-language definitions of every abbreviation in the app.
import type { Metadata } from "next";
import GlossaryWorkspace from "../../components/glossary/GlossaryWorkspace";
import { id } from "../../content/id";

export const metadata: Metadata = {
  title: id.glossary.metaTitle,
  description: id.glossary.metaDescription,
};

export default function GlossaryRoute() {
  return <GlossaryWorkspace />;
}