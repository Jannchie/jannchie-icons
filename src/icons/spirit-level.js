import { rounded } from '../geometry'
import { dot } from '../scene'

// 水平仪（拉直）：横放的长条外框，外缘固定在 2–22 × 7–17，线宽加粗往里长；
// 正中的水泡窗用两道竖线隔出（x = 8.5 / 15.5，粗体下离气泡点也留够间隙，上下接在外框上）+ 窗里一个气泡点
export default ({ radius, stroke }) => {
  const h = stroke / 2
  return [
    rounded([[2 + h, 7 + h], [22 - h, 7 + h], [22 - h, 17 - h], [2 + h, 17 - h]], Math.min(radius, 2)),
    `M8.5 ${7 + h}V${17 - h}`,
    `M15.5 ${7 + h}V${17 - h}`,
    dot(12, 12),
  ]
}
