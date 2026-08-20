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
6. [Who We Are page](#6-who-we-are-page)
7. [Our Work page & pillar detail pages](#7-our-work-page--pillar-detail-pages)
8. [Impact Stories page & story detail pages](#8-impact-stories-page--story-detail-pages)
9. [Get Involved page (options + events)](#9-get-involved-page)
10. [Resources page](#10-resources-page)
11. [Contact page](#11-contact-page)
12. [Header (navigation) & Footer](#12-header--footer)
13. [Common how-to recipes](#13-common-how-to-recipes)
14. [Formatting rules (paragraphs, images, links)](#14-formatting-rules)
15. [Troubleshooting](#15-troubleshooting)

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
  | **About Page**        | The "Who We Are" page text (about / vision / mission / history) |
  | **Core Value**        | The value cards on "Who We Are"                                |
  | **Team Member**       | The team cards on "Who We Are"                                 |
  | **Strategic Pillar**  | The six pillars (Our Work page + each pillar detail page)      |
  | **Impact Story**      | The stories on the Impact page + each story detail page        |
  | **Get Involved Option** | The "ways to help" cards on Get Involved                     |
  | **Event**             | The events listed on Get Involved                              |
  | **Resource**          | The downloads on the Resources page                            |
  | **Partner**           | The partner logos/names on the homepage                        |

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
contact info, social links, and the **Donate** button used across the whole
site (header, footer, contact page, homepage buttons).

**Steps**

1. **Content** → filter by **Site Settings** → open the single entry.
2. Edit any of these fields, then **Publish**:

| Field           | Where it appears                                          |
| --------------- | --------------------------------------------------------- |
| **Site Name**   | Footer copyright, page titles                             |
| **Tagline**     | Footer, under the logo                                    |
| **Logo**        | Header, footer, homepage badge (upload a square image)    |
| **Email**       | Contact page, footer, and the contact form's destination  |
| **Phone**       | Contact page, footer                                      |
| **Website**     | Contact page, footer bottom bar                           |
| **Address**     | Contact page, footer                                      |
| **Facebook URL** | Facebook icon in footer & contact page (leave blank to hide) |
| **Instagram URL** | Instagram icon (leave blank to hide)                     |
| **TikTok URL**  | TikTok icon (leave blank to hide)                         |
| **Donate URL**  | The **Donate** buttons everywhere (e.g. a payment/GoFundMe link) |

> **Tip:** Social icons only show if the matching URL is filled in. Leave a URL
> blank to hide that icon.

---

## 5. Home page

**Content type:** `Home Page` — there is **one** entry. It controls the homepage
in five sections, top to bottom.

**Steps:** **Content** → filter **Home Page** → open the single entry → edit →
**Publish**.

### Section A — Hero (top banner)

| Field            | What it does                                              |
| ---------------- | --------------------------------------------------------- |
| **Hero Title**   | The big headline                                          |
| **Hero Subtitle** | The sentence under the headline                          |
| **Hero Image**   | The background/side image (upload or pick an asset)       |

> The **Donate / Partner / Volunteer** buttons in the hero are fixed. The Donate
> link comes from **Site Settings → Donate URL** (see section 4).

### Section B — Intro blurb

| Field           | What it does                                    |
| --------------- | ----------------------------------------------- |
| **Intro Blurb** | The large highlighted sentence below the hero.  |

> The four statistics next to it (e.g. "10+ Years of service") are currently
> fixed in the design and are not edited in Contentful.

### Section C — Strategic Pillars ("What We Do")

| Field             | What it does                                                 |
| ----------------- | ------------------------------------------------------------ |
| **Pillars**       | A list of references to **Strategic Pillar** entries to feature as cards. |

To change which pillars appear: click **Add existing content** and choose the
Strategic Pillar entries. To edit a pillar's title/summary/icon, open that
Strategic Pillar entry (see [section 7](#7-our-work-page--pillar-detail-pages)).

### Section D — Featured Impact Story

| Field             | What it does                                                     |
| ----------------- | ---------------------------------------------------------------- |
| **Featured Story** | A reference to one **Impact Story** entry shown in the green band. |

The website shows that story's **title, quote, author, and image**. Edit those
on the Impact Story entry itself.

### Section E — Partners

| Field         | What it does                                             |
| ------------- | -------------------------------------------------------- |
| **Partners**  | A list of references to **Partner** entries (logo + name). |

> The bottom "Together, we can create a better future" call-to-action band is
> fixed text; its buttons use the Donate URL and link to Get Involved.

---

## 6. Who We Are page

This page is built from **three** content types.

### 6a. Page text — `About Page` (one entry)

**Content** → filter **About Page** → open → edit → **Publish**.

| Field         | Where it appears on the page                               |
| ------------- | ---------------------------------------------------------- |
| **Hero Image** | Banner image at the top                                    |
| **About**     | The main "About DOM Foundation" body text                  |
| **History**   | The "Our History" card (leave blank to hide the card)      |
| **Vision**    | The green "Our Vision" box                                 |
| **Mission**   | The "Our Mission" box                                      |

> **About** and **History** support multiple paragraphs — separate paragraphs
> with a **blank line** (press Enter twice). See [section 14](#14-formatting-rules).

### 6b. Value cards — `Core Value` (one entry per value)

Each card in "Our Core Values" is a separate **Core Value** entry.

| Field         | What it does                                                        |
| ------------- | ------------------------------------------------------------------- |
| **Title**     | The value name                                                      |
| **Description** | Short text under the title                                        |
| **Icon**      | Choose one keyword to pick the icon: `collaborate`, `empathy`, `integrity`, `diversity`, or `impact`. Anything else shows a star. |
| **Order**     | Position (lower = earlier)                                          |

To **add** a value: **Add entry → Core Value**, fill fields, set Order, **Publish**.

### 6c. Team cards — `Team Member` (one entry per person)

| Field       | What it does                                        |
| ----------- | --------------------------------------------------- |
| **Name**    | Person's name                                       |
| **Role**    | Job title (optional)                                |
| **Bio**     | Short bio (optional)                                |
| **Photo**   | Portrait image (optional — shows an icon if blank)  |
| **Order**   | Position among team cards                            |

To **add** a team member: **Add entry → Team Member**, fill fields, **Publish**.

---

## 7. Our Work page & pillar detail pages

**Content type:** `Strategic Pillar` — one entry per pillar (there are six).
These power the **Our Work** grid, each pillar's own detail page, the homepage
pillar cards, and the footer "Our Work" links.

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

### To add a new story

1. **Add entry → Impact Story**, fill fields (at minimum Title + Slug), **Publish**.
2. It automatically appears on the Impact page.

### To feature a story on the homepage

Open **Home Page → Featured Story**, point it at the Impact Story you want, then
**Publish** the Home Page.

---

## 9. Get Involved page

This page uses **two** content types.

### 9a. The "ways to help" cards — `Get Involved Option`

| Field           | What it does                                                     |
| --------------- | ---------------------------------------------------------------- |
| **Title**       | Card heading                                                     |
| **Description** | Card text                                                        |
| **Icon**        | Choose one keyword: `donate`, `volunteer`, `partner`, or `events`. Anything else shows a heart. |
| **CTA Label**   | The button text (leave blank to hide the button)                 |
| **CTA URL**     | Where the button goes. A full `https://…` link opens in a new tab; a path like `/contact` navigates within the site. |
| **Order**       | Card position                                                    |

To **add** an option: **Add entry → Get Involved Option**, fill fields, **Publish**.

### 9b. The events list — `Event`

Shown in the "Events & Community Drives" section, sorted by date.

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

## 10. Resources page

**Content type:** `Resource` — one entry per download.

| Field           | What it does                                                       |
| --------------- | ----------------------------------------------------------------- |
| **Title**       | The resource name                                                 |
| **Category**    | Used for the filter buttons at the top (e.g. "Reports", "Briefs"). Resources with the same category are grouped under that filter. |
| **Description** | Short summary on the card                                         |
| **File**        | The downloadable file (PDF, etc.). Upload it here. If left empty, the card shows "Coming soon" instead of a download link. |
| **Order**       | Position in the list                                              |

To **add** a resource: **Add entry → Resource**, upload the **File**, set a
**Category** and **Order**, then **Publish**. New categories appear as filter
buttons automatically.

---

## 11. Contact page

The Contact page pulls everything from **Site Settings** (see
[section 4](#4-global-content-site-settings)):

- **Email, Phone, Website, Address** → the "Contact Information" panel.
- **Facebook / Instagram / TikTok URLs** → the "Follow us" icons.

So to update contact details, edit the **Site Settings** entry and **Publish**.

> The message form itself is fixed. When a visitor submits it, it opens their
> email app addressed to the **Email** in Site Settings — so keep that email
> correct.

---

## 12. Header & Footer

- **Header (navigation):** The menu links (Who We Are, Our Work, Impact, etc.)
  are fixed in the site design and are **not** edited in Contentful. The **logo**
  and **Donate** button come from **Site Settings**.
- **Footer:** Built automatically from **Site Settings** (logo, tagline, socials,
  email, phone, address) and the list of **Strategic Pillars** (the "Our Work"
  column). Update those entries to change the footer.

---

## 13. Common how-to recipes

**Change the Donate button link everywhere**
→ Site Settings → **Donate URL** → Publish.

**Update the homepage headline**
→ Home Page → **Hero Title / Hero Subtitle** → Publish.

**Add a new team member**
→ Add entry → Team Member → fill Name/Role/Bio/Photo/Order → Publish.

**Add a new impact story and feature it**
→ Add entry → Impact Story → Publish → open Home Page → set **Featured Story** →
Publish Home Page.

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

## 14. Formatting rules

- **Paragraphs:** For long text fields (**About**, **History**, pillar
  **Overview**, story **Body**), start a new paragraph by leaving a **blank
  line** between blocks of text (press **Enter twice**). A single line break is
  ignored.
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

---

## 15. Troubleshooting

**"I edited something but the site hasn't changed."**
1. Did you click **Publish**? A draft is not live.
2. Wait about a minute, then hard-refresh the page (Cmd/Ctrl + Shift + R).
3. Check the entry status isn't **Changed** (that means unpublished edits remain).

**"My new entry doesn't appear on the site."**
- Make sure it's **Published**, not just saved as a draft.
- If it's meant to be featured (e.g. a homepage pillar or featured story), make
  sure it's added as a **reference** on the relevant page entry, and that page is
  **Published** too.

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

---

### Quick reference: page → content type

| Website page            | Edit these content types                                  |
| ----------------------- | --------------------------------------------------------- |
| Everywhere (logo, contact, socials, donate) | Site Settings                        |
| Home                    | Home Page (+ referenced Strategic Pillars, Impact Story, Partners) |
| Who We Are              | About Page, Core Value, Team Member                        |
| Our Work + pillar pages | Strategic Pillar                                           |
| Impact + story pages    | Impact Story                                               |
| Get Involved            | Get Involved Option, Event                                 |
| Resources               | Resource                                                   |
| Contact                 | Site Settings                                              |
| Footer                  | Site Settings + Strategic Pillar                           |

**Remember: after every change, click _Publish_.**
