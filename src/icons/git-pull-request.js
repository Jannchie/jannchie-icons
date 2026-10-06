import { circle, crisp, rounded } from '../geometry'
import { arrow } from '../media'

// 拉取请求：左侧主线连接上下节点；右下节点往上再折向左，末端 45° 箭头
export default ({ radius }) => [
  circle(6.5, 6, 2.5),
  circle(6.5, 18, 2.5),
  circle(17.5, 18, 2.5),
  'M6.5 8.5V15.5',
  rounded([[17.5, 15.5], [17.5, 6], [12.5, 6]], Math.min(radius, 2), false),
  rounded(arrow(12.5, 6, 'left', 2.5), crisp(radius), false),
]
