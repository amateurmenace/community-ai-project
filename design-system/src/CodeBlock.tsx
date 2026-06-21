import * as React from 'react'
import { cx } from './util'

export interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The code/text to render (monospace, whitespace preserved). Alternatively pass children. */
  code?: string
  /** Optional header label, e.g. a filename like `constitution.yaml`. */
  label?: string
}

/**
 * Purple monospace panel with a hard offset shadow — for code, config, or
 * constitution snippets. Pass plain text via `code`, or richer markup as children.
 */
export function CodeBlock({ code, label, className, children, ...rest }: CodeBlockProps) {
  return (
    <div className={cx('cui-code', className)} {...rest}>
      {label ? <span className="cui-code__label">{label}</span> : null}
      <pre className="cui-code__pre">{code ?? children}</pre>
    </div>
  )
}
