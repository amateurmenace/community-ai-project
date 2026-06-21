## Building with Civic UI

Civic UI is the Community AI Project's design system — a brutalist-solarpunk kit for civic tech (cream canvas, deep green, lime accent, hard offset shadows). Every component is a real React component on `window.CivicUI`. Build screens out of these components, not generic HTML.

### Setup — no provider needed
Tokens and component styles ship in the global stylesheet (`styles.css`, which `@import`s `_ds_bundle.css`). There is **no theme provider and no React context** — import a component and render it; it arrives fully styled. To establish the brand canvas (cream background, Inter body type, green text) on a page or section, wrap it in the optional root class:

```jsx
<div className="cui-root"> … your screen … </div>
```

### The styling idiom — props for variants, CSS variables for your own layout
Components own their appearance. **Do not pass utility classes to a component to restyle it** — pick a look through its props:
- `Button`: `variant` (`primary` | `secondary` | `special` | `ghost` | `brutal`), `size` (`sm`|`md`|`lg`), plus `pill`, `block`, `uppercase`, `icon`
- `Badge`, `IconBox`, `FeatureItem`: `tone` (`lime` | `sky` | `purple` | `neutral`)
- `Tag`: `tone` (`light` | `dark` | `muted`)
- `Card`: `interactive`, `elevation` (`default` | `hard` | `soft` | `flat`), `padding`
- `SectionHeading`: `kicker`, `subtitle`, `center`, `gradient`, `size`, `level`
- `ProjectCard`: `icon`, `badges`, `tags` (string[] → auto Tag chips), `action`

For YOUR OWN layout glue (wrappers, grids, spacing, custom surfaces) use the design tokens — never hardcode hex:

| Token | Use |
|---|---|
| `--primary-green` (`#052e16`) | text, borders |
| `--button-green` (`#1a4a35`) | filled-button hover |
| `--accent-lime` (`#4ade80`) | primary accent |
| `--accent-emerald` (`#34d399`) | gradient partner |
| `--bg-cream` (`#FDF9F0`) | page canvas |
| `--bg-white` (`#FFFFFF`) | card surface |
| `--code-bg-purple` / `--code-text-purple` | code panels |
| `--ide-bg` / `--ide-accent` | dark terminal surface |
| `--font-heading` / `--font-body` | Inter (headings are weight 900, tight tracking) |
| `--font-mono` | JetBrains Mono (kickers, tags, code) |
| `--border-radius` (`12px`), `--border-width` (`2px`) | geometry |
| `--cui-shadow` / `--cui-shadow-hover` | signature 8px green / lime-on-hover offset |
| `--cui-shadow-hard` | heavier 15px offset |

The signature look is a **hard offset box-shadow** (never a soft blur) over a 2px green border on a cream/white surface. To give a custom element that look: `border: 2px solid var(--primary-green); box-shadow: var(--cui-shadow);`.

### Where the truth lives
- Tokens + all component CSS: `styles.css` → `_ds_bundle.css` (read before styling anything custom).
- Per component: `components/<group>/<Name>/<Name>.prompt.md` (usage + examples) and `<Name>.d.ts` (full props). Components are grouped as **Actions, Indicators, Surfaces, Content, Communication**.

### One idiomatic composition
```jsx
const { SectionHeading, ProjectCard, Badge, Button } = window.CivicUI
;<section className="cui-root" style={{ padding: '64px 32px' }}>
  <SectionHeading
    kicker="◆ Open-source civic tech"
    title="AI tools for the public good"
    subtitle="Free, community-owned software for towns and cities."
  />
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 40, marginTop: 48 }}>
    <ProjectCard
      title="Commit"
      description="A localized AI agent for cities + towns."
      badges={<Badge tone="lime">Beta</Badge>}
      tags={['AI Agent', 'Local LLM']}
      action={<Button variant="primary" block>Launch app</Button>}
    />
  </div>
</section>
```
