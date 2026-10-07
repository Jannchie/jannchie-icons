import { rounded } from '../geometry'
import { GROUND, groundLine } from '../scene'

// 充电桩：桩身 4.5–14.5 × 3.5–20.5 立在地平线上，桩身中间一道闪电（闭合）；
// 充电线从桩身右侧垂直伸出，往下绕到右边的插头（19.5），再竖直往上——和 fuel 同一套外形
export default ({ radius }) => [
  groundLine,
  rounded([[4.5, GROUND], [4.5, 3.5], [14.5, 3.5], [14.5, GROUND]], Math.min(radius, 1.5), false),
  rounded([[10.5, 6], [7.5, 11.5], [10, 11.5], [9, 16], [12, 10.5], [9.5, 10.5]], Math.min(radius, 0.5)),
  rounded([[14.5, 11.5], [16.5, 11.5], [16.5, 16.5], [19.5, 16.5], [19.5, 7.5], [17.5, 5.5]], Math.min(radius, 1.5), false),
]
