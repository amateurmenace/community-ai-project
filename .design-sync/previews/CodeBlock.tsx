import * as React from 'react'
import { CodeBlock } from 'civic-ui'

/** A labeled "constitution" for a community model. */
export const Constitution = () => (
  <div style={{ maxWidth: 460 }}>
    <CodeBlock
      label="constitution.yaml"
      code={`values:
  - transparency
  - community ownership
  - accessibility
refuse:
  - surveillance
  - dark patterns
model: gemini-3-flash`}
    />
  </div>
)

/** A real config snippet (no label). */
export const Snippet = () => (
  <div style={{ maxWidth: 460 }}>
    <CodeBlock
      code={`generationConfig: {
  thinkingConfig: { thinkingBudget: 0 },
  maxOutputTokens: 256
}`}
    />
  </div>
)
