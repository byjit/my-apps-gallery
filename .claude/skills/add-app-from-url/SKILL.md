---
name: add-app-from-url
description: Use whenever the user wants to add a new app, product, tool, or site to the apps gallery from a URL — e.g. "add this app", "register this tool", "add <url> to the gallery", "create a content entry for <url>", or pastes a link expecting it to show up in the grid. Captures a hero screenshot of the live site with agent-browser, drops it into public/, extracts page content, and writes a matching MDX entry under src/content/apps/.
---

# Add App From URL

Add a new entry to the apps gallery from a single URL: capture the hero screenshot and write the MDX file the content collection expects.

## When to use

The user gives you a URL (or already-open page) and wants it represented as a card in the gallery — phrasing varies ("register this", "add to gallery", "make a content entry", "create app for <url>"). Treat any of those as a trigger.

If the user hasn't given a URL, ask for one before doing anything else.

## What "done" looks like

Two artifacts exist and are consistent with each other:

1. `public/<slug>-hero.png` — a clean above-the-fold screenshot of the page.
2. `src/content/apps/<slug>.mdx` — frontmatter pointing at that screenshot, with title, description, tags, link, date, and a short body.

The slug is a kebab-case identifier derived from the product/site name (not the full domain). E.g. `redclose.vercel.app` → `redclose`, `getlinear.app` → `linear`.

## Workflow

### 1. Capture the screenshot

Use agent-browser. Set a generous viewport *before* navigating so the hero isn't cropped top/bottom — agent-browser's default viewport is small (~800px tall) and clips real-world hero sections that assume a 1440×900-ish window. Wait for network idle so hero images and fonts settle before the snapshot.

```bash
agent-browser set viewport 1920 980 \
  && agent-browser open <URL> \
  && agent-browser wait --load networkidle \
  && agent-browser screenshot /Users/.../apps-gallery/public/<slug>-hero.png
```

`1920x980` is the right default — full HD width with a typical browser-chrome-adjusted height, so hero sections render at their intended layout and "above the fold" content (logo, headline, subhead, CTA) fits without cropping.

Use the absolute path for the screenshot — the project root is `/Users/prasanjitdutta/Desktop/projects2/apps-gallery` (adjust if the working dir differs). Confirm the file exists and is non-trivial in size before continuing; a tiny file usually means the page didn't render.

If the page is gated (login wall, cookie banner covering the hero), tell the user before forcing through. Don't dismiss banners blindly — sometimes the banner *is* the hero.

### 2. Extract the content

Pull the page's own copy rather than inventing marketing prose. Good sources, in order of preference:

1. `agent-browser get text body` (or scoped to the hero/`main` selector) for the visible headline + subhead.
2. `agent-browser eval "document.querySelector('meta[name=description]')?.content"` for the meta description.
3. The page `<title>` via `agent-browser get title`.

From these, derive:

- **title** — the product name (not the page title verbatim if it's stuffed with SEO suffixes like " | Best Tool 2026"). Strip the suffix.
- **description** — one or two sentences that read naturally on a card. Combine the headline and subhead if needed. Keep it under ~200 chars so the card doesn't blow out.
- **tags** — exactly one tag, formatted as `"For {target audience}"` (e.g. `"For Developers"`, `"For Small Businesses"`, `"For Marketers"`). Infer the audience from the page copy; if it's ambiguous, ask the user rather than guessing. Never include more than one tag, and never use category labels like "CRM" or "Lead Generation" — the audience is the only axis the gallery filters on.

If the page is JS-heavy and the text isn't there yet, snapshot the accessibility tree (`agent-browser snapshot -c`) — it's often more useful than raw HTML.

### 3. Write the MDX file

The content collection schema (see `content-collections.ts`) requires this frontmatter shape exactly:

```yaml
---
title: "<Product name>"
description: "<one-to-two sentence summary>"
tags:
  - "<Category>"
image: "/<slug>-hero.png"
link: "<canonical URL>"
date: "<today, YYYY-MM-DD>"
screenshots:
  - "/<slug>-hero.png"
links:
  - label: "Live site"
    url: "<canonical URL>"
---
```

Field rules that matter:

- `link` and every `links[].url` must be valid absolute URLs (Zod enforces `.url()`); the build will fail otherwise.
- `image` and `screenshots[]` are public paths starting with `/` — they map to `public/`. Don't write `/public/...`.
- `date` must parse as a date (`z.coerce.date()`); use today's date in `YYYY-MM-DD` form.
- `tags` is an array of strings, even if there's only one tag — don't collapse it to a scalar.

Body content goes after the frontmatter and renders on the detail page (`src/routes/_public/apps.$slug.tsx`). Keep it short — a heading, a sentence or two, and the key value prop. The user can flesh it out later. Don't pad with lorem-ipsum or invented features.

### 4. Verify

After writing, sanity-check:

- The MDX file is at `src/content/apps/<slug>.mdx`.
- The screenshot is at `public/<slug>-hero.png`.
- The `image` and `screenshots` paths in the frontmatter match the actual filename.
- The slug isn't already taken (look in `src/content/apps/`); if it is, suffix with a disambiguator like `-app` rather than overwriting.

Then tell the user the slug — they'll want it to navigate to `/apps/<slug>` in dev to verify.

## Notes

- Don't run `pnpm dev` or the build unless the user asks. The content collection regenerates on the next dev run on its own.
- Don't edit `AppGrid`, `AppCard`, or routing files just to add an entry — the collection is data-driven and discovers new MDX automatically.
- If the user supplies their own screenshot or description alongside the URL, prefer their input over what you'd extract.
