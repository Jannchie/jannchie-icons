import { rounded } from '../geometry'
import { solid } from '../solid'

// 笔记本：屏幕 + 底座横线
export default ({ radius }) => [
  rounded([[5.5, 5.5], [18.5, 5.5], [18.5, 15.5], [5.5, 15.5]], Math.min(radius, 2)),
  'M2.5 18.5H21.5',
]

// 实心：屏幕一块，底座照旧是线
export const fill = ({ radius }) => [
  solid(rounded([[5.5, 5.5], [18.5, 5.5], [18.5, 15.5], [5.5, 15.5]], Math.min(radius, 2))),
  'M2.5 18.5H21.5',
]
