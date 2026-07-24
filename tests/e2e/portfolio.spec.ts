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

  await page.goForward()

  await expect(page).toHaveURL(/\/\projects\/styleboard$);
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

test("homepage has no automated accessibility violations", async ({
    page,
}) => {
    await page.goto("/");

    const results = await new AxeBuilder({ page }).analyze();

    expect(results.violations).toEqual([]);
});
