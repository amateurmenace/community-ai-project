import * as React from 'react'
import { Tag } from 'civic-ui'

/** A real tech stack on the light surface. */
export const TechStack = () => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
    <Tag>Python</Tag>
    <Tag>FFMPEG</Tag>
    <Tag>React</Tag>
    <Tag>Whisper</Tag>
  </div>
)

/** The light and muted tones side by side. */
export const Tones = () => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
    <Tag tone="light">light</Tag>
    <Tag tone="muted">muted</Tag>
  </div>
)

/** The dark tone on its intended terminal surface. */
export const OnTerminal = () => (
  <div style={{ background: 'var(--ide-bg)', padding: 24, borderRadius: 8, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
    <Tag tone="dark">RAG</Tag>
    <Tag tone="dark">Vector DB</Tag>
    <Tag tone="dark">Ollama</Tag>
  </div>
)
