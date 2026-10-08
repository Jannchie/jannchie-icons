import type { StaticIcon } from '@jannchie/icons/static'
import type { DefineComponent } from 'vue'

export { ICON_DEFAULTS, IconColors, IconDefaults, JIconPlugin, provideIconDefaults } from './index.js'

export interface StaticJIconProps {
  /** A precomputed icon such as IconHeart from @jannchie/icons/static */
  icon: StaticIcon<string>
  /** Width and height: a number (px) or a CSS length such as '1em'. Defaults to the provided size, then 24 */
  size?: number | string
  /** Accessible name: adds role="img" and a <title>; without it the icon gets aria-hidden="true" */
  title?: string
}

/** Renders a precomputed icon (default style) as an inline <svg>; no drawing engine, no pixel hinting */
export declare const JIcon: DefineComponent<StaticJIconProps>
export default JIcon
