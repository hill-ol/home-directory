# home-directory

Personal portfolio site for Olivia Hill. Built as a macOS desktop metaphor.

## Running locally

```bash
npm install
npm run dev
```

## Stack

Next.js 16 App Router · TypeScript · Tailwind v4 (CSS-first config in `globals.css`) · Framer Motion · Vercel

## Design system

Tokens live in `src/lib/theme.ts`. Import from there rather than typing a hex
literal: `import { color, font, hairline, line } from "@/lib/theme"`.

| Token | Value | |
|---|---|---|
| `color.cream` | `#F2EDE4` | Background |
| `color.card` | `#FAF7F2` | Card background |
| `color.ink` | `#1C1917` | Text primary |
| `color.inkSecondary` | `#6B6560` | Text secondary |
| `color.inkMuted` | `#A89E99` | Text muted |
| `color.pink` | `#F0A8CF` | Accent (front), surfaces only |
| `color.pinkDark` | `#D47BAD` | Accent (dark), surfaces only |
| `color.pinkText` | `#7A2D5A` | The accent for **type** |
| `color.pinkLight` | `#F5BADB` | Folder body on hover |
| `color.pinkDeep` | `#C966A0` | Folder tab on hover |
| `color.surfaceSunken` | `#E8E4DC` | Recessed surface: photo placeholders, binder depth, scrollbar track |
| `color.rule` | `#D3CEC9` | Diagram rules, faint labels, resting stamp fill |

Borders are the ink color at low alpha, named by role: `line.divider` (0.06),
`line.tile` (0.08), `line.card` (0.10), `line.pill` (0.20), plus `line.wash`
(0.04) for the faint fill behind pills and passport stamps. Wrap the border
ones in `hairline()` for the standard `0.5px solid`.

`surface.*` is the cream at alpha, for anything floating over page content with
a backdrop blur: `panel` (0.92) for menus, chips, and buttons, `bar` (0.95) for
the nav bars, and `scrim` / `scrimClear` for the reach-out backdrop fade.

`onAccent.*` is white at alpha for content on the pink: `muted` (0.7) for
filenames and labels, `scrim` / `scrimHover` for the overlay close button.

### Pink is for surfaces, pinkText is for type
`color.pink` is 1.61:1 on cream, well under the 4.5:1 WCAG AA floor, so it can
never carry text. Use it for folder fills, headers, bars, and illustration
strokes. Every label, eyebrow, and link-hover colour uses `color.pinkText`
(`#7A2D5A`) instead: 7.66:1 on cream, 8.36:1 on the card, 8.93:1 on white.

That value is not new. It was already in the project as the poster label in
`PosterImage`, which is why it reads as part of the palette rather than a
bolted-on accessibility colour.

The mobile nav's active icon uses `pinkText` too. An icon that marks state is a
UI component under WCAG 1.4.11 and needs 3:1, which the brand pink also misses.

The readme neofetch terminal also runs on `pinkText`. It used to sit on
`pinkDark`, where even pure white text was 2.90:1, so every row failed. Its
white ramp now measures 7.57:1 for values, 4.87:1 for the titlebar label, and
4.76:1 for the row keys. The keys sit at `0.65` alpha, which is the dimmest
they can go and still clear 4.5:1 on that background: lowering it back toward
the old `0.5` reintroduces the failure.

### Keeping the palette honest
The site uses 25 distinct colors. Before adding another, check it is not a
near-duplicate of one already there: anything within CIELAB deltaE 3 of an
existing color is indistinguishable in practice and should reuse the token.

Three were folded in for exactly that reason. `#EDE8DF` and `#E8E3D8` sat
within deltaE 2.1 of `#E8E4DC` and became `surfaceSunken`; `#C8C4BF` sat within
3.7 of `#D3CEC9` and became `rule`.

Worth knowing about the binder: its two depth layers now share one color. The
stacked-paper effect never came from the color difference, which was
imperceptible, but from the 6px and 3px offsets, which are unchanged.

Hover pairs are the deliberate exception. `pink`/`pinkLight` (deltaE 7.7) and
`pinkDark`/`pinkDeep` (8.2) are meant to be small steps, and `cream`/`card`
(4.1) is the page-versus-elevated-surface distinction.

### What stays inline, and why
Three categories deliberately keep literal colors:

1. **Drop shadows.** `0 24px 80px rgba(28,25,23,0.22)` and friends are
   per-component depth, each used once. Their alphas only coincide with the
   border alphas by accident, so tokenizing them would imply a relationship
   that is not there.
2. **One-component palettes.** The passport stamp colors, the readme terminal's
   four-step white ramp, the macOS traffic lights, and the award badge colors.
   Each belongs to one component.
3. **Colors inside composite shorthands.** A value buried in a `box-shadow`,
   `drop-shadow`, or `repeating-linear-gradient` string cannot be swapped for a
   token without interpolating the whole shorthand. Where the value is genuinely
   a border role it is interpolated anyway, as in `SemesterPage`'s dashed footer
   rule, which `hairline()` could not express.

**Fonts:** `font.display` (Playfair Display) + `font.body` (DM Sans) +
`font.system` for filenames and monospace labels.

### Hover styles
Because everything is styled with inline `style` objects, there is no `:hover`
to lean on. `src/lib/hover.ts` supplies the handler pairs instead:

| Export | Use |
|---|---|
| `accentText` | Secondary text that takes the accent: nav items, back links |
| `accentPill` | Outlined pill links, where border and label both take the accent |
| `hoverSwap(on, off)` | Any other pair, including values computed per item |
| `hoverSwapChild(sel, on, off)` | Style a descendant instead of the element itself |
| `applyStyle(styles)` | A single setter, for sharing one style across several handlers |

Spread them onto the element: `<Link style={{...}} {...accentText}>`.

These mutate `element.style` directly rather than routing hover through React
state. That is deliberate. Hover then costs no re-render, and the easing comes
from the CSS `transition` already declared on the element. Do not replace them
with `motion` components or `useState` for the sake of tidiness: that trades a
free CSS transition for a render on every pointer move.

### Why the tokens are literal hex
Satori, which renders `src/app/og/route.tsx`, cannot resolve CSS custom
properties, and `FolderGlyph` feeds that route. A `var(--color-pink)` in
`theme.ts` would render as nothing in the OG image.

That means the brand colors are declared twice: once in `theme.ts` for
TypeScript, once in the `@theme` block in `globals.css` for `:focus-visible`
and `.skip-link`. Change both together.

## Architecture

### Homepage overlay system
The homepage (`src/app/page.tsx`) never unmounts. Clicking a folder:
1. Calls `openProject(slug, rect)` — captures the folder's `DOMRect`
2. Sets `activeProject` state
3. Calls `window.history.pushState` to update the URL to `/projects/${slug}`
4. `ProjectOverlay` mounts and animates from the folder's screen position

Closing reverses the animation and calls `window.history.pushState` back to `/`. A `popstate` listener handles the browser back button.

**Do not use `router.push` for opening/closing overlays** — it causes a full page navigation which unmounts the homepage and breaks the animation. Always use `window.history.pushState`.

### Project fallback pages
`src/app/projects/[slug]/page.tsx` exists as a fallback for direct URL access and SEO. It renders `ProjectContent` with a plain fade-in, no overlay animation. The back button uses `router.push("/")`.

### Shared project presentation
`ProjectOverlay` and `ProjectContent` show the same project at two densities:
the modal is compact, the page is roomy. The header, metadata row, and link
pills come from `src/components/project/`, and every difference between the two
lives in `variants.ts` behind a single `variant: "overlay" | "page"` prop.

Add a new shared style there rather than in either view, otherwise the two
drift. Tagline and description are exported as style objects instead of
components so each view can spread them onto its own element: the page animates
them in with `motion.p`, the overlay renders a plain `p`.

`ProjectHeader` takes the close button as `children` (only the overlay passes
one) and an optional `titleId` so the overlay can point `aria-labelledby` at the
project title.

### Shared SVG glyphs
The folder shape and the resume document icon live in
`src/components/glyphs/`. The folder is drawn at six sizes across the canvas
icons, the mobile grid, the loading and 404 screens, and the OG image, so the
path string exists in exactly one place.

`FolderGlyph` takes explicit `width` and `height` rather than deriving one from
the other, because the existing call sites round the 96:78 ratio differently
(360x292 and 120x98 in the OG image). It also takes `children`, which is how the
404 screen puts a question mark inside the folder.

**`FolderGlyph` must stay free of `"use client"` and of hooks.**
`src/app/og/route.tsx` runs on the edge runtime and renders through satori; a
client directive would break that route. For the same reason the fill transition
is applied only when the `hovered` prop is passed, so static folders emit no CSS
that satori has no use for.

### Focus handling on transient surfaces
`useRestoreFocus` moves focus into a surface when it opens and puts focus back
where it was on close. Three places use it: `ProjectOverlay` and `PosterImage`
through `useDialogA11y`, and `ContextMenu` directly.

`useDialogA11y` keeps what is specific to a modal dialog: the body scroll lock
and the Tab trap. It calls `useRestoreFocus` **last on purpose**, because React
runs cleanups in the order effects were declared and the scroll lock has to be
released before focus returns. Moving that call earlier can make restoring
focus scroll a still-locked body.

Focus is taken on the next animation frame, since these surfaces are mounted by
AnimatePresence and are not in the document when the effect first runs. A
consequence worth knowing while debugging: if `requestAnimationFrame` is
throttled, such as in a background tab, focus will not move.

`ContextMenu` does not lock scroll and does not trap Tab. It uses roving focus
instead: arrow keys, Home, and End move between rows, and Tab closes the menu
and lets focus continue past it, which is how a transient menu should behave.

### The coursework binder
`/coursework` renders the same binder twice, gated on `md` like the homepage.
The pieces live in `src/components/coursework/`, switched by `variant`:
`SemesterPage` is the ruled page, `CourseworkCover` is what shows before a
semester is picked, and `CourseworkEmblem` is the graph and sine wave mark.

**`LINE_HEIGHT` in `SemesterPage.tsx` governs the whole ruled grid.** Every
block on the page is a whole multiple of it, which is what keeps the text
sitting on the rules rather than floating between them. The desktop page also
pads its scroll container by `LINE_HEIGHT * 2`. Change it and the grid has to
be rechecked at both breakpoints.

The desktop cover groups the name with the majors so the cover's 24px gap falls
around the pair; mobile leaves all four blocks sharing one 16px gap. That is
why `CourseworkCover` varies its structure and not just its sizes.

### Mobile vs desktop
The homepage renders two separate layouts gated by `className="hidden md:block"` / `className="block md:hidden"`. Both share the same `openProject` callback and `ProjectOverlay`. The breakpoint is `md` (768px).

One `FolderIcon` serves both, switched by `variant`. Desktop draws it at 96x78
with an 11px label and takes a `position` for the absolute canvas; mobile draws
it at 64x52 with a 10px label, sits in grid flow, and adds `whileTap` since
there is no hover on touch.

`IconTile` is chrome only, and that is deliberate. The four places that use it
animate differently on purpose: the desktop stack scales the tile but not its
label, the desktop orgs scale the whole group, the mobile stack uses Framer so
it can carry tap feedback and a brand-colored glow, and the mobile org grid is
static. Forcing one mechanism on all four would break three of them, so the
scale stays with each parent.

## Key components

| Component | Purpose |
|---|---|
| `FolderIcon` | Folder for both layouts — hover darkens, click passes `DOMRect` to `openProject` |
| `IconTile` | The 44px rounded white square behind every tech and org icon |
| `HoverLabel` | Small caption that darkens when its parent is hovered |
| `Pill` | Outlined tag for stack entries and the research status badge |
| `MobileHome` | Mobile homepage — grid of folders, stack icons, org icons |
| `ProjectOverlay` | Full-screen overlay panel — animates from folder position using DOMRect offset |
| `ProjectContent` | Standalone `/projects/<slug>` body — same content, staggered fade-in |
| `project/*` | Header, metadata row, and link pills shared by the two above |
| `glyphs/*` | `FolderGlyph` and `PdfGlyph` — the two reused SVG shapes |
| `ContextMenu` | Right-click menu on desktop canvas only — shows bio info + quick links |
| `useRestoreFocus` | Focus a transient surface on open, put focus back on close |
| `MenuBar` | Top nav with live clock · `MobileNav` export for bottom mobile nav |
| `StackOrbit` | 11 scattered tech icons with brand color on hover |
| `PosterImage` | Research poster that opens a full-screen viewer, panning on desktop |
| `coursework/*` | Binder cover, emblem, and the ruled semester page for both layouts |
| `PassportStamps` | 4 inline SVG landmark stamps for global scholar cities |

## Content

All site data lives in `src/content/`. Components read from these files and never
declare their own copies: the desktop and mobile layouts render the same arrays.

| File | Holds | Read by |
|---|---|---|
| `projects/index.ts` | Project entries + desktop folder positions | `page.tsx`, `MobileHome`, `/work`, `/projects/[slug]`, `sitemap.ts` |
| `stack.ts` | 11 tech icons + desktop positions | `StackOrbit`, `MobileHome` |
| `orgs.ts` | 4 org logos + desktop positions | `OrgIcons`, `MobileHome` |
| `contact.ts` | Every outbound personal link | `ContextMenu`, `TakeWhatYouNeed`, `ResumeIcon`, `MobileHome`, `/readme` |
| `research.ts` | Poster entries, resolved against `projects` | `/research` |
| `coursework.ts` | 5 semesters, their courses, and their palette | `/coursework` |
| `bio.ts` | Identity facts and the composed intro sentences | `layout.tsx`, `/og`, homepage, `MenuBar`, `ContextMenu`, `/readme`, `/coursework` |

Each project entry:
```ts
{
  slug, filename, title, tagline, description,
  role, period, stack, github?, live?,
  home?: { top, left }
}
```

### Desktop position lives in the content file, not the page
The desktop canvas is hand-composed, so there is no sensible default placement.
The `home` field carries a project's coordinates and `desktopProjects` filters to
the entries that have one. Stack and org entries use a required `desktop` field
for the same reason. Keeping coordinates next to the data is what makes adding a
project a single edit.

### Adding a project
Add one entry to the `projects` array. Both layouts pick it up automatically: the
desktop canvas from `home`, the mobile grid from array order. Omit `home` to keep
a project off the desktop canvas while still listing it on `/work`, on the mobile
grid, and at `/projects/<slug>`.

### Array order matters
The `projects` array order drives `/work`, the mobile home grid, and
`sitemap.ts`. It is currently reverse chronological. Reordering changes all three.
Desktop canvas order is irrelevant since those folders are absolutely positioned.

### Bio copy is stored as atoms, not sentences
`bio.ts` holds the facts (`name`, `study`, `school`, `majors`, `gradClass`,
`coop`, `location`) and composes the intro three ways, because the same
sentence was written six times in four different phrasings:

| Export | Used by | Shape |
|---|---|---|
| `intro` | Homepage hero, desktop and mobile | `study. tagline` |
| `introInline` | OG image, where a middot keeps it on one line | `study · tagline` |
| `introWithClass` | openGraph and twitter descriptions | `study, gradClass. tagline` |
| `metaDescription` | Root search description | adds co-op and scholar cities |

Facts stay atoms so each surface keeps its own voice: the context menu says
`Co-op at ${bio.coop}`, the readme terminal says `on co-op @ ${bio.coop}`, and
the metadata says `Software engineer co-op at ${bio.coop}`. Changing employer
is one edit without flattening those into identical wording.

The per-route `layout.tsx` descriptions are deliberately left as prose. They
are bespoke SEO copy, and interpolating fragments into flowing sentences costs
readability without buying safety. Only the repeated name is tokenized there.

### Research entries resolve against projects
Two of the three research entries are also projects. Those name the project with
a `project: "<slug>"` field, and `research.ts` reads the title, tagline,
abstract, and stack off that entry. The third is pre-collegiate work with no
project page, so it carries its own prose inline.

Before this, two roughly 800 character abstracts were duplicated verbatim
between `/research` and `projects/index.ts`. Editing one silently left the
other stale, with no broken link to give it away.

A `project` slug that matches nothing throws at module load, which fails the
build rather than rendering a blank entry. Add poster-specific fields
(`poster`, `posterLabel`, `institution`, `meta`, `award`, `credit`, `link`) to
`research.ts`; add prose to `projects/index.ts`.

### Changing a link
Edit `contact.ts` only. Four components and the readme page read from it. The
record is keyed for components that need one specific link, and `contactLinks` is
the ordered array for components that render the whole set. Before this was
centralized, the same URL lived in three places and the context menu's LinkedIn
link had silently gone stale.

## Writing conventions

- **No em dashes anywhere** — use colons or commas instead
- Filenames use real extensions that match the project type (`.jsx`, `.py`, `.ts`, `.sql`)
- All copy uses DM Sans at `fontWeight: 300`
- Playfair italic is used for active/hover states and display headings only
- Stack pills come from the `Pill` component: `monospace` at `fontSize: "10px"`, `padding: "2px 10px"`. Do not hand-roll one

## Metadata

The canonical origin lives in `src/lib/site.ts` as `siteUrl`. Three files read
it: `layout.tsx` (author URL, `openGraph.url`, and `metadataBase`), `robots.ts`,
and `sitemap.ts`.

**Connecting the custom domain is one edit.** Change `siteUrl` to
`https://oliviahill.dev` and the metadata, sitemap, and robots.txt all follow.
No trailing slash: Next resolves relative metadata URLs such as `/og` against
`metadataBase`.

Page descriptions come from `src/content/bio.ts`. The per-route
`layout.tsx` files hold their own bespoke descriptions, which is deliberate.

## What not to change

- The `window.history.pushState` approach for overlay URL sync — do not replace with `router.push`
- The `overflow: "hidden"` / `transform: scale()` separation in `PosterImage` (`src/components/PosterImage.tsx`) — they must be on separate elements or scale won't render
- Tailwind v4 uses CSS-first config — do not create a `tailwind.config.js`
- The `md` breakpoint gates mobile vs desktop layout on the homepage — do not change to `lg`
- Content lives in `src/content/` and is read by both layouts — do not re-declare project, stack, org, contact, or bio data inside a component
- `ProjectOverlay` and `ProjectContent` share `src/components/project/` — do not restyle one view in isolation, change the variant instead
- `FolderGlyph` must not gain `"use client"` or any hook — the edge-runtime OG route imports it
- Tokens in `src/lib/theme.ts` must stay literal hex — satori cannot resolve `var()` in the OG image
- Do not type a brand hex literal in a component — import the token so the two never drift
- Do not hardcode the site origin — import `siteUrl` from `src/lib/site.ts`
- Hover handlers mutate `element.style` on purpose — do not convert them to state or `motion`
- `useDialogA11y` must call `useRestoreFocus` last — cleanup order releases the scroll lock before focus returns
- `ContextMenu` clamps itself with a measured `offsetHeight`, not a constant — do not reintroduce a guessed `MENU_HEIGHT`