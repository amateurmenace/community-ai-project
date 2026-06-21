import * as React from 'react'
import { cx } from './util'

export type BadgeTone = 'lime' | 'sky' | 'purple' | 'neutral'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Color tone. @default 'lime' */
  tone?: BadgeTone
  /** Show a small leading status dot in the current text color. */
  dot?: boolean
}

/**
 * Small uppercase status pill — e.g. "Beta", "Live", "New". Lime with a green
 * border by default; `sky` and `purple` tones match the secondary sections.
 */
export function Badge({ tone = 'lime', dot = false, className, children, ...rest }: BadgeProps) {
  return (
    <span className={cx('cui-badge', `cui-badge--${tone}`, className)} {...rest}>
      {dot ? <span className="cui-badge__dot" /> : null}
      {children}
    </span>
  )
}
