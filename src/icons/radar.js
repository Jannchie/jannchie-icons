import { circle, crisp, rounded } from '../geometry'
import { dot } from '../scene'

// 雷达：外圈 + 内圈 + 扫描线 + 两个光点
export default ({ radius, stroke }) => [
  circle(12, 12, 9),
  circle(12, 12, 5),
  'M12 12L18.36 5.64',
  dot(8, 9),
  dot(15.5, 15),
]
