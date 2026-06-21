---
category: Content
---

A value/feature row: a toned IconBox beside a bold title and a line of body copy. Used in value lists. `tone` colors the icon square (`lime`/`sky`/`purple`).

```tsx
import { FeatureItem } from 'civic-ui'

<FeatureItem
  icon={<CodeIcon />}
  tone="lime"
  title="Open source by default"
  description="Every tool is free, forkable, and auditable."
/>
```
