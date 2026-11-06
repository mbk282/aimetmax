"use client";

import { useEffect } from "react";
import { onthoudHerkomst } from "@/lib/herkomst";

// Staat in de root-layout en draait één keer per volledig paginabezoek.
// Onthoudt utm-parameters en de verwijzende site in sessionStorage (geen
// cookie), zodat de bestelpagina ze bij een bestelling aan Stripe kan meegeven.
// Zie src/lib/herkomst.ts.
export function HerkomstOnthouden() {
  useEffect(() => {
    onthoudHerkomst();
  }, []);
  return null;
}
