import { rounded } from '../geometry'
import { dot } from '../scene'

// 填字游戏：方框 + 格线 + 两个涂黑的格子 + 一个题号点
export default ({ radius }) => [
  // 3×3 等宽格子要让所有线落在 .5 上，只能整体错开半格：右移、上移各 0.5
  rounded([[3.5, 2.5], [21.5, 2.5], [21.5, 20.5], [3.5, 20.5]], Math.min(radius, 1.5)),
  'M9.5 2.5V20.5',
  'M15.5 2.5V20.5',
  'M3.5 8.5H21.5',
  'M3.5 14.5H21.5',
  { d: 'M11 4H14V7H11Z', fill: true },
  { d: 'M5 16H8V19H5Z', fill: true },
  dot(17.25, 10.25, 1.5),
]
