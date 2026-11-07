import { crisp, rounded } from '../geometry'
import { arrow } from '../media'
import { solid } from '../solid'

// 旋转：左下方块 + 上方 90° 圆弧箭头（顺时针）
export default ({ radius }) => [
  rounded([[3.5, 9.5], [13.5, 9.5], [13.5, 19.5], [3.5, 19.5]], Math.min(radius, 2)),
  'M9 5A9 9 0 0 1 18 14',
  rounded(arrow(18, 14, 'down', 2.5), crisp(radius), false),
]

// 实心：方块填实，圆弧箭头照旧是线；圆弧停在箭头尖往上半个线宽处（尖角模式下方头的箭杆顶到尖上，两角会从斜接的箭头尖两侧戳出来）
export const fill = ({ radius, stroke }) => [
  solid(rounded([[3.5, 9.5], [13.5, 9.5], [13.5, 19.5], [3.5, 19.5]], Math.min(radius, 2))),
  `M9 5A9 9 0 0 1 ${+(9 + Math.sqrt(81 - stroke * stroke / 4)).toFixed(3)} ${14 - stroke / 2}`,
  rounded(arrow(18, 14, 'down', 2.5), crisp(radius), false),
]
