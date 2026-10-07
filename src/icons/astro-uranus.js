import { circle } from '../geometry'
import { dot } from '../scene'
import { crisp, rounded } from '../geometry'

// 天王星 ⛢：下方的圆（圆心一点）+ 从圆顶向上的箭头
// 竖笔在 11.5，圆跟着左移，半径 6 让圆的上下左右边也落在 .5 上
export default ({ radius }) => [
  circle(11.5, 14.5, 6),
  dot(11.5, 14.5, 2.5),
  'M11.5 8.5V3',
  rounded([[9, 5.5], [11.5, 3], [14, 5.5]], crisp(radius), false),
]
