import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      const pathname = req.nextUrl.pathname;

      if (!token) {
        return false;
      }

      if (pathname.startsWith("/admin/owner")) {
        return token.role === "owner";
      }

      if (pathname.startsWith("/admin/staff")) {
        return token.role === "owner" || token.role === "staff";
      }

      if (pathname.startsWith("/account")) {
        return Boolean(token.userId);
      }

      if (pathname === "/admin") {
        return token.role === "owner" || token.role === "staff";
      }

      return true;
    }
  }
});

export const config = {
  matcher: ["/admin/:path*", "/account/:path*"]
};
