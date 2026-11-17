import { auth } from "@/lib/auth/server";

/*
 * Gate /studio only.
 *
 * Neon's default recipe is a catch-all matcher with the public pages listed
 * in publicRoutes. That is backwards here: this is a public portfolio with
 * one private area, not a private app with a few public pages. Scoping the
 * matcher means a new public route is public by default and cannot be
 * accidentally locked behind a login.
 *
 * This is page protection, not authorization. Every write still calls
 * requireSession() in the handler, because middleware does not run for a
 * direct request to a route it does not match.
 */
export default auth.middleware({
    loginUrl: "/auth/sign-in",
    publicRoutes: [],
});

export const config = {
    matcher: ["/studio/:path*"],
};
