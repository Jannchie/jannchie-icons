import { rounded } from '../geometry'
import { spans, tile } from '../solid'

// 书桌（正面）：桌面一条横线（2.5–21.5 在 8.5）；左边一条桌腿落到地面，右边是抽屉柜（13.5–19.5，从桌面落到 20.5，
// 柜顶就是桌面那条线），柜体用两道横线分成三格抽屉（12.5 / 16.5，间距 4）
const top = 'M2.5 8.5H21.5'
const leg = 'M4.5 8.5V20.5'
const drawers = [12.5, 16.5]

export default ({ radius }) => [
  top,
  leg,
  rounded([[13.5, 8.5], [13.5, 20.5], [19.5, 20.5], [19.5, 8.5]], Math.min(radius, 1), false),
  ...drawers.map(y => `M13.5 ${y}H19.5`),
]

// 实心：三格抽屉各一块（见 solid.js 的 tile），块和块之间留 GAP 的缝，每块四个角都收圆；最上一格顶着桌面，
// 桌面和桌腿照旧是线
export const fill = ({ radius, stroke }) => {
  const h = stroke / 2
  const k = Math.min(radius, 1)
  return [
    ...spans(8.5, 20.5, drawers, stroke).map(([y0, y1]) => tile([13.5 - h, y0, 19.5 + h, y1], k)),
    top,
    leg,
  ]
}
