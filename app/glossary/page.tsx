// Glossary route: plain-language definitions of every abbreviation in the app.
import type { Metadata } from "next";
import GlossaryWorkspace from "../../components/glossary/GlossaryWorkspace";
import { en } from "../../content/en";

export const metadata: Metadata = {
  title: en.glossary.metaTitle,
  description: en.glossary.metaDescription,
};

export default function GlossaryRoute() {
  return <GlossaryWorkspace />;
}