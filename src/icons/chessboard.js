import { rounded } from '../geometry'
import { dot } from '../scene'
import { hole, solid } from '../solid'

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

// 实心：真正的棋盘——方框一块，挖空白格（洞外扩半个线宽后边缘落在格线、外框的内缘），黑格（描边版放大点的格子）留成实心
export const fill = ({ radius, stroke }) => [
  solid(rounded([[3, 3], [21, 3], [21, 21], [3, 21]], Math.min(radius, 2))),
  hole([[12, 6], [6, 12], [18, 12], [12, 18]].map(([x, y]) => {
    const e = 3 - stroke
    return `M${x - e} ${y - e}H${x + e}V${y + e}H${x - e}Z`
  })),
]
