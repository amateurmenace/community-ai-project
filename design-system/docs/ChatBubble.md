---
category: Communication
---

A single chat message bubble, as used in the assistant demo window. `from="ai"` is the left-aligned grey bubble; `from="user"` is the right-aligned blue. Compose several in a flex column for a conversation.

```tsx
import { ChatBubble } from 'civic-ui'

<ChatBubble from="ai">How can I help with your town?</ChatBubble>
<ChatBubble from="user">When's the next council meeting?</ChatBubble>
```
