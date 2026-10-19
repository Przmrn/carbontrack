// Dev-only 12-column grid overlay, enabled with ?grid=1 (DESIGN.md §3).
"use client";

import { useEffect } from "react";

export default function GridOverlay() {
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("grid") === "1") {
      document.body.classList.add("show-grid");
    }
  }, []);
  return null;
}
