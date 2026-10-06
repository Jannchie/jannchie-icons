import { circle } from '../geometry'
import { GROUND } from '../scene'

// 慢（蜗牛）：螺壳圆 + 3/4 圈螺旋，壳下是身体，左侧伸出头和两根触角；身体底边落在地平线 y = 20
// 螺壳半径 6.5，底部离身体底边 1，最高处约 5.5
const r = 6.5
const y = GROUND - 1 - r // 螺壳圆心
const neck = y + 0.25 // 脖子顶端
export default () => [
  circle(14, y, r),
  `M17.25 ${y}A3.25 3.25 0 1 0 14 ${y + 3.25}`,
  `M21.5 ${GROUND}H7.5A3 3 0 0 1 4.5 ${GROUND - 3}V${neck}`,
  `M4.5 ${neck}L3.25 ${neck - 3.25}`,
  `M4.5 ${neck}L5.5 ${neck - 3.5}`,
]
