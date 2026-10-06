import { rounded } from '../geometry'
import { dot } from '../scene'

// 窗口：外框 + 标题栏分隔线 + 三个小圆点
export default ({ radius }) => [
  rounded([[3, 4], [21, 4], [21, 20], [3, 20]], Math.min(radius, 2.5)),
  'M3 8.5H21',
  ...[6, 8.5, 11].map(x => dot(x, 6.25, 1.5)),
]
