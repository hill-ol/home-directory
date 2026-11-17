import "server-only";
import * as simpleIcons from "simple-icons";
import type { SimpleIcon } from "simple-icons";
import type { StoredStackItem } from "@/lib/content";

/*
 * A stack entry as the browser receives it: the icon already resolved to its
 * path and brand colour.
 *
 * This resolution is deliberately server-side. Looking an icon up by slug
 * needs the whole simple-icons namespace, and a dynamic index into it cannot
 * be tree-shaken, so doing this in StackOrbit (a client component) would ship
 * the entire icon set to the browser. Resolving here sends two strings per
 * icon instead.
 */
export type ResolvedStackItem = {
    label: string;
    iconSlug: string;
    path: string;
    hex: string;
    desktop: { top: string; left: string };
};

const icons = simpleIcons as unknown as Record<string, SimpleIcon | undefined>;

/*
 * simple-icons exports each icon as `si` + the slug with its first letter
 * capitalised: "nextdotjs" is siNextdotjs, "openjdk" is siOpenjdk. Slugs are
 * lowercase alphanumeric, so this transform is total over them.
 */
export function iconExportName(slug: string): string {
    return `si${slug.charAt(0).toUpperCase()}${slug.slice(1)}`;
}

export function findIcon(slug: string): SimpleIcon | undefined {
    return icons[iconExportName(slug)];
}

/*
 * An unknown slug is dropped rather than thrown on, because this runs on
 * every render of the homepage: one bad row should cost one icon, not the
 * whole page. The editor validates the slug at write time, which is where a
 * bad value should be refused.
 */
export function resolveStackIcons(
    stored: StoredStackItem[],
): ResolvedStackItem[] {
    return stored.flatMap((item) => {
        const icon = findIcon(item.iconSlug);

        if (!icon) {
            console.warn(`Unknown simple-icons slug "${item.iconSlug}".`);
            return [];
        }

        return [{ ...item, path: icon.path, hex: icon.hex }];
    });
}
