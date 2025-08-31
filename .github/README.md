[![Actions Status](https://github.com/ozgurg/vergihesaplayici.com/actions/workflows/main.yml/badge.svg)](https://github.com/ozgurg/vergihesaplayici.com/actions)
![Version](https://img.shields.io/github/package-json/v/ozgurg/vergihesaplayici.com)

[![Banner](https://raw.githubusercontent.com/ozgurg/vergihesaplayici.com/main/.github/banner.png)](https://vergihesaplayici.com)

# vergihesaplayici.com

vergihesaplayici.com, calculates taxes.

---

## Overview

### Astro + Vue

* Astro is a static site generator, and a static site is perfect for this "static" site. :)
* Moving from Nuxt 2 to Nuxt 3 was painful.
* I love using Vue, and I picked Vue for most parts of the code unless I needed special Astro features like `<Image />`.

### Domain Design

Each page is organized by domain under `src/domains`. All utils, types, and other related files for a page live inside
its own folder. This helps separate pages semantically.

### `PageDef`

Inside `src/domains`, functions that end with `PageDef` define each page. They return a fixed output to avoid broken
links. Yes, it makes the code a little bit verbose, but it's OK.

### Color Extraction for Thumbs

"Telefon Vergisi Hesaplayıcı" and "Konsol Vergisi Hesaplayıcı" have presets with thumbs. Each thumb shows a colored card
with its dominant color. To automate this, I created an Astro integration called `extract-color-from-thumbs`. It loads
the thumbs, extracts the main color using the `fast-average-color-node` library, and saves the result in a `.generated`
folder.

At first, I tried doing this in the browser, and it worked. But since Astro builds run in Node, the color extraction
libraries didn't work properly there. I also found some libraries that worked in Node but not in the browser. So, the
final solution is a bit hacky, but it works for now.

### Presets

"Telefon Vergisi Hesaplayıcı" and "Konsol Vergisi Hesaplayıcı" have presets. Every day, a new phone is announced.
Currently, I'm only adding flagship phones from Apple and Samsung. Apple is the main focus because, according to site
analytics, none of this site's users really care about Samsung. I'll only add Samsung phones if I need to or if they
voluntarily pay me to do it. 💀

Also, the presets include prices that are manually updated. So, don't expect precision. These calculations only provide
information about taxes.

### SVG Cache

I tested a new approach for managing SVGs by grouping them all inside one `<svg />` as `<symbol />` elements and
referencing them with `<use />`. This prevents repeating SVG code and helps reduce the HTML size. (But if an SVG is only
used once, this actually increases the HTML size)

I built a simple Map cache in `svg-cache.ts` to store SVGs, make symbols, and add them to the end of `<body />`. It
works in theory, but with Vue components using `client:load` on many pages, the cache breaks. So I commented this part
out for now until I find a better way.

### Exchange Rates

I prefer free exchange rate services that do not require an API key. Free APIs are not precise, but since the calculator
on this site is not financially critical, precision is not that important. Exchange rates are fetched during the build
process.

### Tests

Tests in the `__test__` folder follow the directory structure. I wrote as many tests as I could, but for big and complex
files, I marked them as TODO, though I probably won't write tests for them.

### UI and CSS

I made my own UI library based on my design ideas. Sometimes I reinvented the wheel just for fun. When building
components:

* CSS properties must be well organized.
* Always use `rem` units.
* All CSS variables and SASS mixins start with the `vh` prefix.
* Components should be as accessible as possible.
* Components should behave and look like native HTML elements.
* Since this is a little project, I don't use design tokens for components. Components use global CSS variables instead
  of variables defined specifically for them.
* I love trying new web features, but only if there's a good polyfill, and they
  are [Baseline Widely-available](https://developer.mozilla.org/en-US/docs/Glossary/Baseline/Compatibility).

### Articles

There are many AI-generated articles in the `src/content` folder. They look like SEO posts, but I first put them there
just to show ad publishers the site wasn't empty. (They still haven't approved this site) Later, these articles started
getting visitors from search engines, so now they actually help with SEO a little. I don't like it.

---

## Contributing

See [CONTRIBUTING.md](https://github.com/ozgurg/vergihesaplayici.com/blob/main/.github/CONTRIBUTING.md)

---

## License

This project is licensed under the GNU Affero General Public License v3 (AGPLv3), with additional conditions under
Section 7.

### Summary of License Terms

- You may use, modify, and redistribute this software under AGPLv3.
- You **must preserve attribution** to the original author ("Özgür Görgülü") and project name ("Vergi Hesaplayıcı").
- You **must not** reuse the project name ("Vergi Hesaplayıcı"), domain ("vergihesaplayici.com), or any original
  branding in derivative works unless granted permission.
- You must **display attribution** in the user interface of any derivative version.

[![License](https://img.shields.io/badge/License-AGPLv3-%2388DF95.svg)](https://github.com/ozgurg/vergihesaplayici.com/blob/main/LICENSE)
