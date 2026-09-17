# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: portfolio.spec.ts >> homepage has no automated accessibility violations
- Location: tests\e2e\portfolio.spec.ts:58:5

# Error details

```
Error: expect(received).toEqual(expected) // deep equality

- Expected  -  1
+ Received  + 64

- Array []
+ Array [
+   Object {
+     "description": "Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds",
+     "help": "Elements must meet minimum color contrast ratio thresholds",
+     "helpUrl": "https://dequeuniversity.com/rules/axe/4.12/color-contrast?application=playwright",
+     "id": "color-contrast",
+     "impact": "serious",
+     "nodes": Array [
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#f2ede4",
+               "contrastRatio": 1.6,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#f0a8cf",
+               "fontSize": "6.8pt (9px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 1.6 (foreground color: #f0a8cf, background color: #f2ede4, font size: 6.8pt (9px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<nav aria-label=\"Mobile navigation\" class=\"fixed bottom-0 left-0 right-0 md:hidden z-50\" style=\"padding-bottom:env(safe-area-inset-bottom);background-color:rgba(242,237,228,0.95);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border-top:0.5px solid rgba(28,25,23,0.08)\">",
+                 "target": Array [
+                   ".bottom-0",
+                 ],
+               },
+               Object {
+                 "html": "<main style=\"min-height:100vh;background-color:#F2EDE4;padding-top:72px;padding-bottom:96px\">",
+                 "target": Array [
+                   ".block > main",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 1.6 (foreground color: #f0a8cf, background color: #f2ede4, font size: 6.8pt (9px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<span style=\"font-family: var(--font-playfair); font-size: 9px; letter-spacing: 0.03em; color: rgb(240, 168, 207); font-style: italic;\">home</span>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "a[aria-current=\"page\"][href=\"/\"] > div > span",
+         ],
+       },
+     ],
+     "tags": Array [
+       "cat.color",
+       "wcag2aa",
+       "wcag143",
+       "TTv5",
+       "TT13.c",
+       "EN-301-549",
+       "EN-9.1.4.3",
+       "ACT",
+       "RGAAv4",
+       "RGAA-3.2.1",
+     ],
+   },
+ ]
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - link "Skip to main content" [ref=e2] [cursor=pointer]:
    - /url: "#main-content"
  - banner [ref=e3]:
    - generic [ref=e5]:
      - link "Home" [ref=e6] [cursor=pointer]:
        - /url: /
        - img [ref=e7]
      - link "Olivia Hill" [ref=e10] [cursor=pointer]:
        - /url: /
  - navigation "Mobile navigation" [ref=e11]:
    - generic [ref=e12]:
      - link "home" [ref=e13] [cursor=pointer]:
        - /url: /
        - generic [ref=e14]:
          - img [ref=e16]
          - generic [ref=e18]: home
      - link "work" [ref=e19] [cursor=pointer]:
        - /url: /work
        - generic [ref=e20]:
          - img [ref=e22]
          - generic [ref=e24]: work
      - link "readme" [ref=e25] [cursor=pointer]:
        - /url: /readme
        - generic [ref=e26]:
          - img [ref=e28]
          - generic [ref=e30]: readme
      - link "research" [ref=e31] [cursor=pointer]:
        - /url: /research
        - generic [ref=e32]:
          - img [ref=e34]
          - generic [ref=e36]: research
      - link "courses" [ref=e37] [cursor=pointer]:
        - /url: /coursework
        - generic [ref=e38]:
          - img [ref=e40]
          - generic [ref=e42]: courses
  - complementary "Quick contact links":
    - generic:
      - img
      - generic:
        - link "Email":
          - /url: mailto:hill.ol@northeastern.edu
          - generic: Email
        - link "LinkedIn":
          - /url: https://linkedin.com/in/olivia-hill0
          - generic: LinkedIn
        - link "GitHub":
          - /url: https://github.com/hill-ol
          - generic: GitHub
        - link "Resume":
          - /url: /resume_2026.pdf
          - generic: Resume
          - generic:
            - img:
              - generic: PDF
      - img:
        - generic: Reach Out!
    - button "reach out" [ref=e43] [cursor=pointer]: reach out
  - main [ref=e47]:
    - generic [ref=e48]:
      - generic [ref=e49]:
        - img "Olivia Hill" [ref=e52]
        - generic [ref=e53]:
          - heading "Olivia Hill" [level=1] [ref=e54]
          - paragraph [ref=e55]: CS + Math @ Northeastern. Building full-stack products and software that makes a meaningful impact.
      - generic [ref=e56]:
        - generic [ref=e57]: projects
        - generic [ref=e58]:
          - button "StyleBoard.jsx" [ref=e59] [cursor=pointer]:
            - img [ref=e61]
            - generic [ref=e64]: StyleBoard.jsx
          - button "toggo.ts" [ref=e65] [cursor=pointer]:
            - img [ref=e67]
            - generic [ref=e70]: toggo.ts
          - button "CoopScout.py" [ref=e71] [cursor=pointer]:
            - img [ref=e73]
            - generic [ref=e76]: CoopScout.py
          - button "therapy_db.sql" [ref=e77] [cursor=pointer]:
            - img [ref=e79]
            - generic [ref=e82]: therapy_db.sql
          - button "mills_research/" [ref=e83] [cursor=pointer]:
            - img [ref=e85]
            - generic [ref=e88]: mills_research/
          - link "resume_2026.pdf" [ref=e89] [cursor=pointer]:
            - /url: /resume_2026.pdf
            - img [ref=e90]:
              - generic [ref=e95]: PDF
            - generic [ref=e96]: resume_2026.pdf
      - generic [ref=e97]:
        - generic [ref=e98]: stack
        - generic [ref=e99]:
          - generic [ref=e100]:
            - img [ref=e103]
            - generic [ref=e105]: TypeScript
          - generic [ref=e106]:
            - img [ref=e109]
            - generic [ref=e111]: Python
          - generic [ref=e112]:
            - img [ref=e115]
            - generic [ref=e117]: React
          - generic [ref=e118]:
            - img [ref=e121]
            - generic [ref=e123]: Next.js
          - generic [ref=e124]:
            - img [ref=e127]
            - generic [ref=e129]: Node.js
          - generic [ref=e130]:
            - img [ref=e133]
            - generic [ref=e135]: SQL
          - generic [ref=e136]:
            - img [ref=e139]
            - generic [ref=e141]: Supabase
          - generic [ref=e142]:
            - img [ref=e145]
            - generic [ref=e147]: Git
          - generic [ref=e148]:
            - img [ref=e151]
            - generic [ref=e153]: MongoDB
          - generic [ref=e154]:
            - img [ref=e157]
            - generic [ref=e159]: Java
          - generic [ref=e160]:
            - img [ref=e163]
            - generic [ref=e165]: Go
      - generic [ref=e166]:
        - generic [ref=e167]: experience
        - generic [ref=e168]:
          - generic [ref=e169]:
            - img "Chewy" [ref=e171]
            - generic [ref=e172]: Chewy
          - generic [ref=e173]:
            - img "Generate" [ref=e175]
            - generic [ref=e176]: Generate
          - generic [ref=e177]:
            - img "Argonne" [ref=e179]
            - generic [ref=e180]: Argonne
          - generic [ref=e181]:
            - img "Girls Who Code" [ref=e183]
            - generic [ref=e184]: Girls Who Code
  - button "Open Next.js Dev Tools" [ref=e190] [cursor=pointer]:
    - img [ref=e191]
  - alert [ref=e194]
```

# Test source

```ts
  1  | import { expect, test } from "@playwright/test";
  2  | import AxeBuilder from "@axe-core/playwright";
  3  | 
  4  | test("opens and closes a project through browser history", async ({ page }) => {
  5  |   await page.goto("/");
  6  | 
  7  |   await page
  8  |     .getByRole("button", { name: "StyleBoard.jsx" })
  9  |     .click();
  10 | 
  11 |   await expect(page).toHaveURL(/\/projects\/styleboard$/);
  12 |   await expect(page.getByRole("dialog")).toBeVisible();
  13 | 
  14 |   await page.goBack();
  15 | 
  16 |   await expect(page).toHaveURL("/");
  17 |   await expect(page.getByRole("dialog")).toBeHidden();
  18 | 
  19 |   await page.goForward();
  20 | 
  21 |   await expect(page).toHaveURL(/\/projects\/styleboard$/);
  22 |   await expect(page.getByRole("dialog")).toBeVisible();
  23 | });
  24 | 
  25 | test("a direct project URL renders a full page", async ({ page }) => {
  26 |     await page.goto("/projects/styleboard");
  27 | 
  28 |     await expect(
  29 |         page.getByRole("heading", { name: "StyleBoard" }),
  30 |     ).toBeVisible();
  31 | 
  32 |     await expect(page.getByRole("dialog")).toHaveCount(0);
  33 | });
  34 | 
  35 | test("project dialog closes with Escape", async ({ page }) => {
  36 |     await page.goto("/");
  37 | 
  38 |     await page
  39 |         .getByRole("button", { name: "StyleBoard.jsx" })
  40 |         .click();
  41 | 
  42 |     await page.keyboard.press("Escape");
  43 | 
  44 |     await expect(page).toHaveURL("/");
  45 |     await expect(page.getByRole("dialog")).toBeHidden();
  46 | });
  47 | 
  48 | test("metadata routes are available", async ({ request }) => {
  49 |     const robots = await request.get("/robots.txt");
  50 |     expect(robots.ok()).toBeTruthy();
  51 |     expect(await robots.text()).toContain("User-Agent");
  52 | 
  53 |     const sitemap = await request.get("/sitemap.xml");
  54 |     expect(sitemap.ok()).toBeTruthy();
  55 |     expect(await sitemap.text()).toContain("/projects/styleboard");
  56 | });
  57 | 
  58 | test("homepage has no automated accessibility violations", async ({
  59 |     page,
  60 | }) => {
  61 |     await page.goto("/");
  62 | 
  63 |     const results = await new AxeBuilder({ page }).analyze();
  64 | 
> 65 |     expect(results.violations).toEqual([]);
     |                                ^ Error: expect(received).toEqual(expected) // deep equality
  66 | });
  67 | 
```