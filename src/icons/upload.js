import { crisp, rounded } from '../geometry'
import { arrow } from '../media'

// 上传：开口朝上的托盘 + 从托盘往上伸出的箭头；横竖线落在 .5 上，整体偏左半格
export default ({ radius }) => [
  rounded([[3.5, 15], [3.5, 20.5], [19.5, 20.5], [19.5, 15]], Math.min(radius, 2), false),
  'M11.5 15V3.5',
  rounded(arrow(11.5, 3.5, 'up', 4.5), crisp(radius), false),
]
