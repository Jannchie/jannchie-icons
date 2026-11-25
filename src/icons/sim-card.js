import { rounded } from '../geometry'
import { knock, solid } from '../solid'

// SIM 卡：竖放的卡身（墨迹 4.5–19.5 × 3–21，宽度同 file 的纸张，线宽变粗往里长），右上角斜切掉 5；
// 卡面下半一块芯片触点（8.5–15.5 × 11.5–17.5，圆角方框 + 十字分成四格）
const card = (radius, stroke) => {
  const h = stroke / 2
  const [l, t, r, b] = [4.5 + h, 3 + h, 19.5 - h, 21 - h]
  return rounded([[l, t], [r - 5, t, Math.min(radius, 1)], [r, t + 5, Math.min(radius, 1)], [r, b], [l, b]], Math.min(radius, 2))
}
const chip = radius => [
  rounded([[8.5, 11.5], [15.5, 11.5], [15.5, 17.5], [8.5, 17.5]], Math.min(radius, 1)),
  'M12 11.5V17.5',
  'M8.5 14.5H15.5',
]

export default ({ radius, stroke }) => [card(radius, stroke), ...chip(radius)]

// 实心：卡身一块，芯片的外框和十字挖空，剩下四格实心的触点
export const fill = ({ radius, stroke }) => [solid(card(radius, stroke)), knock(chip(radius))]
