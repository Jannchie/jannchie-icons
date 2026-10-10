import { rounded } from '../geometry'
import { sparkle } from '../symbols'
import { rotate } from '../transform'

// AI 擦除（去除杂物）：eraser 缩成 8 × 14、往左下挪（中心 (10, 14)），同样顺时针转 30°；
// 右上角一对 AI 星芒（同 languages-sparkle 的位置和缩放）
const [cx, cy] = [10, 14]
const turn = d => rotate(d, 30, [cx, cy])

export default ({ radius }) => [
  turn(rounded([[cx - 4, cy - 7], [cx + 4, cy - 7], [cx + 4, cy + 7], [cx - 4, cy + 7]], Math.min(radius, 2))),
  turn(`M${cx - 4} ${cy + 1.5}H${cx + 4}`),
  ...sparkle([18, 5.25], 0.9, radius),
]
