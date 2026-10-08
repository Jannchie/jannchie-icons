import { crisp, rounded } from '../geometry'
import { arrow } from '../media'

// 上传：开口朝上的托盘 + 从托盘往上伸出的箭头
export default ({ radius }) => [
  rounded([[4, 15], [4, 20.5], [20, 20.5], [20, 15]], Math.min(radius, 2), false),
  'M12 15V3.5',
  rounded(arrow(12, 3.5, 'up', 4.5), crisp(radius), false),
]
