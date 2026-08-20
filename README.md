# DOM Trust Foundation Website

Marketing and content website for the **DOM Trust Foundation** — _"Transforming Lives, One Community at a Time."_

Built with **React + TypeScript + Vite + Tailwind CSS**, with all content managed in **Contentful**.

## Features

- Fully responsive, brand-themed UI (colors and fonts derived from the DOM Trust logo and brochure).
- Content-driven pages powered entirely by Contentful (Content Delivery API). **All** content lives in Contentful — there is no bundled/fallback content.
- Pages: Home, Who We Are, Our Work (with a detail page per strategic pillar), Impact Stories (with detail pages), Get Involved (with Events), Resources, and Contact.

## Getting started

```bash
npm install
npm run dev
```

The app runs at http://localhost:5173 (or the next free port).

## Contentful configuration

Content is served from Contentful when credentials are present. Copy `.env.example` to `.env` and fill in your token:

```bash
cp .env.example .env
```

| Variable                          | Description                                                        |
| --------------------------------- | ------------------------------------------------------------------ |
| `VITE_CONTENTFUL_SPACE_ID`        | Contentful space ID (already set to the DOM Trust space).           |
| `VITE_CONTENTFUL_ENVIRONMENT`     | Environment name, defaults to `master`.                            |
| `VITE_CONTENTFUL_ACCESS_TOKEN`    | Content Delivery API access token (read-only).                      |

Create the token in Contentful: **Settings → API keys → Add API key**, then copy the **Content Delivery API - access token**.

> The delivery token is **required**. All content is served from Contentful; if the token is missing or invalid the site shows an error screen instead of content.

## Content model

The following content types are defined and published in Contentful:

- `siteSettings` — global settings (logo, contact details, social links, donate URL).
- `homePage` — hero, intro, and references to featured pillars, story, and partners.
- `aboutPage` — about/vision/mission/history plus references to values and team members.
- `strategicPillar` — the six pillars, each with an overview and structured work sections.
- `impactStory` — stories, optionally linked to a pillar.
- `coreValue`, `teamMember`, `partner`, `getInvolvedOption`, `resource`, `event`.

References are used throughout (e.g. the home page references pillars/story/partners; stories reference their pillar).

## Project structure

```
src/
  components/
    layout/     Navbar, Footer, Layout
    ui/         Reusable UI (PageHero, PillarCard, StoryCard, SectionHeading, Icons, Loader)
  hooks/        useAsync data-fetching hook
  lib/          Contentful client, SiteContext, fallback content
  pages/        Route pages
  types/        Contentful content type interfaces
```

## Scripts

- `npm run dev` — start the dev server.
- `npm run build` — type-check and build for production.
- `npm run preview` — preview the production build.
# dom-foundation
