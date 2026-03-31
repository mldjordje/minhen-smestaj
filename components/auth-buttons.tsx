"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

type AuthButtonsProps = {
  callbackUrl?: string;
  compact?: boolean;
  label?: string;
};

function buildSignInHref(callbackUrl?: string) {
  if (!callbackUrl) {
    return "/signin";
  }

  return `/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`;
}

export function AuthButtons({
  callbackUrl,
  compact = false,
  label = "Uloguj se"
}: AuthButtonsProps) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <span className="inline-note">Ucitavanje naloga...</span>;
  }

  if (!session?.user) {
    if (!compact) {
      return (
        <Link className="public-site-header__cta" href={buildSignInHref(callbackUrl)}>
          {label}
        </Link>
      );
    }

    return (
      <button
        className="secondary-button"
        onClick={() => void signIn("google", { callbackUrl: callbackUrl || "/account" })}
        type="button"
      >
        {label}
      </button>
    );
  }

  return (
    <div className="auth-actions">
      <Link className={compact ? "secondary-button" : "public-site-header__link"} href="/account">
        Moj nalog
      </Link>
      {session.user.role === "owner" || session.user.role === "staff" ? (
        <Link className={compact ? "secondary-button" : "public-site-header__link"} href="/admin">
          Admin
        </Link>
      ) : null}
      <button
        className={compact ? "secondary-button" : "public-site-header__cta"}
        onClick={() => void signOut({ callbackUrl: "/" })}
        type="button"
      >
        Izloguj se
      </button>
    </div>
  );
}
