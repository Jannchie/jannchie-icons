import { crisp, rounded } from '../geometry'
import { GROUND, groundLine } from '../scene'

// 灯塔：向上收分的塔身、两道色环；顶上灯室加尖顶（塔尖不随全局圆角），两侧各两道光束；塔身的斜角不随全局圆角
const left = y => 8.5 + (GROUND - y) / 8 // 塔身左边线：每升 8 收 1
const right = y => 24 - left(y)

export default ({ radius }) => [
  groundLine,
  rounded([[left(GROUND), GROUND], [left(9.5), 9.5, crisp(radius)], [right(9.5), 9.5, crisp(radius)], [right(GROUND), GROUND]], radius, false),
  ...[12.5, 16.5].map(y => `M${left(y)} ${y}H${right(y)}`),
  rounded([[10.5, 9.5], [10.5, 6.5], [13.5, 6.5], [13.5, 9.5]], Math.min(radius, 1), false),
  rounded([[9.5, 6.5], [12, 3.5, crisp(radius)], [14.5, 6.5]], radius),
  'M8.5 7L5 6',
  'M8.5 9L5 10',
  'M15.5 7L19 6',
  'M15.5 9L19 10',
]
