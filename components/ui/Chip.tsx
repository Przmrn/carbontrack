// Chip primitive: 0 radius, label-code, scope variants (DESIGN.md §3/§4).
import type { ReactNode } from "react";

type ChipScope = 1 | 2 | 3;
type ChipTone = "neutral" | "sage" | "alert";

interface ChipProps {
  children: ReactNode;
  scope?: ChipScope;
  tone?: ChipTone;
}

export default function Chip({ children, scope, tone = "neutral" }: ChipProps) {
  const classes = ["cm-chip"];
  if (tone !== "neutral") classes.push(`cm-chip-${tone}`);
  if (scope !== undefined) classes.push(`cm-chip-s${scope}`);
  return <span className={classes.join(" ")}>{children}</span>;
}