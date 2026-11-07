import { GAP } from '../clearance'
import { rounded } from '../geometry'
import { tile } from '../solid'

// 榻榻米（四畳半，俯视）：外框 18 见方（2.5–20.5），按 6 格切成 3 × 3 个半叠；
// 四张整叠绕着正中的半叠转一圈（风车铺法）：每张整叠只画它和邻居之间的一条边——上叠的下边、右叠的左边、下叠的上边、左叠的右边
export default ({ radius }) => [
  rounded([[2.5, 2.5], [20.5, 2.5], [20.5, 20.5], [2.5, 20.5]], Math.min(radius, 1)),
  'M2.5 8.5H14.5',
  'M14.5 2.5V14.5',
  'M8.5 14.5H20.5',
  'M8.5 8.5V20.5',
]

// 实心：四张整叠 + 正中的半叠各画一块（见 solid.js 的 tile），接缝处留 GAP 的缝；外缘和描边版的墨迹一致。
// 半叠只有 6 见方，圆角最多 0.5（和 tetromino 一样）
const MATS = [[2.5, 2.5, 14.5, 8.5], [14.5, 2.5, 20.5, 14.5], [8.5, 14.5, 20.5, 20.5], [2.5, 8.5, 8.5, 20.5], [8.5, 8.5, 14.5, 14.5]]
export const fill = ({ radius, stroke }) => {
  // 碰到外框的边到外框的外缘，接缝处各让出半个 GAP
  const lo = v => (v === 2.5 ? v - stroke / 2 : v + GAP / 2)
  const hi = v => (v === 20.5 ? v + stroke / 2 : v - GAP / 2)
  return MATS.map(([x0, y0, x1, y1]) => tile([lo(x0), lo(y0), hi(x1), hi(y1)], Math.min(radius, 0.5)))
}
