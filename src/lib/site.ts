/*
 * The canonical origin for this deployment.
 *
 * Kept in one place so connecting a custom domain is a single edit rather than
 * a find and replace across the metadata, the sitemap, and robots.txt.
 *
 * Next resolves relative metadata URLs such as "/og" against metadataBase, so
 * this has to be an absolute origin with no trailing slash.
 */
export const siteUrl = "https://home-directory.vercel.app";
