import { crisp, rounded } from '../geometry'
import { arrow } from '../media'

// 下载：开口朝上的托盘 + 向下插进托盘的箭头（整体右移半格）
export default ({ radius }) => [
  rounded([[4.5, 15], [4.5, 20.5], [20.5, 20.5], [20.5, 15]], Math.min(radius, 2), false),
  'M12.5 3.5V15',
  rounded(arrow(12.5, 15, 'down', 4.5), crisp(radius), false),
]
