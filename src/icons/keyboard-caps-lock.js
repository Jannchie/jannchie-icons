import { rounded } from '../geometry'
import { shiftArrow } from './keyboard-shift'

// 大写锁定 ⇪：缩短的 Shift 箭头，下面一块横条
export default ({ radius }) => [
  shiftArrow(3, 11.5, 16.5, radius),
  rounded([[8.5, 18.5], [15.5, 18.5], [15.5, 20.5], [8.5, 20.5]], Math.min(radius, 0.5)),
]
