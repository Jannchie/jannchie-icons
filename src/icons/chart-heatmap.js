import { rounded } from '../geometry'
import { dot } from '../scene'

// 热力图：3×3 网格，格子里的点大小代表数值强弱
export default ({ radius }) => [
  // 框 18×18 居中，每格宽 6
  rounded([[3, 3], [21, 3], [21, 21], [3, 21]], Math.min(radius, 2)),
  'M9 3V21',
  'M15 3V21',
  'M3 9H21',
  'M3 15H21',
  dot(6, 6, 3.5),
  dot(12, 6, 1.25),
  dot(18, 6, 2.5),
  dot(6, 12, 2.5),
  dot(12, 12, 3.5),
  dot(18, 12, 1.25),
  dot(6, 18, 1.25),
  dot(12, 18, 2.5),
  dot(18, 18, 3.5),
]
