import * as React from 'react'
import { cx } from './util'
import { Card } from './Card'
import { IconBox } from './IconBox'
import { Tag } from './Tag'

export interface ProjectCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Project name. */
  title: string
  /** One-line description of what the project does. */
  description: string
  /** Icon node rendered in the lime IconBox at the top-left. */
  icon?: React.ReactNode
  /** Status badges, top-right (e.g. one or more Badge elements). */
  badges?: React.ReactNode
  /** Tech stack — plain strings become Tag chips; pass Tag nodes for custom tones. */
  tags?: Array<string | React.ReactNode>
  /** Action pinned to the bottom of the card, e.g. a "Launch" Button. */
  action?: React.ReactNode
  /** Hover lift. @default true */
  interactive?: boolean
}

/**
 * The flagship card on the site: a brutalist surface composing an IconBox,
 * status badges, title, description, a row of tech Tags, and a bottom-pinned
 * action. Mirrors one entry of the projects grid.
 */
export function ProjectCard({
  title,
  description,
  icon,
  badges,
  tags,
  action,
  interactive = true,
  className,
  ...rest
}: ProjectCardProps) {
  return (
    <Card interactive={interactive} className={cx('cui-project-card', className)} {...rest}>
      <div className="cui-project-card__head">
        {icon ? <IconBox>{icon}</IconBox> : <span />}
        {badges ? <div className="cui-project-card__badges">{badges}</div> : null}
      </div>
      <h3 className="cui-project-card__title">{title}</h3>
      <p className="cui-project-card__desc">{description}</p>
      {tags && tags.length > 0 ? (
        <div className="cui-project-card__tags">
          {tags.map((t, i) =>
            typeof t === 'string' ? <Tag key={i}>{t}</Tag> : <React.Fragment key={i}>{t}</React.Fragment>,
          )}
        </div>
      ) : null}
      {action ? <div className="cui-project-card__action">{action}</div> : null}
    </Card>
  )
}
