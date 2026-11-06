import { rounded } from '../geometry'
import { dot } from '../scene'
import { hole, solid } from '../solid'

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

// 实心：外框一块，水泡窗挖成洞（洞外扩半个线宽后正好是描边版窗口里的空白），气泡点留在窗里
export const fill = ({ radius, stroke }) => {
  const h = stroke / 2
  const [l, r, t, b] = [8.5 + stroke, 15.5 - stroke, 7 + 3 * h, 17 - 3 * h]
  return [
    solid(rounded([[2 + h, 7 + h], [22 - h, 7 + h], [22 - h, 17 - h], [2 + h, 17 - h]], Math.min(radius, 2))),
    hole(`M${l} ${t}H${r}V${b}H${l}Z`),
    dot(12, 12),
  ]
}
