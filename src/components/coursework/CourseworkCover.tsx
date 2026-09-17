import CourseworkEmblem from "@/components/coursework/CourseworkEmblem";
import { bio } from "@/content/bio";
import { color, font } from "@/lib/theme";

/*
 * What the binder shows before a semester is picked. The desktop cover gets
 * the larger emblem with its detail marks and stacks the two majors on
 * separate lines; the mobile card runs them together to save vertical space.
 */
export default function CourseworkCover({
    variant,
}: {
    variant: "mobile" | "desktop";
}) {
    const isDesktop = variant === "desktop";

    const name = (
        <div
            style={{
                marginBottom: isDesktop ? "10px" : undefined,
                color: color.ink,
                fontFamily: font.display,
                fontSize: isDesktop ? "28px" : "20px",
                fontWeight: isDesktop ? 400 : undefined,
            }}
        >
            {bio.name}
        </div>
    );

    const majors = (
        <div
            style={{
                color: color.inkSecondary,
                fontFamily: font.system,
                fontSize: isDesktop ? "12px" : "11px",
                letterSpacing: isDesktop ? "0.04em" : undefined,
                lineHeight: 2,
            }}
        >
            {/*
             * Desktop has the height for one major per line; mobile joins
             * them onto a single line.
             */}
            {isDesktop ? (
                bio.majors.map((major) => (
                    <span key={major}>
                        {major}
                        <br />
                    </span>
                ))
            ) : (
                <>
                    {bio.majors.join(" · ")}
                    <br />
                </>
            )}
            {bio.school}
        </div>
    );

    return (
        <>
            <CourseworkEmblem
                width={isDesktop ? 200 : 120}
                height={isDesktop ? 100 : 60}
                detail={isDesktop}
            />

            {/*
             * Desktop groups the name with the majors so the cover's 24px gap
             * falls around the pair rather than between them. Mobile lets all
             * four blocks share the same 16px gap.
             */}
            {isDesktop ? (
                <div>
                    {name}
                    {majors}
                </div>
            ) : (
                <>
                    {name}
                    {majors}
                </>
            )}

            <div
                style={{
                    color: color.inkSecondary,
                    fontFamily: font.system,
                    fontSize: "10px",
                    letterSpacing: isDesktop ? "0.05em" : undefined,
                }}
            >
                {isDesktop
                    ? "select a semester →"
                    : "select a semester above"}
            </div>
        </>
    );
}
