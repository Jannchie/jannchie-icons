import { crisp, rounded } from '../geometry'
import { arrow } from '../media'

// 从回收站恢复：垃圾桶 + 桶里向上的箭头（竖线落在 .5 上，偏左半格）
export default ({ radius }) => [
  'M4 6.5H20',
  rounded([[9.5, 6.5], [9.5, 3.5], [14.5, 3.5], [14.5, 6.5]], Math.min(radius, 1), false),
  rounded([[6.5, 6.5], [6.5, 20.5], [17.5, 20.5], [17.5, 6.5]], Math.min(radius, 2.5), false),
  'M11.5 17.5V11',
  rounded(arrow(11.5, 11, 'up', 2.5), crisp(radius), false),
]
