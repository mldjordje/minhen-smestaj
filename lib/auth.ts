import type { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import type { Session } from "next-auth";
import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { db, ensureDatabaseSchema } from "@/lib/db";
import type { AppUser, UserRole } from "@/lib/types";

function resolveRoleFromConfig(email: string) {
  const normalizedEmail = email.toLowerCase();
  const ownerEmails = (process.env.OWNER_EMAILS || "")
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);
  const staffEmails = (process.env.STAFF_EMAILS || "")
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);

  if (ownerEmails.includes(normalizedEmail)) {
    return "owner" as UserRole;
  }

  if (staffEmails.includes(normalizedEmail)) {
    return "staff" as UserRole;
  }

  return null;
}

async function getStoredUserByEmail(email: string) {
  if (!db) {
    return null;
  }

  await ensureDatabaseSchema();

  const userRows = await db<AppUser[]>`
    select id, email, name, image, role
    from users
    where email = ${email}
    limit 1
  `;

  return userRows[0] ?? null;
}

export function getDefaultPostLoginPath(role: UserRole) {
  if (role === "owner") {
    return "/admin/owner";
  }

  if (role === "staff") {
    return "/admin/staff";
  }

  return "/account";
}

export function sanitizeCallbackUrl(callbackUrl?: string | null) {
  if (!callbackUrl || !callbackUrl.startsWith("/") || callbackUrl.startsWith("//")) {
    return null;
  }

  return callbackUrl;
}

async function upsertAppUser(params: {
  email: string;
  image?: string | null;
  name: string;
}) {
  if (!db) {
    return {
      id: params.email,
      email: params.email,
      name: params.name,
      image: params.image ?? null,
      role: resolveRoleFromConfig(params.email) ?? "guest"
    } satisfies AppUser;
  }

  await ensureDatabaseSchema();

  const existingUser = await getStoredUserByEmail(params.email);
  const role = resolveRoleFromConfig(params.email) ?? existingUser?.role ?? "guest";
  const userRows = await db<AppUser[]>`
    insert into users (id, email, name, image, role, updated_at)
    values (
      ${randomUUID()},
      ${params.email},
      ${params.name},
      ${params.image ?? null},
      ${role},
      now()
    )
    on conflict (email) do update
    set
      name = excluded.name,
      image = excluded.image,
      role = excluded.role,
      updated_at = now()
    returning id, email, name, image, role
  `;

  return userRows[0];
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt"
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "missing-google-client-id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "missing-google-client-secret"
    })
  ],
  callbacks: {
    async signIn({ user }) {
      if (!user.email) {
        return false;
      }

      const appUser = await upsertAppUser({
        email: user.email,
        image: user.image,
        name: user.name || user.email.split("@")[0]
      });

      user.id = appUser.id;
      user.role = appUser.role;
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.id;
        token.role = user.role;
      }

      if ((!token.role || !token.userId) && token.email) {
        const appUser = await upsertAppUser({
          email: token.email,
          image: typeof token.picture === "string" ? token.picture : null,
          name:
            typeof token.name === "string" && token.name.trim().length > 0
              ? token.name
              : token.email.split("@")[0]
        });

        token.userId = appUser.id;
        token.role = appUser.role;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.userId || session.user.email || "guest";
        session.user.role = token.role || "guest";
      }

      return session;
    }
  },
  pages: {
    signIn: "/signin"
  }
};

export function getAuthSession() {
  return getServerSession(authOptions);
}

export async function requireSession() {
  const session = await getAuthSession();

  if (!session?.user) {
    return null;
  }

  return session;
}

export async function requireRole(roles: UserRole[]) {
  const session = await requireSession();

  if (!session?.user || !roles.includes(session.user.role)) {
    return null;
  }

  return session;
}

export async function requireApiRole(request: Request, roles?: UserRole[]) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json(
      {
        ok: false,
        message: "Morate biti prijavljeni."
      },
      { status: 401 }
    );
  }

  if (roles && !roles.includes(session.user.role)) {
    return NextResponse.json(
      {
        ok: false,
        message: "Nemate dozvolu za ovu akciju."
      },
      { status: 403 }
    );
  }

  return session;
}

export function buildLoginCallbackUrl(pathname: string) {
  return `/api/auth/signin?callbackUrl=${encodeURIComponent(pathname)}`;
}

export function isSignedIn(session: Session | null) {
  return Boolean(session?.user?.id);
}
