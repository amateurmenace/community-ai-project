import * as React from 'react'
import { Card, Button, Badge } from 'civic-ui'

/** A composed card: badge, title, body, and a bottom-pinned action. */
export const Showcase = () => (
  <div style={{ maxWidth: 340 }}>
    <Card interactive>
      <Badge tone="purple" style={{ alignSelf: 'flex-start', marginBottom: 16 }}>Anti-Bureaucracy</Badge>
      <h3 style={{ margin: '0 0 10px', fontSize: '1.4rem', fontWeight: 900, letterSpacing: '-0.02em' }}>
        Civic Documenter
      </h3>
      <p style={{ margin: '0 0 22px', opacity: 0.9, lineHeight: 1.6 }}>
        Turn messy PDF attachments from municipal agendas into structured, readable data.
      </p>
      <Button variant="primary" block>Open project</Button>
    </Card>
  </div>
)

/** The four shadow treatments. */
export const Elevations = () => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 28 }}>
    <Card elevation="default" padding="sm" style={{ width: 170 }}>
      <strong>Default</strong>
      <span style={{ opacity: 0.7, fontSize: '0.85rem' }}>8px green offset</span>
    </Card>
    <Card elevation="hard" padding="sm" style={{ width: 170 }}>
      <strong>Hard</strong>
      <span style={{ opacity: 0.7, fontSize: '0.85rem' }}>15px offset, 3px border</span>
    </Card>
    <Card elevation="soft" padding="sm" style={{ width: 170 }}>
      <strong>Soft</strong>
      <span style={{ opacity: 0.7, fontSize: '0.85rem' }}>diffuse, sky border</span>
    </Card>
    <Card elevation="flat" padding="sm" style={{ width: 170 }}>
      <strong>Flat</strong>
      <span style={{ opacity: 0.7, fontSize: '0.85rem' }}>no shadow</span>
    </Card>
  </div>
)
