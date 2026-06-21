---
category: Communication
---

Dark IDE/CLI surface with a title bar. Body content (children) renders in monospace; wrap prompts in `<span className="cui-terminal__prompt">` for the lime accent. `dots` toggles the traffic-light dots; `cursor` appends a blinking lime cursor.

```tsx
import { Terminal } from 'civic-ui'

<Terminal title="civic-cli" cursor>
  <div><span className="cui-terminal__prompt">$</span> civic deploy commit</div>
  <div>✓ Deployed</div>
</Terminal>
```
