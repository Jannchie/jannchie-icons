import { circle, crisp, rounded } from '../geometry'
import { arrow } from '../media'

// 回到顶部：顶部横线 + 向上的箭头；竖线落在 .5 上，整体偏左半格
export default ({ radius, stroke }) => [
  'M4.5 3.5H18.5',
  'M11.5 20.5V8',
  rounded(arrow(11.5, 8, 'up', 3.5), crisp(radius), false),
]
