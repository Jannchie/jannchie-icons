import { rounded } from '../geometry'
import { dot } from '../scene'

// 填字游戏：方框 + 格线 + 两个涂黑的格子 + 一个题号点
export default ({ radius }) => [
  // 框 18×18 居中，每格宽 6
  rounded([[3, 3], [21, 3], [21, 21], [3, 21]], Math.min(radius, 1.5)),
  'M9 3V21',
  'M15 3V21',
  'M3 9H21',
  'M3 15H21',
  { d: 'M10.5 4.5H13.5V7.5H10.5Z', fill: true },
  { d: 'M4.5 16.5H7.5V19.5H4.5Z', fill: true },
  dot(16.75, 10.75, 1.5),
]
