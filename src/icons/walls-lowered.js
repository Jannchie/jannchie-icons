import { crisp, rounded } from '../geometry'
import { arrow } from '../media'
import { spans, tile } from '../solid'

// 全部压低：所有墙都压到只剩一层砖（墙体 3.5–19.5 × 16.5–20.5，竖缝 7.5 / 15.5）；
// 上方两支向下的箭头对着两条竖缝（x 7.5 / 15.5，3.5 → 13.5，尖端离墙顶 3），表示所有墙一起往下压
export default ({ radius }) => [
  rounded([[3.5, 16.5], [19.5, 16.5], [19.5, 20.5], [3.5, 20.5]], Math.min(radius, 1)),
  'M7.5 16.5V20.5',
  'M15.5 16.5V20.5',
  ...[7.5, 15.5].flatMap(x => [`M${x} 3.5V13.5`, rounded(arrow(x, 13.5, 'down', 2.5), crisp(radius), false)]),
]

// 实心：三块砖各画一块（见 solid.js 的 tile），砖和砖之间留 GAP 的缝；砖高只有 4，圆角最多 0.5。箭头照旧是线；
// 箭杆停在箭头尖往上半个线宽处（尖角模式下方头的箭杆顶到尖上，两角会从斜接的箭头尖两侧戳出来）
export const fill = ({ radius, stroke }) => [
  ...spans(3.5, 19.5, [7.5, 15.5], stroke).map(([x0, x1]) => tile([x0, 16.5 - stroke / 2, x1, 20.5 + stroke / 2], Math.min(radius, 0.5))),
  ...[7.5, 15.5].flatMap(x => [`M${x} 3.5V${13.5 - stroke / 2}`, rounded(arrow(x, 13.5, 'down', 2.5), crisp(radius), false)]),
]
