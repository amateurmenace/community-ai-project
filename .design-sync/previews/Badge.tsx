import * as React from 'react'
import { Badge } from 'civic-ui'

/** All four tones. */
export const Tones = () => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
    <Badge tone="lime">Beta</Badge>
    <Badge tone="sky">Live</Badge>
    <Badge tone="purple">Experimental</Badge>
    <Badge tone="neutral">Archived</Badge>
  </div>
)

/** With a leading status dot. */
export const WithDot = () => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
    <Badge tone="lime" dot>New</Badge>
    <Badge tone="sky" dot>Online</Badge>
    <Badge tone="neutral" dot>Draft</Badge>
  </div>
)

/** Real project statuses from the catalog. */
export const ProjectStatuses = () => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
    <Badge tone="lime">Local LLM</Badge>
    <Badge tone="sky">Web Tool</Badge>
    <Badge tone="purple">Anti-Bureaucracy</Badge>
  </div>
)
