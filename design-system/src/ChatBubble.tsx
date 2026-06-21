import * as React from 'react'
import { cx } from './util'

export type ChatRole = 'ai' | 'user'

export interface ChatBubbleProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Who is speaking. `ai` is the left-aligned grey bubble, `user` the right-aligned blue. @default 'ai' */
  from?: ChatRole
}

/** A single chat message bubble, as used in the assistant demo window. */
export function ChatBubble({ from = 'ai', className, children, ...rest }: ChatBubbleProps) {
  return (
    <div className={cx('cui-bubble', `cui-bubble--${from}`, className)} {...rest}>
      {children}
    </div>
  )
}
