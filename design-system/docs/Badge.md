---
category: Indicators
---

Small uppercase status pill — e.g. "Beta", "Live", "New". Lime with a green border by default; `sky`, `purple`, and `neutral` tones for secondary contexts. Add `dot` for a leading status dot.

```tsx
import { Badge } from 'civic-ui'

<Badge tone="lime">Beta</Badge>
<Badge tone="sky" dot>Live</Badge>
<Badge tone="purple">Experimental</Badge>
```
