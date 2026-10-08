import { crisp, rounded } from '../geometry'
import { arrow } from '../media'

// 从回收站恢复：垃圾桶 + 桶里向上的箭头，箭头竖线在桶身中线 x 12 上（不为对齐像素偏半格：居中比线宽 1 时的清晰更重要）
export default ({ radius }) => [
  'M4 6.5H20',
  rounded([[9.5, 6.5], [9.5, 3.5], [14.5, 3.5], [14.5, 6.5]], Math.min(radius, 1), false),
  rounded([[6.5, 6.5], [6.5, 20.5], [17.5, 20.5], [17.5, 6.5]], Math.min(radius, 2.5), false),
  'M12 17.5V11',
  rounded(arrow(12, 11, 'up', 2.5), crisp(radius), false),
]
