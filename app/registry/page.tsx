// Registry route: sample peer index with filters, sorting and spread.
import type { Metadata } from "next";
import RegistryWorkspace from "../../components/registry/RegistryWorkspace";
import { id } from "../../content/id";

export const metadata: Metadata = {
  title: id.registry.metaTitle,
  description: id.registry.metaDescription,
};

export default function RegistryRoute() {
  return <RegistryWorkspace />;
}
