import { circle, rounded } from '../geometry'
import { dot } from '../scene'
import { knock, solid } from '../solid'

// 麻将牌（一筒）：竖长圆角牌 + 底部表示牌厚的横线 + 中间的筒子（圆 + 圆心）
export default ({ radius }) => [
  rounded([[6.5, 2.5], [17.5, 2.5], [17.5, 21.5], [6.5, 21.5]], Math.min(radius, 2)),
  'M6.5 18.5H17.5',
  circle(12, 10.5, 3.75),
  dot(12, 10.5),
]

// 实心：牌一块，挖掉牌厚线（两端各缩一个线宽，不把牌切开）、筒子的圆圈和圆心
export const fill = ({ radius, stroke }) => [
  solid(rounded([[6.5, 2.5], [17.5, 2.5], [17.5, 21.5], [6.5, 21.5]], Math.min(radius, 2))),
  knock([`M${6.5 + stroke} 18.5H${17.5 - stroke}`, circle(12, 10.5, 3.75), dot(12, 10.5)]),
]
