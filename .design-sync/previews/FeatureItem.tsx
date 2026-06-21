import * as React from 'react'
import { FeatureItem } from 'civic-ui'

const Code = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
  </svg>
)
const Users = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
)
const Access = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="16" cy="4" r="1" /><path d="m18 19 1-7-6 1" /><path d="m5 8 3-3 5.5 3-2.36 3.5" />
    <path d="M4.24 14.5a5 5 0 0 0 6.88 6" /><path d="M13.76 17.5a5 5 0 0 0-6.88-6" />
  </svg>
)

/** The values list — three feature rows with toned icon squares. */
export const Values = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 36, maxWidth: 460 }}>
    <FeatureItem
      icon={Code}
      tone="lime"
      title="Open source by default"
      description="Every tool is free, forkable, and auditable. No black boxes, no lock-in."
    />
    <FeatureItem
      icon={Users}
      tone="sky"
      title="Community-owned"
      description="Models and data belong to the neighborhoods they serve, not a vendor."
    />
    <FeatureItem
      icon={Access}
      tone="purple"
      title="Accessible to everyone"
      description="Built to WCAG standards with captions, translation, and dyslexia-friendly type."
    />
  </div>
)

/** A single row. */
export const Single = () => (
  <div style={{ maxWidth: 440 }}>
    <FeatureItem
      icon={Code}
      title="Open source by default"
      description="Every tool is free, forkable, and auditable."
    />
  </div>
)
