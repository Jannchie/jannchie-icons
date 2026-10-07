import { circle, rounded } from '../geometry'
import { dot } from '../scene'

// 麻将牌（一筒）：竖长圆角牌 + 底部表示牌厚的横线 + 中间的筒子（圆 + 圆心）
export default ({ radius }) => [
  rounded([[6.5, 2.5], [17.5, 2.5], [17.5, 21.5], [6.5, 21.5]], Math.min(radius, 2)),
  'M6.5 18.5H17.5',
  circle(12, 10.5, 3.75),
  dot(12, 10.5),
]
