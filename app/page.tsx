// Calculator route. State comes from the store mounted in the root layout.
import type { Metadata } from "next";
import CalculatorWorkspace from "../components/calculator/CalculatorWorkspace";
import { id } from "../content/id";

export const metadata: Metadata = {
  title: id.calculator.metaTitle,
  description: id.calculator.metaDescription,
};

export default function CalculatorRoute() {
  return <CalculatorWorkspace />;
}
