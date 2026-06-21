---
category: Actions
---

The primary action control. Pill-shaped by default with the signature hover-invert (fills green and lifts on hover). Renders a native `<button>` and forwards all button props. Variants: `primary`/`special` (filled green), `secondary` (outline, the default), `ghost` (for the dark terminal surface), `brutal` (squared with a hard offset shadow that presses down on click).

```tsx
import { Button } from 'civic-ui'

<Button variant="primary">Launch app</Button>
<Button variant="secondary">Explore tools</Button>
<Button variant="brutal">Fork this →</Button>
<Button variant="primary" size="lg" uppercase>Generate</Button>
```
