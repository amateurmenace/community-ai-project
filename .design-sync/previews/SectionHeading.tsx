import * as React from 'react'
import { SectionHeading } from 'civic-ui'

/** The default left-aligned block: mono kicker, heavy headline, subtitle. */
export const Default = () => (
  <SectionHeading
    kicker="◆ Open-source civic tech"
    title="AI tools for the public good"
    subtitle="Free, transparent, community-owned software that helps neighborhoods, towns, and cities put AI to work — without surveillance or lock-in."
  />
)

/** Centered, for hero and section intros. */
export const Centered = () => (
  <SectionHeading
    center
    kicker="The Playground"
    title="Build it yourself"
    subtitle="Describe an app in plain language and watch it come to life in the browser."
  />
)

/** The lime→emerald gradient headline used for featured sections. */
export const Gradient = () => (
  <SectionHeading
    gradient
    kicker="★ Featured project"
    title="Meet Commit"
    subtitle="A localized agent that takes real action in your town."
  />
)

/** Smaller scale, level-3 heading for sub-sections. */
export const Compact = () => (
  <SectionHeading size="sm" level={3} kicker="Mission control" title="What we believe" />
)
