import "server-only";
import { Files } from "files-sdk";
import { neon } from "files-sdk/neon";

/*
 * The two buckets declared in neon.ts. Both are public_read: these hold
 * project screenshots and org logos, which next/image loads directly. A
 * private bucket would need a signed, expiring URL minted on every render,
 * which cannot be statically rendered or cached.
 *
 * Writes still require the branch credential, so this is anonymous read with
 * authenticated write.
 */
export const BUCKETS = {
    projectMedia: "project-media",
    orgLogo: "org-logo",
} as const;

export type BucketName = (typeof BUCKETS)[keyof typeof BUCKETS];

function endpoint(): string {
    const url = process.env.AWS_ENDPOINT_URL_S3;

    if (!url) {
        throw new Error(
            "AWS_ENDPOINT_URL_S3 is not set. Run `neon deploy` to pull the " +
            "branch's storage credentials into .env.local.",
        );
    }

    return url.replace(/\/$/, "");
}

/*
 * A public_read object is served at <endpoint>/<bucket>/<key>. The endpoint
 * is branch-scoped, so a preview branch serves its own copy of the object
 * from its own host, which is what makes storage branch with the database.
 */
export function publicUrl(bucket: BucketName, key: string): string {
    return `${endpoint()}/${bucket}/${encodeURI(key)}`;
}

function client(bucket: BucketName) {
    /*
     * The adapter reads the endpoint, region and credentials from the
     * standard AWS_* env vars Neon injects, so only the bucket is passed.
     */
    return new Files({ adapter: neon({ bucket }) });
}

/*
 * Uploads and returns the public URL.
 *
 * Callers should write each version to a NEW key rather than overwriting
 * one, because a cached object is only as fresh as its key. Store the
 * returned URL on the content row and the old object becomes garbage to
 * collect later, instead of a stale image served until its TTL expires.
 */
export async function uploadPublic(
    bucket: BucketName,
    key: string,
    body: Uint8Array | Buffer | Blob | string,
    contentType: string,
): Promise<string> {
    await client(bucket).upload(key, body, { contentType });
    return publicUrl(bucket, key);
}

export async function deleteObject(
    bucket: BucketName,
    key: string,
): Promise<void> {
    await client(bucket).delete(key);
}

export async function listObjects(bucket: BucketName, prefix?: string) {
    return client(bucket).list(prefix ? { prefix } : undefined);
}
