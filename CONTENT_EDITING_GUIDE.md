# Updating the DOM Trust Foundation Website with Contentful

This guide explains, step by step, how to change the text, images, and other
content on the DOM Trust Foundation website. **Every word and image on the site
comes from Contentful**, so you never need to touch code to update the site.

It's written for non-technical editors. If you can fill in a form, you can
update the website.

---

## Table of contents

1. [How the website and Contentful fit together](#1-how-the-website-and-contentful-fit-together)
2. [Logging in](#2-logging-in)
3. [The 6 things you must know before editing](#3-the-6-things-you-must-know-before-editing)
4. [Global content (logo, contact details, social links, donate button)](#4-global-content-site-settings)
5. [Home page](#5-home-page)
6. [About page](#6-about-page)
7. [Our Work page & pillar detail pages](#7-our-work-page--pillar-detail-pages)
8. [Impact Stories page & story detail pages](#8-impact-stories-page--story-detail-pages)
9. [Donate page](#9-donate-page)
10. [Volunteer page](#10-volunteer-page)
11. [Get Involved page (options + events)](#11-get-involved-page)
12. [Resources page](#12-resources-page)
13. [Contact page](#13-contact-page)
14. [Header (navigation) & Footer](#14-header--footer)
15. [Page copy entries (the `page-…` slugs)](#15-page-copy-entries-the-page--slugs)
16. [Common how-to recipes](#16-common-how-to-recipes)
17. [Formatting rules (paragraphs, images, links)](#17-formatting-rules)
18. [Troubleshooting](#18-troubleshooting)

---

## 1. How the website and Contentful fit together

- The website is the public site your visitors see.
- **Contentful** is the "control panel" where all content lives.
- Content in Contentful is organised into **entries**. Each entry is one item —
  for example one *Impact Story*, one *Team Member*, or one *Strategic Pillar*.
- Each entry belongs to a **content type** (a template that defines which fields
  it has). The website has these content types:

  | Content type          | What it controls on the site                                  |
  | --------------------- | ------------------------------------------------------------- |
  | **Site Settings**     | Logo, tagline, email, phone, address, social links, donate URL |
  | **Home Page**         | The homepage hero, intro line, and what it features            |
  | **About Page**        | About / vision / mission / history, plus linked values & team  |
  | **Core Value**        | Value cards on About, and the holistic-approach cards          |
  | **Team Member**       | The team cards on About                                        |
  | **Strategic Pillar**  | The six pillars (Our Work page + each pillar detail page)      |
  | **Impact Story**      | Real stories on Impact — **and** page headlines (see [section 15](#15-page-copy-entries-the-page--slugs)) |
  | **Get Involved Option** | Ways to help cards, plus Donate / Volunteer button labels    |
  | **Event**             | The events listed on Get Involved                              |
  | **Resource**          | The downloads on the Resources page                            |
  | **Partner**           | The partner logos/names on the homepage                        |

Public routes the site serves:

| URL | Page |
| --- | ---- |
| `/` | Home |
| `/about` (also `/who-we-are`) | About |
| `/our-work` (also `/work`) | Our Work |
| `/our-work/:slug` (also `/work/:slug`) | Pillar detail |
| `/impact` and `/impact/:slug` | Impact listing and story |
| `/donate` (also `/support` → donate) | Donate |
| `/volunteer` | Volunteer |
| `/get-involved` | Get Involved |
| `/resources` | Resources |
| `/contact` | Contact |

> **Important:** When you change and **publish** an entry, the change appears on
> the live site automatically (usually within a minute — refresh the page).

---

## 2. Logging in

1. Go to <https://app.contentful.com>.
2. Sign in with the email address that was invited to the DOM Trust Foundation
   space. (If you don't have access, ask the site administrator to invite you
   via **Settings → Users**.)
3. After logging in, make sure the space selector at the top-left says
   **DOM Trust Foundation** (space ID `rcgd7nniu4er`).
4. Click **Content** in the top menu. This is where all editing happens.

---

## 3. The 6 things you must know before editing

1. **Find an entry:** Click **Content** → use the **Content Type** filter on the
   left (or the search box) to find the entry you want, then click it to open.
2. **Edit a field:** Click into a field and type. Changes are saved
   automatically as a *draft*.
3. **PUBLISH is what makes it go live.** After editing, click the green
   **Publish** button (top-right). Until you do, the change is only a draft and
   visitors won't see it. This is the #1 thing editors forget.
4. **Draft vs. Changed vs. Published:** Each entry shows a status.
   - *Draft* = never published, not visible on the site.
   - *Published* = live.
   - *Changed* = published before, but has unpublished edits → click **Publish**
     again.
5. **References link entries together.** Some fields hold *other entries* (for
   example, the Home Page "Featured Pillars" field points to Strategic Pillar
   entries). To show something, you often (a) create/edit the item entry AND
   (b) make sure it's referenced and **published**.
6. **Order fields control sorting.** Many lists (pillars, values, team,
   resources…) have a number field called **Order**. Lower numbers appear first
   (1, 2, 3…). Change the number to reorder.

---

## 4. Global content (Site Settings)

**Content type:** `Site Settings` — there is **one** entry. It powers the logo,
contact info, social links, and the payment link used by Donate buttons.

**Steps**

1. **Content** → filter by **Site Settings** → open the single entry.
2. Edit any of these fields, then **Publish**:

| Field           | Where it appears                                          |
| --------------- | --------------------------------------------------------- |
| **Site Name**   | Footer copyright, page titles, homepage badge             |
| **Tagline**     | Footer, under the logo; homepage image badge              |
| **Logo**        | Header, footer, homepage badge (upload a square image)    |
| **Email**       | Contact page, footer, and the contact/volunteer forms' destination  |
| **Phone**       | Contact page, footer                                      |
| **Website**     | Contact page, footer bottom bar                           |
| **Address**     | Contact page, footer                                      |
| **Facebook URL** | Facebook icon in footer & contact page (leave blank to hide) |
| **Instagram URL** | Instagram icon (leave blank to hide)                     |
| **TikTok URL**  | TikTok icon (leave blank to hide)                         |
| **Donate URL**  | Where Donate buttons send people to pay (e.g. GoFundMe)   |

The header **Donate** button *label* comes from the **Get Involved Option** whose
type is Donate (see [section 9](#9-donate-page)), not from Site Settings.

The footer line “We respect your privacy.” comes from the Impact Story whose
slug is `page-privacy` (Title field). See [section 15](#15-page-copy-entries-the-page--slugs).

> **Tip:** Social icons only show if the matching URL is filled in. Leave a URL
> blank to hide that icon.

---

## 5. Home page

**Content type:** `Home Page` — there is **one** entry. It controls the homepage
hero, intro, featured pillars, featured story, and partners.

**Steps:** **Content** → filter **Home Page** → open the single entry → edit →
**Publish**.

### Section A — Hero (top banner)

| Field            | What it does                                              |
| ---------------- | --------------------------------------------------------- |
| **Hero Title**   | The big headline                                          |
| **Hero Subtitle** | The sentence under the headline                          |
| **Hero Image**   | The background/side image (upload or pick an asset)       |

Hero button labels come from other entries (all in [section 15](#15-page-copy-entries-the-page--slugs) unless noted):

| Button | Edit this |
| ------ | --------- |
| Discover Our Work | Impact Story `page-our-work` → **Author / Source** |
| Donate | Get Involved Option (Donate) → **CTA Label** |
| Volunteer | Get Involved Option (Volunteer) → **CTA Label** |

### Section B — Intro blurb

| Field           | What it does                                    |
| --------------- | ----------------------------------------------- |
| **Intro Blurb** | The large highlighted sentence below the hero.  |

| Button | Edit this |
| ------ | --------- |
| Our Story | Impact Story `page-home-story` → **Title** |
| See Impact | Impact Story `page-home-impact` → **Title** |

The four statistics next to the intro are the Impact Story `page-home-stats`.
Put one stat per line in **Body**, as `value|label`:

```
10+|Years of service
6|Strategic pillars
2|Countries: Kenya & Ghana
1000s|Lives touched
```

### Section C — Strategic Pillars

| Field             | What it does                                                 |
| ----------------- | ------------------------------------------------------------ |
| **Pillars**       | A list of references to **Strategic Pillar** entries to feature as cards. |

Heading copy: Impact Story `page-home-pillars`

| Story field | On the homepage |
| ----------- | --------------- |
| **Location** | Small eyebrow (“Our Core Pillars”) |
| **Title** | Section heading |
| **Summary** | Paragraph under the heading |

To change which pillars appear: click **Add existing content** and choose the
Strategic Pillar entries. To edit a pillar's title/summary/icon, open that
Strategic Pillar entry (see [section 7](#7-our-work-page--pillar-detail-pages)).

### Section D — Featured Impact Story

| Field             | What it does                                                     |
| ----------------- | ---------------------------------------------------------------- |
| **Featured Story** | A reference to one **Impact Story** entry shown in the green band. |

The website shows that story's **title, quote, author, and image**. Edit those
on the Impact Story entry itself. The “Read the story” button is Impact Story
`page-home-featured` → **Title**.

Do **not** feature a story whose slug starts with `page-` — those are page
headlines, not public stories.

### Section E — Partners

| Field         | What it does                                             |
| ------------- | -------------------------------------------------------- |
| **Partners**  | A list of references to **Partner** entries (logo + name). |

Heading copy: Impact Story `page-home-partners` (**Title** + **Summary**).

### Section F — Bottom call-to-action band

Impact Story `page-home-cta`: **Title** and **Summary**. The two buttons reuse
the Donate and Volunteer **CTA Labels**.

---

## 6. About page

The About page is at `/about` (`/who-we-are` is the same page). It is built from
the **About Page** entry, **Core Values**, **Team Members**, and several
`page-about-…` Impact Stories.

### 6a. Page text — `About Page` (one entry)

**Content** → filter **About Page** → open → edit → **Publish**.

| Field         | Where it appears on the page                               |
| ------------- | ---------------------------------------------------------- |
| **Hero Image** | Banner image at the top                                    |
| **About**     | The main body text                                         |
| **History**   | The history card (leave blank to hide the card)            |
| **Vision**    | The green vision box                                       |
| **Mission**   | The mission box                                            |
| **Values**    | Linked Core Value entries (see order bands below)          |
| **Team**      | Linked Team Member entries                                 |

> **About** and **History** support multiple paragraphs — separate paragraphs
> with a **blank line** (press Enter twice). See [section 17](#17-formatting-rules).

Hero headline and About section labels:

| Story slug | Fields → what they control |
| ---------- | -------------------------- |
| `page-about` | **Location** = eyebrow, **Title** = hero headline, **Summary** = hero subtitle, **Author / Source** = “About …” section heading |
| `page-about-labels` | **Body**, three paragraphs: History heading, Vision heading, Mission heading |
| `page-about-holistic` | **Location** / **Title** / **Summary** = holistic section |
| `page-about-values` | **Location** / **Title** = core-values section |
| `page-about-team` | **Location** / **Title** / **Summary** = team section |
| `page-about-join` | **Title** / **Summary** = green join band at the bottom |

### 6b. Value cards and holistic cards — `Core Value`

**Order** decides where a value appears:

| Order | Used as |
| ----- | ------- |
| **1–9** | “Our Core Values” cards |
| **10–19** | Holistic-approach cards (Safety, Finance, Skills, Policy, …) |
| Other numbers | Hidden from those two grids |

Each card:

| Field         | What it does                                                        |
| ------------- | ------------------------------------------------------------------- |
| **Title**     | The card name                                                       |
| **Description** | Short text under the title                                        |
| **Icon**      | Values: `collaborate`, `empathy`, `integrity`, `diversity`, `impact`. Holistic cards may also use pillar icons: `education`, `business`, `medical`, and so on. Anything else shows a star. |
| **Order**     | Position (and which band — see the table above)                     |

To **add** a value: **Add entry → Core Value**, fill fields, set Order, **Publish**,
then add it to **About Page → Values** and **Publish** the About Page too.

### 6c. Team cards — `Team Member`

| Field       | What it does                                        |
| ----------- | --------------------------------------------------- |
| **Name**    | Person's name                                       |
| **Role**    | Job title (optional)                                |
| **Bio**     | Short bio (optional)                                |
| **Photo**   | Portrait image (optional — shows an icon if blank)  |
| **Order**   | Position among team cards                            |

To **add** a team member: **Add entry → Team Member**, fill fields, **Publish**,
then add it to **About Page → Team**.

The Donate / Volunteer buttons on the About join band use the same **CTA Labels**
as the homepage (Get Involved Options).

---

## 7. Our Work page & pillar detail pages

**Content type:** `Strategic Pillar` — one entry per pillar (there are six).
These power the **Our Work** grid, each pillar's own detail page, the homepage
pillar cards, and the footer "Our Work" links.

`/work` and `/work/:slug` show the same pages as `/our-work`.

The Our Work listing hero is Impact Story `page-our-work`:

| Story field | On Our Work |
| ----------- | ----------- |
| **Location** | Eyebrow |
| **Title** | Page headline |
| **Summary** | Subtitle |
| **Author / Source** | Also used as the homepage “Discover Our Work” button |

Pillar-detail labels (Overview, “Support this work”, etc.) are Impact Story
`page-pillar-detail`. See [section 15](#15-page-copy-entries-the-page--slugs).

**Steps:** **Content** → filter **Strategic Pillar** → open the pillar → edit →
**Publish**.

| Field           | Where it appears                                                        |
| --------------- | ----------------------------------------------------------------------- |
| **Title**       | Card title, detail page title, footer link                              |
| **Slug**        | The web address, e.g. slug `education` → `/our-work/education`. Use lowercase words separated by hyphens. **Changing this changes the page's URL.** |
| **Order**       | Position in the Our Work grid (lower = earlier)                         |
| **Icon**        | Choose one keyword: `rehabilitation`, `education`, `medical`, `business`, `arts`, or `climate`. Anything else shows a star. |
| **Accent Color** | Hex colour (e.g. `#2E9E46`) for the icon badge on the detail page      |
| **Summary**     | Short description on the card and under the detail-page title           |
| **Overview**    | The "Overview" body text on the detail page (supports multiple paragraphs) |
| **Hero Image**  | Banner image on the detail page                                         |
| **Work Sections** | The "Our Work" blocks on the detail page (see below)                   |

### Editing the "Work Sections" (the detail page's structured blocks)

**Work Sections** is a repeatable/JSON-style field. Each section becomes a card
on the pillar's detail page and has:

- **title** — the section heading
- **description** — a paragraph (optional)
- **items** — a bulleted list of points (optional), each item shown with a check mark

If the field is edited as JSON, the shape looks like this:

```json
[
  {
    "title": "Vocational Training",
    "description": "Hands-on skills for sustainable livelihoods.",
    "items": ["Tailoring", "Carpentry", "Digital skills"]
  },
  {
    "title": "Mentorship",
    "description": "Pairing youth with experienced mentors.",
    "items": []
  }
]
```

> If a section has no `description`, leave it out or empty. If it has no `items`,
> use an empty list `[]`. Always **Publish** after editing.

### To add a brand-new pillar

1. **Add entry → Strategic Pillar**.
2. Fill **Title, Slug, Order, Icon, Summary, Overview**, and add **Work Sections**.
3. **Publish**.
4. To show it on the homepage grid too, open **Home Page** and add it to the
   **Pillars** field, then **Publish** the Home Page. (It appears on the Our Work
   page and footer automatically.)

---

## 8. Impact Stories page & story detail pages

**Content type:** `Impact Story` — one entry per story. Powers the **Impact**
grid and each story's detail page. May also be featured on the homepage.

The listing hero is Impact Story `page-impact` (**Location**, **Title**, **Summary**).
Story-detail buttons are Impact Story `page-story-detail`.

**Steps:** **Content** → filter **Impact Story** → open → edit → **Publish**.

| Field         | Where it appears                                                       |
| ------------- | ---------------------------------------------------------------------- |
| **Title**     | Card title and detail-page headline                                    |
| **Slug**      | The URL, e.g. `/impact/mary-story`. Lowercase, hyphenated.             |
| **Image**     | Card image and the detail-page banner                                  |
| **Location**  | Shown with a pin icon on the detail page (optional)                    |
| **Summary**   | Card preview text and the bold intro line on the detail page           |
| **Body**      | The full story text (supports multiple paragraphs — blank line between them) |
| **Quote**     | A pull-quote block on the detail page (optional)                       |
| **Author**    | Attribution under the quote (optional)                                 |
| **Featured**  | A yes/no toggle — used to mark stories as featured                     |
| **Pillar**    | A reference to the related **Strategic Pillar** (shows a tag linking to it) |

> **Do not give a public story a slug that starts with `page-`.** Those slugs are
> reserved for page headlines. Stories with `page-` slugs are **hidden** from the
> Impact grid on purpose.

### To add a new story

1. **Add entry → Impact Story**, fill fields (at minimum Title + Slug), **Publish**.
2. It automatically appears on the Impact page (unless the slug starts with `page-`).

### To feature a story on the homepage

Open **Home Page → Featured Story**, point it at the Impact Story you want, then
**Publish** the Home Page.

---

## 9. Donate page

URL: `/donate` (`/support` redirects here).

Built from:

1. **Get Involved Option** with Option Type **Donate** — card text, button label,
   and the payment URL (or Site Settings **Donate URL** if the option URL is empty).
2. Impact Story `page-donate` — page headline and side panel.

| Story field | On Donate |
| ----------- | --------- |
| **Location** | Eyebrow (“Support Our Cause”) |
| **Title** | Hero headline |
| **Summary** | Hero subtitle |
| **Body** | Main paragraphs (blank line between paragraphs) |
| **Author / Source** | Heading above the body |
| **Quote** | First paragraph = panel title, second = panel body, further paragraphs = panel bullets |

The gold Donate button uses the Donate option **CTA Label**. The secondary
Volunteer button uses the Volunteer option **CTA Label**.

---

## 10. Volunteer page

URL: `/volunteer`.

Built from:

1. **Get Involved Option** with Option Type **Volunteer** — description and
   submit-button label. Set **CTA URL** to `/volunteer`.
2. Impact Story `page-volunteer`.

| Story field | On Volunteer |
| ----------- | ------------ |
| **Location** | Eyebrow |
| **Title** | Hero headline |
| **Summary** | Hero subtitle |
| **Body** | Main paragraphs |
| **Author / Source** | Form heading |
| **Quote** | First paragraph = success heading, second = success message, third = “back to form” button |

The form emails **Site Settings → Email**. Keep that address correct.

---

## 11. Get Involved page

This page uses **two** content types plus two page-copy stories.

Listing hero: Impact Story `page-get-involved` (**Location**, **Title**, **Summary**).
Events heading: Impact Story `page-get-involved-events` (**Location**, **Title**).

### 11a. The "ways to help" cards — `Get Involved Option`

| Field           | What it does                                                     |
| --------------- | ---------------------------------------------------------------- |
| **Title**       | Card heading                                                     |
| **Description** | Card text                                                        |
| **Icon**        | Choose one keyword: `donate`, `volunteer`, `partner`, or `events`. Anything else shows a heart. |
| **CTA Label**   | The button text (leave blank to hide the button). Donate/Volunteer labels are reused across the site. |
| **CTA URL**     | Where the button goes. Donate and Volunteer types always open `/donate` and `/volunteer`. A full `https://…` link opens in a new tab; a path like `/contact` navigates within the site. |
| **Option Type** | `Donate`, `Volunteer`, `Partner`, or `Events`                    |
| **Order**       | Card position                                                    |

To **add** an option: **Add entry → Get Involved Option**, fill fields, **Publish**.

### 11b. The events list — `Event`

Shown in the events section, sorted by date.

| Field         | What it does                                            |
| ------------- | ------------------------------------------------------ |
| **Title**     | Event name                                             |
| **Date**      | Event date (shown as e.g. "5 March 2026")              |
| **Location**  | Event location (optional)                              |
| **Description** | Event details                                        |
| **Image**     | Event image (optional — shows a calendar icon if blank) |

To **add** an event: **Add entry → Event**, fill fields, **Publish**. To remove a
past event from the site, **unpublish** or delete its entry.

---

## 12. Resources page

**Content type:** `Resource` — one entry per download.

Listing hero and link labels: Impact Story `page-resources`.

| Story field | On Resources |
| ----------- | ------------ |
| **Location** | Eyebrow |
| **Title** | Headline |
| **Summary** | Subtitle |
| **Author / Source** | “Download” link text |
| **Quote** | “Coming soon” text when a file is missing |

| Field           | What it does                                                       |
| --------------- | ----------------------------------------------------------------- |
| **Title**       | The resource name                                                 |
| **Category**    | Used for the filter buttons at the top (e.g. "Reports", "Briefs"). Resources with the same category are grouped under that filter. |
| **Description** | Short summary on the card                                         |
| **File**        | The downloadable file (PDF, etc.). Upload it here. If left empty, the card shows the coming-soon label instead of a download link. |
| **Order**       | Position in the list                                              |

To **add** a resource: **Add entry → Resource**, upload the **File**, set a
**Category** and **Order**, then **Publish**. New categories appear as filter
buttons automatically.

---

## 13. Contact page

Hero, panel heading, and form success copy: Impact Story `page-contact`.

| Story field | On Contact |
| ----------- | ---------- |
| **Location** | Eyebrow |
| **Title** | Headline |
| **Summary** | Subtitle |
| **Author / Source** | Send-button label |
| **Quote** | First paragraph = “Contact Information” heading; second = success heading; third = back-to-form button |
| **Body** | Success message (the Site Settings email is appended automatically) |

Contact details still come from **Site Settings** (see
[section 4](#4-global-content-site-settings)):

- **Email, Phone, Website, Address** → the information panel.
- **Facebook / Instagram / TikTok URLs** → social icons.

When a visitor submits the form, it opens their email app addressed to the
**Email** in Site Settings — so keep that email correct.

---

## 14. Header & Footer

- **Header (navigation):** Menu link *labels* (Home, About, Our Work, …) are
  part of the site chrome. The **logo** comes from **Site Settings**. The
  **Donate** button label comes from the Donate Get Involved Option.
- **Footer:** Logo, tagline, socials, email, phone, and address come from
  **Site Settings**. The “Our Work” column lists **Strategic Pillars**. The
  privacy line is Impact Story `page-privacy` → **Title**.

---

## 15. Page copy entries (the `page-…` slugs)

Headlines that are not part of Home Page / About Page fields live as **Impact
Stories** whose **Slug** starts with `page-`. They never appear on the Impact
grid.

Filter **Content → Impact Story** and search `page-` to find them. Always keep
**Featured** turned **off**.

How the website reads those fields:

| Impact Story field | Used as page copy |
| ------------------ | ----------------- |
| **Slug** | Must be exactly `page-…` as listed below |
| **Location** | Small eyebrow above the title |
| **Title** | Main heading |
| **Summary** | Subtitle / intro |
| **Body** | Long text (or stats, or About section labels) |
| **Author / Source** | Secondary heading, button, or form title |
| **Quote** | Split on blank lines: 1st = panel title, 2nd = panel body, rest = extra lines |
| **Image** | Optional hero image |

Complete slug list:

| Slug | Page / block |
| ---- | ------------ |
| `page-about` | About hero |
| `page-about-labels` | History / Vision / Mission headings |
| `page-about-holistic` | Holistic section |
| `page-about-values` | Core values section |
| `page-about-team` | Team section |
| `page-about-join` | About join band |
| `page-donate` | Donate |
| `page-volunteer` | Volunteer |
| `page-our-work` | Our Work listing (+ homepage “Discover Our Work”) |
| `page-impact` | Impact listing |
| `page-get-involved` | Get Involved listing |
| `page-get-involved-events` | Events heading |
| `page-resources` | Resources listing |
| `page-contact` | Contact |
| `page-home-pillars` | Homepage pillars heading |
| `page-home-partners` | Homepage partners heading |
| `page-home-cta` | Homepage bottom band |
| `page-home-story` | “Our Story” button |
| `page-home-impact` | “See Impact” button |
| `page-home-featured` | “Read the story” button |
| `page-home-stats` | Homepage statistics |
| `page-privacy` | Footer privacy line |
| `page-pillar-detail` | Pillar detail labels |
| `page-story-detail` | Story detail buttons |
| `page-not-found` | 404 page |

If you create a new `page-…` story, **Publish** it or that block of the site
will be missing.

---

## 16. Common how-to recipes

**Change the Donate payment link everywhere**
→ Site Settings → **Donate URL** (and/or Donate option **CTA URL**) → Publish.

**Change the Donate button wording**
→ Get Involved Option (Donate) → **CTA Label** → Publish.

**Update the homepage headline**
→ Home Page → **Hero Title / Hero Subtitle** → Publish.

**Update About, Donate, or Volunteer headlines**
→ Impact Story `page-about`, `page-donate`, or `page-volunteer` → Publish.

**Add a new team member**
→ Add entry → Team Member → fill Name/Role/Bio/Photo/Order → Publish → add to
About Page → Team → Publish About Page.

**Add a new impact story and feature it**
→ Add entry → Impact Story (slug must **not** start with `page-`) → Publish →
open Home Page → set **Featured Story** → Publish Home Page.

**Reorder pillars / values / resources / team**
→ Change the **Order** number on each entry (lower shows first) → Publish each.

**Swap a photo or image**
→ Open the entry → click the image field → **Remove** the old asset → **Add
media** (upload new or choose existing) → Publish. Also publish the asset if
prompted.

**Hide something temporarily**
→ Open the entry → click the "…" menu → **Unpublish**. Re-publish to show it again.

**Remove something permanently**
→ Unpublish, then delete the entry. (If it's referenced elsewhere, e.g. a pillar
featured on the homepage, remove that reference first.)

---

## 17. Formatting rules

- **Paragraphs:** For long text fields (**About**, **History**, pillar
  **Overview**, story **Body** and **Quote**), start a new paragraph by leaving a
  **blank line** between blocks of text (press **Enter twice**). A single line
  break is ignored.
- **Images:**
  - Use good-quality images (roughly 1200px wide or larger for banners).
  - Prefer landscape images for hero/banner fields.
  - Use square images for the **Logo** and team **Photos**.
  - Always give an asset a **Title** in Contentful; it's used as the image's alt
    text for accessibility.
- **Links (CTA URLs):** A full address (`https://…`) opens in a new tab. A path
  starting with `/` (like `/contact`) links to another page on this site.
- **Slugs:** Use lowercase letters and hyphens only (e.g. `clean-water`). Avoid
  spaces, capitals, and punctuation. Changing a slug changes that page's URL.
  Never start a public story slug with `page-`.

---

## 18. Troubleshooting

**"I edited something but the site hasn't changed."**
1. Did you click **Publish**? A draft is not live.
2. Wait about a minute, then hard-refresh the page (Cmd/Ctrl + Shift + R).
3. Check the entry status isn't **Changed** (that means unpublished edits remain).

**"My new entry doesn't appear on the site."**
- Make sure it's **Published**, not just saved as a draft.
- If it's meant to be featured (e.g. a homepage pillar or featured story), make
  sure it's added as a **reference** on the relevant page entry, and that page is
  **Published** too.
- If you added a Core Value, add it to **About Page → Values** as well.
- If a whole page’s headline is missing, check the matching `page-…` Impact
  Story is published.

**"A page-… story showed up on the Impact grid."**
- Its slug must start with `page-` exactly (for example `page-donate`). Rename
  the slug and Publish.

**"The whole site shows an error screen."**
- This usually means the site can't reach Contentful. Contact the site
  administrator — the connection token (in the site's `.env`) may need to be
  refreshed. Editors normally don't need to touch this.

**"An icon is wrong or shows a star/heart."**
- The **Icon** field only accepts specific keywords (listed in each section
  above). Any other value falls back to a default icon. Re-check the spelling.

**"I deleted an entry and now a page is broken."**
- If the deleted entry was referenced elsewhere (e.g. a featured story), open the
  page entry that referenced it and remove/replace the reference, then Publish.
- If you deleted a `page-…` story, recreate it with the same slug (section 15).

---

### Quick reference: page → content type

| Website page            | Edit these content types                                  |
| ----------------------- | --------------------------------------------------------- |
| Everywhere (logo, contact, socials, donate URL) | Site Settings + Donate option CTA |
| Home                    | Home Page + `page-home-…` / `page-our-work` / `page-donate` stories, Strategic Pillars, Impact Story, Partners, Get Involved Options |
| About (`/about`)        | About Page, Core Value, Team Member, `page-about-…` stories |
| Donate (`/donate`)      | Get Involved Option (Donate) + `page-donate` |
| Volunteer (`/volunteer`)| Get Involved Option (Volunteer) + `page-volunteer` |
| Our Work + pillar pages | Strategic Pillar + `page-our-work` + `page-pillar-detail` |
| Impact + story pages    | Impact Story + `page-impact` + `page-story-detail` |
| Get Involved            | Get Involved Option, Event, `page-get-involved`, `page-get-involved-events` |
| Resources               | Resource + `page-resources` |
| Contact                 | Site Settings + `page-contact` |
| Footer                  | Site Settings + Strategic Pillar + `page-privacy` |

**Remember: after every change, click _Publish_.**
