import { auth } from "@/lib/auth/server";

/* Same-origin proxy to Managed Auth. The browser client talks to this. */
export const { GET, POST, PUT, DELETE, PATCH } = auth.handler();
