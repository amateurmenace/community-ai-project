import * as React from 'react'
import { cx } from './util'

export type IconBoxSize = 'sm' | 'md' | 'lg'
export type IconBoxTone = 'lime' | 'sky' | 'purple'

export interface IconBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Box size. @default 'md' */
  size?: IconBoxSize
  /** Fill tone. @default 'lime' */
  tone?: IconBoxTone
}

/**
 * The lime square that frames a single icon. The icon node (children) is scaled
 * to half the box. Used standalone or as the leading mark inside FeatureItem.
 */
export function IconBox({ size = 'md', tone = 'lime', className, children, ...rest }: IconBoxProps) {
  return (
    <div
      className={cx(
        'cui-icon-box',
        size !== 'md' && `cui-icon-box--${size}`,
        tone !== 'lime' && `cui-icon-box--${tone}`,
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  )
}
