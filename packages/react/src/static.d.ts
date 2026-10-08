import type { StaticIcon } from '@jannchie/icons/static'
import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react'

export interface StaticJIconProps extends Omit<SVGProps<SVGSVGElement>, 'size' | 'title' | 'ref'> {
  /** A precomputed icon such as IconHeart from @jannchie/icons/static */
  icon: StaticIcon<string>
  /** Width and height: a number (px) or a CSS length such as '1em'. Defaults to 24 */
  size?: number | string
  /** Accessible name: adds role="img" and a <title>; without it the icon gets aria-hidden="true" */
  title?: string
}

/** Renders a precomputed icon (default style) as an inline <svg>; no hooks, so it also works in React Server Components */
export declare const JIcon: ForwardRefExoticComponent<StaticJIconProps & RefAttributes<SVGSVGElement>>
export default JIcon
