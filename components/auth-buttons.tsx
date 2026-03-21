"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

type AuthButtonsProps = {
  compact?: boolean;
};

export function AuthButtons({ compact = false }: AuthButtonsProps) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <span className="inline-note">Ucitavanje naloga...</span>;
  }

  if (!session?.user) {
    return (
      <button
        className={compact ? "secondary-button" : "public-site-header__cta"}
        onClick={() => void signIn("google")}
        type="button"
      >
        Uloguj se
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
