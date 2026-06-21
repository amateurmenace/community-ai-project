import * as React from 'react'
import { cx } from './util'

export type ButtonVariant = 'primary' | 'secondary' | 'special' | 'ghost' | 'brutal'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Visual style. `secondary` (default) is the outline pill used across the nav;
   * `primary` and `special` are filled green; `ghost` is the dark terminal button;
   * `brutal` is the squared button with a hard offset shadow that presses down on click.
   * @default 'secondary'
   */
  variant?: ButtonVariant
  /** Size scale. @default 'md' */
  size?: ButtonSize
  /** Pill shape (50px radius). Set false for a squared 12px-radius button. Ignored by `brutal`. @default true */
  pill?: boolean
  /** Stretch to fill the container width. */
  block?: boolean
  /** UPPERCASE the label with wide tracking — matches the large call-to-action buttons. */
  uppercase?: boolean
  /** Optional leading icon node (e.g. a Lucide SVG). */
  icon?: React.ReactNode
}

/**
 * Primary action control. Pill-shaped by default with the signature hover-invert
 * (fills green and lifts up). Renders a native `<button>` and forwards all button props.
 */
export function Button({
  variant = 'secondary',
  size = 'md',
  pill = true,
  block = false,
  uppercase = false,
  icon,
  className,
  children,
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cx(
        'cui-btn',
        `cui-btn--${variant}`,
        `cui-btn--${size}`,
        !pill && variant !== 'brutal' && 'cui-btn--square',
        block && 'cui-btn--block',
        uppercase && 'cui-btn--uppercase',
        className,
      )}
      {...rest}
    >
      {icon ? <span className="cui-btn__icon">{icon}</span> : null}
      {children}
    </button>
  )
}
