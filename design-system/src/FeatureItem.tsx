import * as React from 'react'
import { cx } from './util'
import { IconBox, type IconBoxTone } from './IconBox'

export interface FeatureItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Bold feature title. */
  title: string
  /** Supporting copy. Pass via this prop or as children. */
  description?: React.ReactNode
  /** Icon node rendered in the leading IconBox. */
  icon?: React.ReactNode
  /** IconBox tone. @default 'lime' */
  tone?: IconBoxTone
}

/**
 * A value/feature row: a lime IconBox beside a bold title and a line of body
 * copy. Used in the "what we believe" value list.
 */
export function FeatureItem({ title, description, icon, tone = 'lime', className, children, ...rest }: FeatureItemProps) {
  return (
    <div className={cx('cui-feature', className)} {...rest}>
      {icon ? <IconBox tone={tone}>{icon}</IconBox> : null}
      <div className="cui-feature__body">
        <h3 className="cui-feature__title">{title}</h3>
        <p className="cui-feature__text">{description ?? children}</p>
      </div>
    </div>
  )
}
