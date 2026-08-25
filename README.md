# Khetan Group — Homepage

A premium, dark-navy-and-gold corporate homepage built with **Next.js (App Router)** and
plain **JavaScript** (no TypeScript). Only the homepage is fully implemented; the folder
structure is set up so About, Businesses, Investors, News, Careers and Contact pages can be
added later as `app/<route>/page.js`.

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

```bash
npm run build   # production build
npm run start   # serve the production build
```

## Project structure

```text
app/
  globals.css       Design tokens (colors, type, spacing) + resets + shared classes
  layout.js          Root layout, Google Fonts (Fraunces + Inter), metadata
  page.js            Assembles the homepage from section components

components/
  Navbar.js / .module.css          Transparent-on-hero navbar, scroll-solid state, mobile menu
  Hero.js / .module.css            Auto-playing hero slider (4 slides), prev/next, dots, progress bar
  ScrollReveal.js                  Shared IntersectionObserver reveal-on-scroll wrapper
  IntroSection.js / .module.css    Dark "Who We Are" section + 3 vision/mission/values cards
  BusinessIcon.js                  Minimal inline SVG icon set for the business categories
  FocusSection.js / .module.css    Light "Our Businesses" section, 6 category cards
  ProjectsSection.js / .module.css Featured projects grid (4 image cards)
  StatsSection.js / .module.css    Animated count-up statistics strip
  NewsSection.js / .module.css     Featured article + secondary article list
  CareersBanner.js / .module.css   Cinematic full-width careers CTA with slow background zoom
  Footer.js / .module.css          Footer with link columns + newsletter form

data/
  homeData.js        All repeated content (nav links, hero slides, business categories,
                      projects, stats, news, footer links) as plain data arrays

public/
  images/, icons/    Drop local assets here and swap the URLs in data/homeData.js
```

## Notes

- Images currently reference Unsplash URLs so the page works out of the box. Replace them with
  files in `public/images/` and update the `image` fields in `data/homeData.js` for production.
- Colors, spacing and typography are driven by CSS variables in `app/globals.css` — adjust the
  tokens there to retheme the whole site.
- Each section component pairs with a CSS Module of the same name, so styles stay scoped and
  easy to find.
- Animations respect `prefers-reduced-motion`.
