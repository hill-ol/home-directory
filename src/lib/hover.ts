import type { FocusEvent, MouseEvent } from "react";

import { color, line } from "@/lib/theme";

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

export function applyStyle<T extends HTMLElement = HTMLElement>(
    styles: InlineStyle,
) {
    return (event: StyleEvent<T>) => {
        Object.assign(event.currentTarget.style, styles);
    };
}

export function hoverSwap<T extends HTMLElement = HTMLElement>(
    on: InlineStyle,
    off: InlineStyle,
) {
    return {
        onMouseEnter: applyStyle<T>(on),
        onMouseLeave: applyStyle<T>(off),
    };
}

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

export const accentText = hoverSwap(
    { color: color.pink },
    { color: color.inkSecondary },
);

export const accentPill = hoverSwap(
    { borderColor: color.pink, color: color.pink },
    { borderColor: line.pill, color: color.ink },
);