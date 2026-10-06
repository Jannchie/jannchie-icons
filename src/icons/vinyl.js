import { circle, crisp, rounded } from '../geometry'
import { dot } from '../scene'

// 黑胶唱片：外圆 + 两圈纹路 + 中心标签
export default ({ radius, stroke }) => [
  circle(12, 12, 9),
  circle(12, 12, 6.5),
  circle(12, 12, 3),
  dot(12, 12),
]
