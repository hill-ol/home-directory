# home-directory

My personal portfolio site!

Built as a macOS desktop metaphor: project folders, scattered app icons, a pinned Polaroid, and a pink binder full of coursework. The concept is that my personal site is my desktop; everything on it is something I made or experienced!

**Live:** [home-directory.vercel.app/](https://home-directory.vercel.app/) &nbsp;·&nbsp; **Built with:** Next.js 15 · TypeScript · Tailwind v4 · Framer Motion

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
| `/` | Desktop canvas — project folders, stack orbit, org icons, Polaroid |
| `/work` | Project index |
| `/projects/[slug]` | Individual project case studies |
| `/readme` | About page with neofetch terminal, currently section, passport stamps |
| `/research` | Undergraduate research — Mills Institute + Northeastern |
| `/coursework` | Academic record in an accordion binder |

## Running locally

```bash
npm install
npm run dev
```

Open [localhost:3000](http://localhost:3000).

## Structure

```
src/
  app/                  # Next.js App Router pages
    projects/[slug]/    # Dynamic project pages
    work/               # Project index
    readme/             # About page
    research/           # Research page
    coursework/         # Coursework binder
  components/           # Reusable UI components
  content/
    projects/           # Project data (index.ts)
public/
  orgs/                 # Organization logos
  research/             # Research poster images
  contact/              # Contact icon images
```

## Design decisions

**Why a desktop metaphor?** I wanted my portfolio to have personality and allow me to experiment with design. The desktop gives every element a reason to exist on screen: folders are navigational, icons are informational, the Polaroid is personal. The metaphor also happens to be native language for any engineer who opens it.

**Why Playfair + DM Sans?** Playfair's high-contrast thick-thin strokes give the site editorial presence without being heavy. DM Sans keeps the body copy friendly and readable. The Playfair italic on nav hover is the signature interaction.

**Why all pink folders?** One cohesive color for all five project folders reads as a system rather than arbitrary decoration. The specific pink is a deliberate choice. It is warm, confident, and my favorite color.

---

Made with Next.js and a lot of clicking on Pinterest.