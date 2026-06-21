---
category: Content
---

Purple monospace panel with a hard offset shadow — for code, config, or "constitution" snippets. Pass plain text via `code`, or richer markup as children. Optional `label` renders a header (e.g. a filename).

```tsx
import { CodeBlock } from 'civic-ui'

<CodeBlock label="constitution.yaml" code={"values:\n  - transparency\n  - accessibility"} />
```
