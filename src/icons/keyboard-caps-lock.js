import { rounded } from '../geometry'
import { knock, solid } from '../solid'
import { shiftArrow } from './keyboard-shift'

// 大写锁定 ⇪：缩短的 Shift 箭头，下面一块横条
export default ({ radius }) => [
  shiftArrow(3, 11.5, 16.5, radius),
  rounded([[8.5, 18.5], [15.5, 18.5], [15.5, 20.5], [8.5, 20.5]], Math.min(radius, 0.5)),
]

// 实心：箭头、横条各一块；中间挖开一道缝（粗字重下两者的墨迹正好碰上，不挖会粘成一块）
export const fill = ({ radius }) => [
  solid(shiftArrow(3, 11.5, 16.5, radius)),
  solid(rounded([[8.5, 18.5], [15.5, 18.5], [15.5, 20.5], [8.5, 20.5]], Math.min(radius, 0.5))),
  knock('M8 17.5H16'),
]
