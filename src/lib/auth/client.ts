"use client";

import { createAuthClient } from "@neon/auth/next";

/*
 * Takes no arguments on purpose: it talks to the same-origin proxy at
 * /api/auth, so no Auth URL is exposed to the browser.
 */
export const authClient = createAuthClient();
