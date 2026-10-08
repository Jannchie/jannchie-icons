import type { Icon, Radius, Role, Theme, Weight } from '@jannchie/icons'
import type { ComputedRef, DefineComponent, InjectionKey, MaybeRefOrGetter, Plugin } from 'vue'

export type IconColors = Partial<Record<'primary' | Role, string>>

/** App-wide or subtree-wide defaults for every JIcon below; props on a JIcon override them */
export interface IconDefaults {
  /** Width and height: a number (px) or a CSS length such as '1em'. Defaults to 24 */
  size?: number | string
  /** Corner radius: 'sharp', 0, 1, 2 or 3. Defaults to 2 */
  radius?: Radius
  /** Stroke weight: 'light', 'regular' or 'bold'. Defaults to 'regular' */
  weight?: Weight
  /** Color badges and strike-throughs by their meaning */
  duo?: boolean
  /** Light or dark recommended colors for duo */
  theme?: Theme
  /** Overrides for single roles or the main color (any CSS color, including var(--x)); merged role by role */
  colors?: IconColors
  /** Snap strokes to the device pixel grid when size is in px. Defaults to true */
  hinting?: boolean
}

export interface JIconProps extends IconDefaults {
  /** An icon object such as IconHeart from @jannchie/icons */
  icon: Icon<string>
  /** Accessible name: adds role="img" and a <title>; without it the icon gets aria-hidden="true" */
  title?: string
}

/** Renders an icon from @jannchie/icons as an inline <svg>. Class, style, attributes and listeners fall through to the <svg> */
export declare const JIcon: DefineComponent<JIconProps>
export default JIcon

/** Injection key of the merged defaults (a computed ref) */
export declare const ICON_DEFAULTS: InjectionKey<ComputedRef<IconDefaults>>
/** Provide defaults to the current component's subtree; merged with outer defaults. Accepts a plain object, ref, reactive object or getter */
export declare function provideIconDefaults(defaults: MaybeRefOrGetter<IconDefaults>): ComputedRef<IconDefaults>
/** app.use(JIconPlugin, { radius: 'sharp', weight: 'bold' }) sets defaults for the whole app */
export declare const JIconPlugin: Plugin<[defaults?: MaybeRefOrGetter<IconDefaults>]>
