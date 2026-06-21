import * as React from 'react'
import { cx } from './util'

export interface SectionHeadingProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** The headline. */
  title: React.ReactNode
  /** Small monospace eyebrow above the title. */
  kicker?: React.ReactNode
  /** Supporting sentence below the title. */
  subtitle?: React.ReactNode
  /** Center-align the stack. @default false */
  center?: boolean
  /** Apply the lime→emerald gradient text clip to the title. @default false */
  gradient?: boolean
  /** Title scale. @default 'md' */
  size?: 'sm' | 'md'
  /** Heading level rendered for the title. @default 2 */
  level?: 1 | 2 | 3
}

/**
 * Section title block: an optional mono kicker, a heavy display headline, and an
 * optional subtitle. Captures the site's typographic scale and tracking.
 */
export function SectionHeading({
  title,
  kicker,
  subtitle,
  center = false,
  gradient = false,
  size = 'md',
  level = 2,
  className,
  ...rest
}: SectionHeadingProps) {
  const Heading = `h${level}` as 'h1' | 'h2' | 'h3'
  return (
    <div
      className={cx(
        'cui-heading',
        center && 'cui-heading--center',
        gradient && 'cui-heading--gradient',
        size === 'sm' && 'cui-heading--sm',
        className,
      )}
      {...rest}
    >
      {kicker ? <span className="cui-heading__kicker">{kicker}</span> : null}
      <Heading className="cui-heading__title">{title}</Heading>
      {subtitle ? <p className="cui-heading__subtitle">{subtitle}</p> : null}
    </div>
  )
}
