---
category: Surfaces
---

The flagship card: a brutalist surface composing an IconBox, status badges, a title, a description, a row of tech Tags, and a bottom-pinned action. Plain strings in `tags` become Tag chips automatically; pass Tag nodes for custom tones.

```tsx
import { ProjectCard, Badge, Button } from 'civic-ui'

<ProjectCard
  icon={<BotIcon />}
  title="Commit"
  description="A localized AI agent for cities + towns."
  badges={<Badge tone="lime">Beta</Badge>}
  tags={['AI Agent', 'Local LLM', 'Vibe Coding']}
  action={<Button variant="primary" block>Launch app</Button>}
/>
```
