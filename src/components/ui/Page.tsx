import { color } from "@/lib/theme";

/**
 * The two full-screen shapes this site uses, switched by `variant` the same
 * way `FolderIcon` and `WorkRow` switch theirs.
 *
 * `column` is a centred reading column under the fixed menu bar: `/work`,
 * `/research`, `/coursework`, and the studio pages. The 80px top padding is
 * what clears the bar.
 *
 * `centered` is a single block in the middle of the viewport: sign-in and the
 * loading screen.
 *
 * Not every surface belongs here. The homepage is an absolutely positioned
 * canvas, `/readme` is a full-bleed two column hero, and `not-found` animates
 * its own `main`. Forcing those through a shared shell would mean a prop per
 * difference, which is the trade `PosterImage` already declines.
 */
export default function Page({
    variant = "column",
    maxWidth = "900px",
    children,
}: {
    variant?: "column" | "centered";
    maxWidth?: string;
    children: React.ReactNode;
}) {
    if (variant === "centered") {
        return (
            <main style={{
                minHeight: "100vh",
                backgroundColor: color.cream,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "80px 24px",
            }}>
                {children}
            </main>
        );
    }

    return (
        <main style={{
            minHeight: "100vh",
            backgroundColor: color.cream,
            paddingTop: "80px",
            paddingBottom: "96px",
        }}>
            <div style={{ maxWidth, margin: "0 auto", padding: "0 24px" }}>
                {children}
            </div>
        </main>
    );
}
