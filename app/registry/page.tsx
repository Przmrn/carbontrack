// Registry route: sample peer index with filters, sorting and spread.
import type { Metadata } from "next";
import RegistryWorkspace from "../../components/registry/RegistryWorkspace";
import { en } from "../../content/en";

export const metadata: Metadata = {
  title: en.registry.metaTitle,
  description: en.registry.metaDescription,
};

export default function RegistryRoute() {
  return <RegistryWorkspace />;
}
