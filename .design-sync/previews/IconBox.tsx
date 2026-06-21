import * as React from 'react'
import { IconBox } from 'civic-ui'

const Zap = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
)
const Globe = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" />
  </svg>
)
const Message = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
  </svg>
)

/** The three tones. */
export const Tones = () => (
  <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
    <IconBox tone="lime">{Zap}</IconBox>
    <IconBox tone="sky">{Globe}</IconBox>
    <IconBox tone="purple">{Message}</IconBox>
  </div>
)

/** Three sizes. */
export const Sizes = () => (
  <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
    <IconBox size="sm">{Zap}</IconBox>
    <IconBox size="md">{Zap}</IconBox>
    <IconBox size="lg">{Zap}</IconBox>
  </div>
)
