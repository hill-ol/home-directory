import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("opens and closes a project through browser history", async ({ page }) => {
  await page.goto("/");

  await page
    .getByRole("button", { name: "StyleBoard.jsx" })
    .click();

  await expect(page).toHaveURL(/\/projects\/styleboard$/);
  await expect(page.getByRole("dialog")).toBeVisible();

  await page.goBack();

  await expect(page).toHaveURL("/");
  await expect(page.getByRole("dialog")).toBeHidden();

  await page.goForward();

  await expect(page).toHaveURL(/\/projects\/styleboard$/);
  await expect(page.getByRole("dialog")).toBeVisible();
});

test("a direct project URL renders a full page", async ({ page }) => {
    await page.goto("/projects/styleboard");

    await expect(
        page.getByRole("heading", { name: "StyleBoard" }),
    ).toBeVisible();

    await expect(page.getByRole("dialog")).toHaveCount(0);
});

test("project dialog closes with Escape", async ({ page }) => {
    await page.goto("/");

    await page
        .getByRole("button", { name: "StyleBoard.jsx" })
        .click();

    await page.keyboard.press("Escape");

    await expect(page).toHaveURL("/");
    await expect(page.getByRole("dialog")).toBeHidden();
});

test("metadata routes are available", async ({ request }) => {
    const robots = await request.get("/robots.txt");
    expect(robots.ok()).toBeTruthy();
    expect(await robots.text()).toContain("User-Agent");

    const sitemap = await request.get("/sitemap.xml");
    expect(sitemap.ok()).toBeTruthy();
    expect(await sitemap.text()).toContain("/projects/styleboard");
});

test("the reach-out folder is not in the tab order while closed", async ({
    page,
}) => {
    await page.goto("/");

    /*
     * Walk the real tab sequence rather than counting links by role: the
     * folder hides with opacity so it can fade, and neither opacity 0 nor
     * pointerEvents: none removes an element from the tab order. It is inert
     * while closed. Without that, the four contact links sit in the sequence
     * ahead of the button that reveals them and focus disappears four times.
     */
    const invisibleStops: string[] = [];

    for (let i = 0; i < 20; i++) {
        await page.keyboard.press("Tab");

        const stop = await page.evaluate(() => {
            const element = document.activeElement;
            if (!element || element === document.body) return null;

            let opacity = 1;
            let node: Element | null = element;
            while (node && node !== document.body) {
                const value = parseFloat(getComputedStyle(node).opacity);
                if (!Number.isNaN(value)) opacity *= value;
                node = node.parentElement;
            }

            return {
                label:
                    element.getAttribute("aria-label") ??
                    element.textContent?.trim().slice(0, 30) ??
                    element.tagName,
                hidden: opacity < 0.05,
            };
        });

        if (stop === null) break;
        if (stop.hidden) invisibleStops.push(stop.label);
    }

    expect(invisibleStops).toEqual([]);

    // The links are reachable once the folder is actually open.
    await page.getByRole("button", { name: "reach out" }).click();
    await expect(
        page.locator("aside").getByRole("link", { name: "GitHub" }),
    ).toBeVisible();
});

/*
 * Every route, both breakpoints.
 *
 * reducedMotion matters more than it looks: the pages fade their content in
 * with Framer, and axe run mid-fade measures partially transparent text and
 * reports contrast failures that do not exist at rest. Settling the
 * animations first is what makes this stable.
 */
test.describe("accessibility", () => {
    test.use({ contextOptions: { reducedMotion: "reduce" } });

    const routes = [
        "/",
        "/work",
        "/readme",
        "/research",
        "/coursework",
        "/projects/styleboard",
        "/a-route-that-does-not-exist",
    ];

    /*
     * Three open contrast issues, tracked here rather than hidden, because
     * each needs a design decision about how far to push the brand pink:
     *
     *   /projects/*   ProjectHeader puts white Playfair on the pink at 1.87:1
     *                 against a 3:1 large-text floor, and its filename eyebrow
     *                 at 1.56:1 against 4.5:1. The homepage overlay shares it.
     *   /coursework   the five desktop spine tabs put each semester's dark
     *                 shade on its own 70% alpha fill: 1.88:1 to 2.90:1.
     *   /readme       the four mobile passport stamp seasons put inkSecondary
     *                 on the pastel stamp fills: 3.06:1 to 3.73:1.
     *
     * Each is breakpoint specific, hence the project names. test.fail inverts
     * the assertion, so any of these turning green makes the suite red, which
     * is the prompt to delete that entry.
     */
    const knownFailures: Record<string, string[]> = {
        "/projects/styleboard": ["chromium", "mobile-chrome"],
        "/coursework": ["chromium"],
        "/readme": ["mobile-chrome"],
    };

    for (const route of routes) {
        test(`${route} has no automated violations`, async ({
            page,
        }, testInfo) => {
            if (knownFailures[route]?.includes(testInfo.project.name)) {
                test.fail();
            }

            /*
             * networkidle, not the default load event. The poster and photo
             * images finish after load, and axe run before they settle
             * measures text against a background that is not there yet.
             */
            await page.goto(route, { waitUntil: "networkidle" });

            /*
             * Scroll the whole page before measuring. Rows animate in with
             * whileInView, so anything below the fold sits at opacity 0 until
             * its observer fires, and axe reads that as unreadable text.
             */
            await page.evaluate(async () => {
                const step = window.innerHeight;
                for (let y = 0; y < document.body.scrollHeight; y += step) {
                    window.scrollTo(0, y);
                    await new Promise((resolve) =>
                        requestAnimationFrame(() => resolve(null)),
                    );
                }
                window.scrollTo(0, 0);
            });

            /*
             * Then wait for the fades to finish.
             *
             * reducedMotion is not enough on its own: MotionConfig runs with
             * reducedMotion="user", which drops transform and layout
             * animations but keeps opacity ones on purpose, since a fade is
             * not a vestibular trigger. Measuring mid-fade reads partially
             * transparent text and invents contrast failures, so poll until
             * every opacity holds steady across two frames.
             */
            await page.waitForFunction(
                () => {
                    const sample = () =>
                        [...document.querySelectorAll("*")]
                            .map((el) => getComputedStyle(el).opacity)
                            .join(",");

                    const before = sample();
                    const holder = window as unknown as {
                        __lastOpacities?: string;
                    };
                    const settled = holder.__lastOpacities === before;
                    holder.__lastOpacities = before;
                    return settled;
                },
                undefined,
                { polling: 120, timeout: 5000 },
            );

            const results = await new AxeBuilder({ page })
                .withTags([
                    "wcag2a",
                    "wcag2aa",
                    "wcag21a",
                    "wcag21aa",
                ])
                .analyze();

            expect(
                results.violations.map((violation) => ({
                    id: violation.id,
                    nodes: violation.nodes.map((node) => node.html),
                })),
            ).toEqual([]);
        });
    }
});
