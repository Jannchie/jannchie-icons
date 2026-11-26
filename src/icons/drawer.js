import { rounded } from '../geometry'
import { knock, spans, tile } from '../solid'

// 抽屉柜（斗柜，正面）：柜体（3.5–20.5 × 3.5–18.5）+ 两道横线分成三格等高的抽屉（8.5 / 13.5，间距 5）+ 每格正中一根横拉手（10–14）
// + 两条短腿落到 20.5。横向分格 + 每格一根拉手是抽屉柜的记号，和竖开门的衣柜、只有一边抽屉的书桌区分开
// 拉手在每格正中（y 6 / 11 / 16），不在 .5 上：格高 5，放到 .5 上会贴着一侧分隔线，粗字重下糊掉
const drawers = [8.5, 13.5]
const pulls = ['M10 6H14', 'M10 11H14', 'M10 16H14']
const legs = ['M5.5 18.5V20.5', 'M18.5 18.5V20.5']

export default ({ radius }) => [
  rounded([[3.5, 3.5], [20.5, 3.5], [20.5, 18.5], [3.5, 18.5]], Math.min(radius, 1.5)),
  ...drawers.map(y => `M3.5 ${y}H20.5`),
  ...pulls,
  ...legs,
]

// 实心：三格抽屉各一块（见 solid.js 的 tile），块和块之间留 GAP 的缝，每块四个角都收圆；拉手挖空，腿照旧是线
export const fill = ({ radius, stroke }) => {
  const h = stroke / 2
  return [
    ...spans(3.5, 18.5, drawers, stroke).map(([y0, y1]) => tile([3.5 - h, y0, 20.5 + h, y1], Math.min(radius, 1.5))),
    knock(pulls),
    ...legs,
  ]
}
