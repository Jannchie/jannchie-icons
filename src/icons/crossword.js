import { rounded } from '../geometry'
import { dot } from '../scene'
import { hole, solid } from '../solid'

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

// 实心：方框一块，挖空白格（洞外扩半个线宽后边缘落在格线、外框的内缘），两个涂黑的格子整格留成实心，题号点放回白格里
export const fill = ({ radius, stroke }) => [
  solid(rounded([[3, 3], [21, 3], [21, 21], [3, 21]], Math.min(radius, 1.5))),
  hole([[6, 6], [18, 6], [6, 12], [12, 12], [18, 12], [12, 18], [18, 18]].map(([x, y]) => {
    const e = 3 - stroke
    return `M${x - e} ${y - e}H${x + e}V${y + e}H${x - e}Z`
  })),
  dot(16.75, 10.75, 1.5),
]
