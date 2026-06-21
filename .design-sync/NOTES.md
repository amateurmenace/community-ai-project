# Civic UI — design-sync notes

## What this is
`civic-ui` is a **net-new React component library** that was extracted by hand from the
marketing site's `style.css` / `index.html` visual language (brutalist-solarpunk civic tech).
It is NOT a pre-existing design system. Source lives in `design-system/` (its own node package).

- Build the library before the converter: `npm run build --prefix design-system` (tsup → `dist/index.js` + `dist/index.d.ts`, then `cp src/styles.css dist/styles.css`). This is `cfg.buildCmd`.
- Converter entry: `--entry ./design-system/dist/index.js --node-modules ./design-system/node_modules`.
- 11 components on `window.CivicUI`, grouped via `design-system/docs/<Name>.md` frontmatter `category:` (`cfg.docsDir=docs`): Actions, Indicators, Surfaces, Content, Communication.
- Previews are authored in `.design-sync/previews/*.tsx` with self-contained inline SVG icons (no icon dependency).

## Known render warns (expected — not new)
- `[FONT_REMOTE]` for "Inter" / "JetBrains Mono": fonts load at runtime via a Google Fonts `@import` at the top of `design-system/src/styles.css`. Non-blocking; no woff2 is bundled.

## Gotchas
- **Interrupted build leaves `ds-bundle/` half-wiped** (missing `_ds_bundle.js` and the `.ds-bundle` marker) → every later build trips `[OUT_UNSAFE]`. Fix: `rm -rf ds-bundle` and rebuild. `ds-bundle/` is gitignored regenerated output; grades live in `.design-sync/.cache/review/` and survive the delete.
- A prose-font bug was fixed at the source: text components (`Card`, `FeatureItem`, `SectionHeading`, `ChatBubble`) now set `font-family: var(--font-body)` on their root. Without it, prose fell back to serif on the design surface (which has no ambient `body` font). Keep this on any new prose component.

## Re-sync risks (watch-list for the next run)
- **The library is decoupled from the live site.** If the site's `style.css` brand changes, `civic-ui` will NOT auto-update — they are separate codebases. Re-extract by hand if the brand evolves.
- **Fonts are remote.** If an offline/embedded render is ever needed, ship woff2 via `cfg.extraFonts` instead of the Google Fonts `@import`.
- **Auth required for upload.** `DesignSync` (and `report_validate`) need design-system authorization — run `/design-login` (or `/login` with a Claude subscription). The local build/verify pipeline needs no auth.
- Re-sync command (once a project exists, with its `_ds_sync.json` saved to `.design-sync/.cache/remote-sync.json`):
  `node .ds-sync/resync.mjs --config .design-sync/config.json --node-modules ./design-system/node_modules --entry ./design-system/dist/index.js --out ./ds-bundle --remote .design-sync/.cache/remote-sync.json`
