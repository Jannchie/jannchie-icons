import type { Icon, Radius, Role, Theme, Weight } from '@jannchie/icons'
import type { Context, ForwardRefExoticComponent, ReactElement, ReactNode, RefAttributes, SVGProps } from 'react'

export type IconColors = Partial<Record<'primary' | Role, string>>

/** Defaults for every JIcon in a subtree; props on a JIcon override them */
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

type OwnKeys = keyof IconDefaults | 'icon' | 'title' | 'ref'

export interface JIconProps extends IconDefaults, Omit<SVGProps<SVGSVGElement>, OwnKeys> {
  /** An icon object such as IconHeart from @jannchie/icons */
  icon: Icon<string>
  /** Accessible name: adds role="img" and a <title>; without it the icon gets aria-hidden="true" */
  title?: string
}

/** Renders an icon from @jannchie/icons as an inline <svg>; other props (className, style, onClick, aria-*) go to the <svg> */
export declare const JIcon: ForwardRefExoticComponent<JIconProps & RefAttributes<SVGSVGElement>>
export default JIcon

export interface IconProviderProps extends IconDefaults {
  children?: ReactNode
}
/** Sets defaults for every JIcon below it; nested providers merge with outer ones */
export declare function IconProvider(props: IconProviderProps): ReactElement
/** The merged defaults (null outside any IconProvider) */
export declare const IconContext: Context<IconDefaults | null>
