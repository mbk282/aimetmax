"use client";

import { useState } from "react";

export function ProtectedPhone() {
  const [phone, setPhone] = useState<{ display: string; href: string } | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);

  async function reveal() {
    setLoading(true);
    setFailed(false);
    try {
      const response = await fetch("/api/contact-telefoon", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: "{}",
      });
      if (!response.ok) throw new Error("phone_unavailable");
      setPhone(await response.json());
    } catch {
      setFailed(true);
    } finally {
      setLoading(false);
    }
  }

  if (phone) {
    return (
      <a href={phone.href} className="text-ink-soft hover:text-accent">
        {phone.display}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={reveal}
      disabled={loading}
      className="text-left text-ink-soft underline decoration-line underline-offset-2 hover:text-accent disabled:opacity-60"
    >
      {loading
        ? "Telefoonnummer laden…"
        : failed
          ? "Laden mislukt — probeer opnieuw"
          : "Toon telefoonnummer"}
    </button>
  );
}
