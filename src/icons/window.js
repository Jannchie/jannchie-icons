import { rounded } from '../geometry'
import { dot } from '../scene'

// 窗口：外框 + 标题栏分隔线 + 三个小圆点
export default ({ radius }) => [
  rounded([[3.5, 4.5], [20.5, 4.5], [20.5, 19.5], [3.5, 19.5]], Math.min(radius, 2.5)),
  'M3.5 8.5H20.5',
  ...[6, 8.5, 11].map(x => dot(x, 6.5, 1.5)),
]
