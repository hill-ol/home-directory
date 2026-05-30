# home-directory

Personal portfolio site for Olivia Hill. Built as a macOS desktop metaphor.

## Running locally

```bash
npm install
npm run dev
```

## Stack

Next.js 15 App Router · TypeScript · Tailwind v4 (CSS-first config in `globals.css`) · Framer Motion · Vercel

## Design system

| Token | Value |
|---|---|
| Background | `#F2EDE4` |
| Text primary | `#1C1917` |
| Text secondary | `#6B6560` |
| Text muted | `#A89E99` |
| Accent (front) | `#F0A8CF` |
| Accent (dark) | `#D47BAD` |
| Card background | `#FAF7F2` |

**Fonts:** Playfair Display (`var(--font-playfair)`) + DM Sans (`var(--font-dm-sans)`) + system-ui for filenames/monospace labels.

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

### Mobile vs desktop
The homepage renders two separate layouts gated by `className="hidden md:block"` / `className="block md:hidden"`. Both share the same `openProject` callback and `ProjectOverlay`. The breakpoint is `md` (768px).

## Key components

| Component | Purpose |
|---|---|
| `FolderIcon` | Desktop folder — hover darkens, click passes `DOMRect` to `openProject` |
| `MobileHome` | Mobile homepage — grid of folders, stack icons, org icons |
| `ProjectOverlay` | Full-screen overlay panel — animates from folder position using DOMRect offset |
| `ContextMenu` | Right-click menu on desktop canvas only — shows bio info + quick links |
| `MenuBar` | Top nav with live clock · `MobileNav` export for bottom mobile nav |
| `StackOrbit` | 11 scattered tech icons with brand color on hover |
| `PassportStamps` | 4 inline SVG landmark stamps for global scholar cities |

## Content

All project data lives in `src/content/projects/index.ts`. Each entry has:
```ts
{
  slug, filename, title, tagline, description,
  role, period, stack, github?, live?
}
```

To add a new project: add an entry to the array, add a `FolderIcon` in `page.tsx` and a `MobileFolder` in `MobileHome.tsx`.

## Writing conventions

- **No em dashes anywhere** — use colons or commas instead
- Filenames use real extensions that match the project type (`.jsx`, `.py`, `.ts`, `.sql`)
- All copy uses DM Sans at `fontWeight: 300`
- Playfair italic is used for active/hover states and display headings only
- Stack pills use `monospace` or system-ui at `fontSize: "10px"`

## Metadata

`metadataBase` is set to `https://home-directory.vercel.app` in `src/app/layout.tsx`. When the custom domain `oliviahill.dev` is connected, find and replace `home-directory.vercel.app` with `oliviahill.dev` in:
- `src/app/layout.tsx`
- `src/app/og/route.tsx`
- `src/app/robots.ts`
- `src/app/sitemap.ts`

## What not to change

- The `window.history.pushState` approach for overlay URL sync — do not replace with `router.push`
- The `overflow: "hidden"` / `transform: scale()` separation in `PosterImage` — they must be on separate elements or scale won't render
- Tailwind v4 uses CSS-first config — do not create a `tailwind.config.js`
- The `md` breakpoint gates mobile vs desktop layout on the homepage — do not change to `lg`