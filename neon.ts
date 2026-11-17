import { defineConfig } from "@neon/config/v1";

export default defineConfig({
  // Declare your Neon services here
  auth: true,
  /*
   * Both buckets are public_read on purpose. These hold project screenshots
   * and org logos: images rendered by next/image on a public portfolio.
   * A private bucket would mean minting a signed, expiring URL on every
   * render, which breaks static rendering, image caching, and the OG route.
   * Writes still require a credential, so this is public read with
   * authenticated write.
   */
  buckets: {
    "project-media": { access: "public_read" },
    "org-logo": { access: "public_read" },
  },
  // Branch policy: per-branch tuning
  branch: (branch) => {
    if (branch.isDefault) {
      // Default branch: no overrides, uses project defaults
      return {};
    }
    if (!branch.exists) {
      // New non-default branches: auto-expire
      // Run `neon checkout <name>` to create a new branch with these settings
      return { ttl: "7d" };
    }
    // Existing branch: no changes
    return {};
  },
});
