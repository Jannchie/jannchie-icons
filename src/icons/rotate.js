import { crisp, rounded } from '../geometry'
import { arrow } from '../media'

// 旋转：左下方块 + 上方 90° 圆弧箭头（顺时针）
export default ({ radius }) => [
  rounded([[3.5, 9.5], [13.5, 9.5], [13.5, 19.5], [3.5, 19.5]], Math.min(radius, 2)),
  'M9 5A9 9 0 0 1 18 14',
  rounded(arrow(18, 14, 'down', 2.5), crisp(radius), false),
]
