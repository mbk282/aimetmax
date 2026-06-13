"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/academy", label: "E-learnings", external: true },
  { href: "/tools", label: "Gratis AI-tools" },
  { href: "/blog", label: "Artikelen" },
  { href: "/boek", label: "Boek" },
  { href: "/over", label: "Over" },
];

function NavItem({
  href,
  label,
  external,
  onClick,
  className,
}: {
  href: string;
  label: string;
  external?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  // /academy is een statische rewrite, dus gewone <a> i.p.v. client-side <Link>.
  if (external) {
    return (
      <a href={href} onClick={onClick} className={className}>
        {label}
      </a>
    );
  }
  return (
    <Link href={href} onClick={onClick} className={className}>
      {label}
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="border-b-2 border-line bg-card">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="hand text-2xl font-bold text-ink" onClick={close}>
          AI met Max
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-6 text-sm md:flex">
          {links.map((l) => (
            <NavItem
              key={l.href}
              {...l}
              className="font-medium text-ink-soft hover:text-accent"
            />
          ))}
          <Link href="/contact" className="btn btn-primary !px-4 !py-2 text-sm">
            Voor organisaties
          </Link>
        </div>

        {/* Mobiel: hamburger */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          aria-expanded={open}
          className="text-ink md:hidden"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? (
              <path d="M6 6 L18 18 M18 6 L6 18" />
            ) : (
              <path d="M4 7 H20 M4 12 H20 M4 17 H20" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobiel: uitklapmenu */}
      {open && (
        <div className="border-t-2 border-line md:hidden">
          <div className="mx-auto flex max-w-5xl flex-col gap-1 px-6 py-3">
            {links.map((l) => (
              <NavItem
                key={l.href}
                {...l}
                onClick={close}
                className="py-2 font-medium text-ink-soft hover:text-accent"
              />
            ))}
            <Link
              href="/contact"
              onClick={close}
              className="btn btn-primary mt-2 text-sm"
            >
              Voor organisaties
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
