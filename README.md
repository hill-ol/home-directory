# home-directory

My personal portfolio site!

Built as a macOS desktop metaphor: project folders, scattered app icons, a pinned Polaroid, and a pink binder full of coursework. The concept is that my personal site is my desktop — everything on it is something I made or experienced.

**Live:** [home-directory.vercel.app](https://home-directory.vercel.app) &nbsp;·&nbsp; **Built with:** Next.js 15 · TypeScript · Tailwind v4 · Framer Motion

---

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 (CSS-first config) |
| Animation | Framer Motion |
| Fonts | Playfair Display · DM Sans (via `next/font`) |
| Icons | simple-icons |
| Deployment | Vercel |

## Pages

| Route | Description |
|---|---|
| `/` | Desktop canvas — project folders, stack orbit, org icons, Polaroid, right-click context menu |
| `/work` | Project index with scroll animations |
| `/projects/[slug]` | Individual project pages (also accessible via overlay on homepage) |
| `/readme` | About page with neofetch terminal, typewriter effect, blinking cursor, passport stamps |
| `/research` | Undergraduate research — Mills Institute, Northeastern Oakland, Argonne National Laboratory |
| `/coursework` | Academic record in an accordion binder with lined paper |

## Features

- **Folder overlay** — clicking a project folder opens an animated overlay from the folder's position. URL updates via `window.history.pushState` so links are shareable. Browser back button closes the overlay.
- **Right-click context menu** — macOS-style context menu on the desktop with quick links and system info.
- **Research poster zoom** — hover to reveal a zoom prompt, click to open a pannable lightbox. Mouse position controls the pan on desktop; mobile shows the full poster fitted to screen.
- **Neofetch terminal** — last line types out with a typewriter effect on load.
- **Live menu bar clock** — ticking clock in the top-right of the menu bar.
- **Custom 404** — themed not-found page with a question mark folder.
- **OG image** — dynamic Open Graph image at `/og` via `ImageResponse`.
- **Sitemap + robots** — auto-generated at `/sitemap.xml` and `/robots.txt`.

## Running locally

```bash
npm install
npm run dev
```

Open [localhost:3000](http://localhost:3000).

## Structure

```
src/
  app/                    # Next.js App Router pages
    og/                   # Dynamic OG image route
    projects/[slug]/      # Project fallback pages (direct URL access)
    work/                 # Project index
    readme/               # About page
    research/             # Research page
    coursework/           # Coursework binder
    not-found.tsx         # Custom 404
    loading.tsx           # Loading state
    robots.ts             # robots.txt generation
    sitemap.ts            # sitemap.xml generation
  components/
    FolderIcon.tsx        # Desktop project folder with hover state
    MobileHome.tsx        # Mobile homepage layout
    MobileFolder.tsx      # Mobile folder with tap animation
    ProjectOverlay.tsx    # Animated overlay panel
    MenuBar.tsx           # Top nav + mobile bottom nav + live clock
    StackOrbit.tsx        # Tech stack icon scatter
    OrgIcons.tsx          # Organization logo icons
    Polaroid.tsx          # Pinned photo component
    PassportStamps.tsx    # Global Scholar passport stamps
    ResumeIcon.tsx        # Resume file icon
    TakeWhatYouNeed.tsx   # Fixed footer pill
    ContextMenu.tsx       # Right-click context menu
  content/
    projects/             # Project data (index.ts)
public/
  orgs/                   # Organization logos
  research/               # Research poster images
  readme/                 # Headshot
```

## Design decisions

**Why a desktop metaphor?** I wanted my portfolio to have personality and allow me to experiment with design. The desktop gives every element a reason to exist on screen: folders are navigational, icons are informational, the Polaroid is personal. The metaphor also happens to be native language for any engineer who opens it.

**Why Playfair + DM Sans?** Playfair's high-contrast thick-thin strokes give the site editorial presence without being heavy. DM Sans keeps the body copy friendly and readable. The Playfair italic on nav hover is the signature interaction.

**Why all pink folders?** One cohesive color for all five project folders reads as a system rather than arbitrary decoration. The specific pink is deliberate. It is warm, confident, and my favorite color.

---

Made with Next.js and a lot of clicking on Pinterest.