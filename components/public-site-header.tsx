"use client";

import Link from "next/link";
import { useState } from "react";
import { AuthButtons } from "@/components/auth-buttons";

const navigation = [
  { href: "/", label: "Pocetna" },
  { href: "/#o-smestaju", label: "O smestaju" },
  { href: "/rooms", label: "Sobe" },
  { href: "/#lokacija", label: "Lokacija" },
  { href: "/#rezervacija", label: "Rezervacija" }
];

export function PublicSiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen((currentValue) => !currentValue);
  };

  return (
    <header className="public-site-header">
      <div className="container">
        <div className="public-site-header__inner">
          <Link
            aria-label="Povratak na pocetnu stranicu"
            className="cs_site_brand site-text-brand public-site-header__brand"
            href="/"
            onClick={closeMenu}
          >
            <span>Jagdschlossl</span>
            <small>Eichenried</small>
          </Link>

          <button
            aria-controls="public-site-menu"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Zatvori meni" : "Otvori meni"}
            className={`public-site-header__toggle ${isMenuOpen ? "is-active" : ""}`}
            onClick={toggleMenu}
            type="button"
          >
            <span />
            <span />
            <span />
          </button>

          <div
            className={`public-site-header__nav-shell ${isMenuOpen ? "is-open" : ""}`}
            id="public-site-menu"
          >
            <nav aria-label="Glavna navigacija" className="public-site-header__nav">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  className="public-site-header__link"
                  href={item.href}
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <AuthButtons />
          </div>
        </div>
      </div>
    </header>
  );
}
