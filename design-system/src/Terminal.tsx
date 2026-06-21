import * as React from 'react'
import { cx } from './util'

export interface TerminalProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Title shown in the window bar. */
  title?: string
  /** Show the three traffic-light dots. @default true */
  dots?: boolean
  /** Append a blinking lime cursor after the body content. */
  cursor?: boolean
}

/**
 * Dark IDE / CLI surface with a title bar. Body content (children) renders in the
 * monospace terminal type. Wrap prompts in a `<span className="cui-terminal__prompt">`
 * for the lime accent color.
 */
export function Terminal({ title, dots = true, cursor = false, className, children, ...rest }: TerminalProps) {
  return (
    <div className={cx('cui-terminal', className)} {...rest}>
      {(dots || title) && (
        <div className="cui-terminal__bar">
          {dots ? (
            <>
              <span className="cui-terminal__dot cui-terminal__dot--r" />
              <span className="cui-terminal__dot cui-terminal__dot--y" />
              <span className="cui-terminal__dot cui-terminal__dot--g" />
            </>
          ) : null}
          {title ? <span className="cui-terminal__title">{title}</span> : null}
        </div>
      )}
      <div className="cui-terminal__body">
        {children}
        {cursor ? <span className="cui-terminal__cursor" /> : null}
      </div>
    </div>
  )
}
