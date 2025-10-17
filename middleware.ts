import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => !!token,
  },
  pages: {
    signIn: "/admin/login",
  },
});

export const config = {
  // Protect all /admin routes except /admin/login
  matcher: [
    "/admin/((?!login).*)",
    "/api/admin/:path*",
  ],
};
