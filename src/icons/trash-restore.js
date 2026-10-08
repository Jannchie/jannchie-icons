import { crisp, rounded } from '../geometry'
import { arrow } from '../media'
import { trash } from '../trash'

// 从回收站恢复：垃圾桶 + 桶里向上的箭头，竖线在桶身中线 x 12 上，从 17.5 到 10.5
export default ({ radius, stroke }) => [
  ...trash(radius, stroke),
  'M12 17.5V10.5',
  rounded(arrow(12, 10.5, 'up', 2.5), crisp(radius), false),
]
