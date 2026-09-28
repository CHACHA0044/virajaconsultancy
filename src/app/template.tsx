/**
 * Remounts on every route change, which replays the CSS entrance once per
 * navigation. No JavaScript, no layout shift, no animation library needed.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>
}
