import * as React from 'react'
import { Button } from 'civic-ui'

const RocketIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
)
const RefreshIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
    <path d="M21 3v5h-5" />
    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
    <path d="M8 16H3v5" />
  </svg>
)

/** The five variants on the cream canvas. */
export const Variants = () => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
    <Button variant="primary">Launch app</Button>
    <Button variant="secondary">Explore tools</Button>
    <Button variant="special">Get involved</Button>
    <Button variant="brutal">Fork this →</Button>
  </div>
)

/** Three sizes, including the uppercase large call-to-action. */
export const Sizes = () => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
    <Button size="sm" variant="secondary" icon={RefreshIcon}>Regenerate</Button>
    <Button size="md" variant="secondary">Public meetings</Button>
    <Button size="lg" variant="primary" uppercase>Generate</Button>
  </div>
)

/** Leading icons, and the squared (non-pill) shape. */
export const WithIcon = () => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
    <Button variant="primary" icon={RocketIcon}>Launch Commit</Button>
    <Button variant="secondary" pill={false}>Read the docs</Button>
  </div>
)

/** The ghost variant on its intended dark terminal surface. */
export const Ghost = () => (
  <div style={{ background: 'var(--ide-bg)', padding: 28, borderRadius: 8, display: 'flex', flexWrap: 'wrap', gap: 14 }}>
    <Button variant="ghost">$ npm run dev</Button>
    <Button variant="ghost">Deploy ▸</Button>
  </div>
)

/** Disabled state. */
export const Disabled = () => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
    <Button variant="primary" disabled>Deploying…</Button>
    <Button variant="secondary" disabled>Unavailable</Button>
  </div>
)
