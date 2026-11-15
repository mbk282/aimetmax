"use client";

import { useEffect } from "react";
import { renderCharts } from "./charts";

export default function Charts({ data }: { data: unknown }) {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".sj");
    if (!root) return;
    return renderCharts(root, data);
  }, [data]);
  return null;
}
