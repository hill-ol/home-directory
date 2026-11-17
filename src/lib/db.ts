import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

/*
 * The Neon HTTP driver, which works on the edge runtime. That matters for
 * src/app/og/route.tsx, which runs on edge and cannot use a driver that
 * needs a TCP socket.
 *
 * Built on first query rather than at module load, so importing this file
 * without DATABASE_URL set does not throw. Next analyses route modules
 * during `next build`, and an eager client would turn a missing env var
 * into a failed build rather than a failed request.
 */
let client: NeonQueryFunction<false, false> | null = null;

export function db(): NeonQueryFunction<false, false> {
    if (client) return client;

    const url = process.env.DATABASE_URL;

    if (!url) {
        throw new Error(
            "DATABASE_URL is not set. Copy the connection string from the " +
            "Neon dashboard into .env.local, and add it to the Vercel " +
            "project settings for deployments.",
        );
    }

    client = neon(url);
    return client;
}
