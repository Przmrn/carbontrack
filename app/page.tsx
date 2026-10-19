// Calculator route. State comes from the store mounted in the root layout.
import type { Metadata } from "next";
import CalculatorWorkspace from "../components/calculator/CalculatorWorkspace";
import { en } from "../content/en";

export const metadata: Metadata = {
  title: en.calculator.metaTitle,
  description: en.calculator.metaDescription,
};

export default function CalculatorRoute() {
  return <CalculatorWorkspace />;
}
