import * as React from 'react'
import { cx } from './util'

export type TagTone = 'light' | 'dark' | 'muted'

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** `light` for cream/white surfaces, `dark` for the terminal surface, `muted` for low emphasis. @default 'light' */
  tone?: TagTone
}

/** Monospace tech chip — for stack labels like "React", "Whisper", or "RAG". */
export function Tag({ tone = 'light', className, children, ...rest }: TagProps) {
  return (
    <span className={cx('cui-tag', `cui-tag--${tone}`, className)} {...rest}>
      {children}
    </span>
  )
}
