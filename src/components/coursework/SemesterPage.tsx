"use client";

import { motion } from "framer-motion";
import type { CSSProperties } from "react";

import type { Semester } from "@/content/coursework";
import { color, font, line } from "@/lib/theme";

/*
 * The ruled line height. Every block on the page is a whole multiple of it so
 * the text sits on the rules instead of floating between them. Changing this
 * changes the whole grid.
 */
export const LINE_HEIGHT = 28;

type CourseworkVariant = "mobile" | "desktop";

/*
 * Both layouts render the same notebook page at two densities. The desktop
 * binder is roomier and carries the wider letter spacing; the mobile card is
 * tighter and pads itself, because its wrapper is the card rather than a
 * scrolling pane.
 */
const variants: Record<
    CourseworkVariant,
    {
        ruleAlpha: string;
        marginLeft: string;
        contentPadding?: string;
        labelSize: string;
        vibeSize: string;
        courseSize: string;
        tracking?: string;
        stagger: number;
        duration: number;
    }
> = {
    mobile: {
        ruleAlpha: "0.05",
        marginLeft: "36px",
        contentPadding: `0 20px ${LINE_HEIGHT}px 48px`,
        labelSize: "16px",
        vibeSize: "9px",
        courseSize: "12px",
        stagger: 0.06,
        duration: 0.2,
    },
    desktop: {
        ruleAlpha: "0.06",
        marginLeft: "40px",
        labelSize: "20px",
        vibeSize: "10px",
        courseSize: "13px",
        tracking: "0.04em",
        stagger: 0.07,
        duration: 0.22,
    },
};

/** One ruled row, so the course rows and the spacers stay on the grid. */
const row: CSSProperties = {
    height: `${LINE_HEIGHT}px`,
    display: "flex",
    alignItems: "center",
};

interface SemesterPageProps {
    semester: Semester;
    variant: CourseworkVariant;
}

export default function SemesterPage({
    semester,
    variant,
}: SemesterPageProps) {
    const {
        ruleAlpha,
        marginLeft,
        contentPadding,
        labelSize,
        vibeSize,
        courseSize,
        tracking,
        stagger,
        duration,
    } = variants[variant];

    return (
        <>
            {/* Ruled paper */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `repeating-linear-gradient(transparent,transparent ${LINE_HEIGHT - 1}px,rgba(28,25,23,${ruleAlpha}) ${LINE_HEIGHT - 1}px,rgba(28,25,23,${ruleAlpha}) ${LINE_HEIGHT}px)`,
                    backgroundSize: `100% ${LINE_HEIGHT}px`,
                    pointerEvents: "none",
                }}
            />

            {/* Margin line, tinted to the semester */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    left: marginLeft,
                    width: "1px",
                    backgroundColor: `${semester.color}50`,
                    pointerEvents: "none",
                }}
            />

            <div
                style={{
                    position: "relative",
                    padding: contentPadding,
                }}
            >
                {/* Header spans two rules */}
                <div
                    style={{
                        height: `${LINE_HEIGHT * 2}px`,
                        display: "flex",
                        alignItems: "flex-end",
                        paddingBottom: "5px",
                    }}
                >
                    <span
                        style={{
                            marginRight:
                                variant === "desktop" ? "10px" : "8px",
                            color: semester.darkColor,
                            fontFamily: font.display,
                            fontSize: labelSize,
                            fontStyle: "italic",
                        }}
                    >
                        {semester.label}
                    </span>

                    <span
                        style={{
                            color: color.inkSecondary,
                            fontFamily: font.system,
                            fontSize: vibeSize,
                            letterSpacing: tracking,
                        }}
                    >
                        {semester.vibe} · {semester.location}
                    </span>
                </div>

                <div style={{ height: `${LINE_HEIGHT}px` }} />

                {semester.courses.map((course, index) => (
                    <motion.div
                        key={course.name}
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                            delay: index * stagger,
                            duration,
                        }}
                    >
                        <div
                            style={{
                                ...row,
                                color: color.ink,
                                fontFamily: font.body,
                                fontSize: courseSize,
                                fontWeight: 400,
                            }}
                        >
                            {course.name}
                        </div>

                        <div
                            style={{
                                ...row,
                                color: color.inkSecondary,
                                fontFamily: font.display,
                                fontSize: "11px",
                                fontStyle: "italic",
                            }}
                        >
                            {course.note}
                        </div>

                        <div style={{ height: `${LINE_HEIGHT}px` }} />
                    </motion.div>
                ))}

                <div
                    style={{
                        ...row,
                        // A dashed hairline, so hairline() does not fit.
                        borderTop: `0.5px dashed ${line.card}`,
                    }}
                >
                    <span
                        style={{
                            color: color.inkSecondary,
                            fontFamily: font.system,
                            fontSize: "10px",
                            letterSpacing: tracking,
                        }}
                    >
                        {semester.courses.length} courses
                    </span>
                </div>
            </div>
        </>
    );
}
