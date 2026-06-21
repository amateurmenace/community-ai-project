import * as React from 'react'
import { cx } from './util'

export type CardElevation = 'default' | 'hard' | 'soft' | 'flat'
export type CardPadding = 'sm' | 'md' | 'lg'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Hover lift + lime offset shadow. @default false */
  interactive?: boolean
  /**
   * Shadow treatment. `default` is the 8px green offset; `hard` is the heavier
   * 15px offset with a 3px border; `soft` is a diffuse drop shadow with a sky
   * border; `flat` removes the shadow. @default 'default'
   */
  elevation?: CardElevation
  /** Inner padding. @default 'md' */
  padding?: CardPadding
}

/**
 * Brutalist surface: a white panel with a green border and a hard offset shadow.
 * The building block for the project, mission, and builder cards. Composes as a
 * flex column, so an action pinned with `margin-top:auto` sits at the bottom.
 */
export function Card({
  interactive = false,
  elevation = 'default',
  padding = 'md',
  className,
  children,
  ...rest
}: CardProps) {
  return (
    <div
      className={cx(
        'cui-card',
        interactive && 'cui-card--interactive',
        elevation !== 'default' && `cui-card--${elevation}`,
        padding !== 'md' && `cui-card--pad-${padding}`,
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  )
}
