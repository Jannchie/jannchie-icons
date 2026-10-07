import { rounded } from '../geometry'
import { GROUND, groundLine } from '../scene'

// 加油站（油泵）：泵身 4.5–14.5 × 3.5–20.5 立在地平线上，上部一块显示窗（6.5–12.5 × 5.5–9.5，闭合）；
// 油枪的管子从泵身右侧垂直伸出，往下绕到右边的挂钩（19.5），再竖直往上
export default ({ radius }) => [
  groundLine,
  rounded([[4.5, GROUND], [4.5, 3.5], [14.5, 3.5], [14.5, GROUND]], Math.min(radius, 1.5), false),
  rounded([[6.5, 5.5], [12.5, 5.5], [12.5, 9.5], [6.5, 9.5]], Math.min(radius, 1)),
  rounded([[14.5, 11.5], [16.5, 11.5], [16.5, 16.5], [19.5, 16.5], [19.5, 7.5], [17.5, 5.5]], Math.min(radius, 1.5), false),
]
