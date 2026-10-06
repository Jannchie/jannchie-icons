import { crisp, rounded } from '../geometry'
import { GROUND, groundLine, opening } from '../scene'

// 工厂：两段 30° 锯齿屋顶，门居中；锯齿的角不随全局圆角
const left = 5
const right = 19
const mid = (left + right) / 2
const low = 9 // 屋顶最高处约 5，和其他建筑同高
const high = low - (mid - left) * Math.tan(Math.PI / 6)

export default ({ radius }) => [
  groundLine,
  rounded([
    [left, GROUND],
    [left, low],
    [mid, high, crisp(radius)],
    [mid, low, crisp(radius)],
    [right, high, crisp(radius)],
    [right, GROUND],
  ], radius, false),
  rounded(opening(mid, 4.5, 6), radius, false),
]
