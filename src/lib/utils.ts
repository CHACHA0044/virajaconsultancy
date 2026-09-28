export type ClassValue = string | false | null | undefined

/** Minimal class joiner — avoids pulling in clsx/tailwind-merge for our needs. */
export function cn(...parts: ClassValue[]): string {
  let out = ''
  for (const part of parts) {
    if (!part) continue
    out = out ? `${out} ${part}` : part
  }
  return out
}
