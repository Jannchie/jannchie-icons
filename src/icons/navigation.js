import { crisp, rounded } from '../geometry'
import { rotate } from '../transform'

// 导航：带内凹尾缺的箭头（尖在上，尖 3、两翼 20、尾缺 16），整体顺时针转 45° 指向右上
// 尖不随全局圆角，两翼与尾缺的角圆角封顶 1
export default ({ radius }) => [
  rotate(rounded([[12, 3, crisp(radius)], [19, 20], [12, 16], [5, 20]], Math.min(radius, 1)), 45),
]
