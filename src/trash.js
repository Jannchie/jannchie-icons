// 垃圾桶类图标共用：提手 + 桶盖 + 桶身（开口朝上）
// 墨迹框：上下 2–22（提手顶、桶底）、桶盖左右 3–21、桶身左右 5–19，都以画布中线对称；线宽变粗时外缘不动、往里长（见 docs/design.md）
// 桶盖中心线在 y 6；提手竖边 9.5 / 14.5，和中线对称
import { rounded } from './geometry'

export const LID = 6
export function trash(radius, stroke) {
  const h = stroke / 2
  return [
    `M${3 + h} ${LID}H${21 - h}`,
    rounded([[9.5, LID], [9.5, 2 + h], [14.5, 2 + h], [14.5, LID]], Math.min(radius, 1), false),
    rounded([[5 + h, LID], [5 + h, 22 - h], [19 - h, 22 - h], [19 - h, LID]], Math.min(radius, 2.5), false),
  ]
}
