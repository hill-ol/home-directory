"use client";

import type { RefObject } from "react";
import { useEffect } from "react";

interface RestoreFocusOptions {
    open: boolean;
    containerRef: RefObject<HTMLElement | null>;
    selector: string;
}

export function useRestoreFocus({
    open,
    containerRef,
    selector,
}: RestoreFocusOptions): void {
    useEffect(() => {
        if (!open) return;

        const previouslyFocused =
            document.activeElement instanceof HTMLElement
                ? document.activeElement
                : null;

        const animationFrame = window.requestAnimationFrame(() => {
            const container = containerRef.current;
            if (!container) return;

            const target =
                container.querySelector<HTMLElement>(selector);

            (target ?? container).focus();
        });

        return () => {
            window.cancelAnimationFrame(animationFrame);
            previouslyFocused?.focus();
        };
    }, [containerRef, open, selector]);
}
