import { rounded } from '../geometry'
import { LABEL, line, snap } from '../letters'

// TypeScript：方块 + 右下角的 TS（标志里字母靠右下）
// 字母用切角标签字形、细线，4.2 宽 × 7.2 高、字距 2.5，右边离框 3、下边离框 2.5（吸附网格后）
export default ({ radius }) => [
  rounded([[3.5, 3.5], [20.5, 3.5], [20.5, 20.5], [3.5, 20.5]], Math.min(radius, 2.5)),
  ...snap(line('TS', [12.5, 14], 1.2, 2.5, 1.2, LABEL)).map(d => ({ d, thin: true })),
]
