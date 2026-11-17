import { color, font } from "@/lib/theme";

/**
 * The line that reports what just happened: "Saved.", "Unsaved changes.", or
 * why a write was refused.
 *
 * The tone picks the role as well as the colour, so an error is announced
 * assertively and a neutral update is not. Getting that pairing wrong is easy
 * when every caller writes its own span, which is what they were doing.
 *
 * `pinkText` rather than the brand pink: it is the only accent that clears
 * 4.5:1 on cream, and this text has to be readable.
 */
export default function StatusText({
    tone = "neutral",
    size = "sm",
    children,
}: {
    tone?: "neutral" | "error";
    /** `md` for a standalone message, such as a failed sign-in. */
    size?: "sm" | "md";
    children: React.ReactNode;
}) {
    if (!children) return null;

    const isError = tone === "error";

    return (
        <span
            role={isError ? "alert" : "status"}
            style={{
                fontFamily: size === "md" ? font.body : font.system,
                fontSize: size === "md" ? "13px" : "10px",
                fontWeight: size === "md" ? 300 : undefined,
                lineHeight: size === "md" ? 1.5 : undefined,
                color: isError ? color.pinkText : color.inkSecondary,
            }}
        >
            {children}
        </span>
    );
}
