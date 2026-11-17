import "server-only";
import { createNeonAuth } from "@neon/auth/next/server";

/*
 * Managed Better Auth. Users and sessions live in the neon_auth schema on
 * this branch, so auth state branches with the content it protects.
 *
 * NEON_AUTH_BASE_URL is injected by `neon deploy`. The cookie secret is not:
 * it is application config, generated once with `openssl rand -base64 32`.
 */
export const auth = createNeonAuth({
    baseUrl: process.env.NEON_AUTH_BASE_URL!,
    cookies: { secret: process.env.NEON_AUTH_COOKIE_SECRET! },
});

/*
 * This site has exactly one author, and "signed in" is not the same as "is
 * the author".
 *
 * Managed Auth exposes sign-up through the same catch-all proxy as sign-in,
 * so unless sign-up is disabled on the branch a stranger can create an
 * account and arrive here holding a perfectly valid session. Checking the
 * session alone would hand them the content table.
 *
 * Fails closed: an unset AUTH_OWNER_EMAIL denies everyone rather than
 * allowing anyone.
 */
function isOwner(email: string | null | undefined): boolean {
    const owner = process.env.AUTH_OWNER_EMAIL?.trim().toLowerCase();
    if (!owner || !email) return false;
    return email.trim().toLowerCase() === owner;
}

/*
 * The single choke point for every write.
 *
 * Plain Lakebase Postgres has no row-level security standing behind this, so
 * this call is the only thing between the internet and the content table.
 * Every server action that writes MUST call it, and there should never be a
 * second session check written somewhere else: one function to audit is the
 * whole point.
 */
export async function requireSession() {
    const { data: session } = await auth.getSession();

    if (!session?.user || !isOwner(session.user.email)) {
        throw new Response("Unauthorized", { status: 401 });
    }

    return session;
}

/* The signed-in owner, or null. Null for a signed-in non-owner too. */
export async function currentUser() {
    const { data: session } = await auth.getSession();
    const user = session?.user;
    return user && isOwner(user.email) ? user : null;
}
