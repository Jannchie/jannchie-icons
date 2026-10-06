import { circle, rounded } from '../geometry'
import { dot } from '../scene'

// 麻将牌（一筒）：竖长圆角牌 + 底部表示牌厚的横线 + 中间的筒子（圆 + 圆心）
export default ({ radius }) => [
  rounded([[6, 2.5], [18, 2.5], [18, 21.5], [6, 21.5]], Math.min(radius, 2)),
  'M6 18.5H18',
  circle(12, 10.5, 3.75),
  dot(12, 10.5),
]
