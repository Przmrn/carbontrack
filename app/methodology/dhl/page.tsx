// DHL Group FY2025 reference route: published figures, checks, targets and sources.
import type { Metadata } from "next";
import DhlReport from "../../../components/dhl/DhlReport";
import { id } from "../../../content/id";

export const metadata: Metadata = {
  title: id.dhl.metaTitle,
  description: id.dhl.metaDescription,
};

export default function DhlMethodologyRoute() {
  return <DhlReport />;
}
