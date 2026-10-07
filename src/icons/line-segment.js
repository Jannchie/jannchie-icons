import { circle } from '../geometry'

// 线段：左下到右上的对角线，两端各一个小圆端点（半径 2）；线从圆边起止，沿半径方向接上
const R = 2
const k = R * Math.SQRT1_2
export default () => [
  circle(5.5, 18.5, R),
  circle(18.5, 5.5, R),
  `M${5.5 + k} ${18.5 - k}L${18.5 - k} ${5.5 + k}`,
]
