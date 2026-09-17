import type { FocusEvent, MouseEvent } from "react";

import { color, line } from "@/lib/theme";

/** The inline properties these helpers are allowed to swap. */
type InlineStyle = Partial<
    Record<
        | "color"
        | "backgroundColor"
        | "borderColor"
        | "boxShadow"
        | "opacity"
        | "transform",
        string
    >
>;

type StyleEvent<T extends HTMLElement> = MouseEvent<T> | FocusEvent<T>;

/*
 * Assigns inline styles to whichever element fired the event.
 *
 * These helpers mutate element.style directly instead of routing hover
 * through React state, which is deliberate: hover then costs no re-render,
 * and the easing is handled by the CSS transition already declared on the
 * element. Exported separately so a component can reuse one set of styles
 * across several handlers, which is what the context menu needs for hover
 * and keyboard focus.
 */
export function applyStyle<T extends HTMLElement = HTMLElement>(
    styles: InlineStyle,
) {
    return (event: StyleEvent<T>) => {
        Object.assign(event.currentTarget.style, styles);
    };
}

/** Spread onto an element to swap styles while the pointer is over it. */
export function hoverSwap<T extends HTMLElement = HTMLElement>(
    on: InlineStyle,
    off: InlineStyle,
) {
    return {
        onMouseEnter: applyStyle<T>(on),
        onMouseLeave: applyStyle<T>(off),
    };
}

/*
 * Same idea, but styles a descendant rather than the element itself. The
 * readme contact rows use this: hovering the whole row darkens only the
 * value on the right.
 */
export function hoverSwapChild<T extends HTMLElement = HTMLElement>(
    selector: string,
    on: InlineStyle,
    off: InlineStyle,
) {
    const apply = (event: MouseEvent<T>, styles: InlineStyle) => {
        const child =
            event.currentTarget.querySelector<HTMLElement>(selector);

        if (child) Object.assign(child.style, styles);
    };

    return {
        onMouseEnter: (event: MouseEvent<T>) => apply(event, on),
        onMouseLeave: (event: MouseEvent<T>) => apply(event, off),
    };
}

/** Secondary text that takes the accent on hover: nav items, back links. */
export const accentText = hoverSwap(
    { color: color.pink },
    { color: color.inkSecondary },
);

/** Outlined pill links, where the border and the label both take the accent. */
export const accentPill = hoverSwap(
    { borderColor: color.pink, color: color.pink },
    { borderColor: line.pill, color: color.ink },
);
