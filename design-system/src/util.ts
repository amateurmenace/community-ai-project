export type ClassValue = string | false | null | undefined

/** Tiny classNames joiner — keeps the component bodies readable. */
export function cx(...parts: ClassValue[]): string {
  return parts.filter(Boolean).join(' ')
}
