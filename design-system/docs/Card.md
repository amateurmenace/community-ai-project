---
category: Surfaces
---

Brutalist surface: a white panel with a green border and a hard offset shadow — the building block for project, mission, and builder cards. Composes as a flex column, so an action pinned with `margin-top:auto` sits at the bottom. `interactive` adds the hover lift; `elevation` switches the shadow (`default`/`hard`/`soft`/`flat`).

```tsx
import { Card, Button } from 'civic-ui'

<Card interactive>
  <h3>Civic Documenter</h3>
  <p>Turn messy municipal PDFs into structured, readable data.</p>
  <Button variant="primary" block>Open project</Button>
</Card>
```
