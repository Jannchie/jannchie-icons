import { rounded } from '../geometry'
import { dot } from '../scene'

// 棋盘：方框 + 3×3 格线 + 交错格子里的大点
export default ({ radius }) => [
  // 框 18×18 居中，每格宽 6
  rounded([[3, 3], [21, 3], [21, 21], [3, 21]], Math.min(radius, 2)),
  'M9 3V21',
  'M15 3V21',
  'M3 9H21',
  'M3 15H21',
  ...[[6, 6], [18, 6], [12, 12], [6, 18], [18, 18]].map(([x, y]) => dot(x, y, 3.5)),
]
