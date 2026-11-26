import { rounded } from '../geometry'
import { eye } from '../scene'
import { knock, solid } from '../solid'

// 手风琴（正面）：左右两块竖长的琴板（3.5–7.5 / 16.5–20.5 × 4.5–19.5）+ 中间的风箱：上下两道锯齿边
// （从琴板内边的上 / 下角出发，在 9 / 12 / 15 收进去，在 10.5 / 13.5 顶出来）+ 两道竖折线连起上下顶出来的尖（x 10.5 / 13.5）；
// 两块琴板上各三个按钮。靠"两块板夹着一段锯齿风箱"认出来
const left = radius => rounded([[3.5, 4.5], [7.5, 4.5], [7.5, 19.5], [3.5, 19.5]], Math.min(radius, 1.5))
const right = radius => rounded([[16.5, 4.5], [20.5, 4.5], [20.5, 19.5], [16.5, 19.5]], Math.min(radius, 1.5))
const bellows = [
  'M7.5 5.5L9 7L10.5 5.5L12 7L13.5 5.5L15 7L16.5 5.5',
  'M7.5 18.5L9 17L10.5 18.5L12 17L13.5 18.5L15 17L16.5 18.5',
  'M10.5 5.5V18.5',
  'M13.5 5.5V18.5',
]
// 按钮按 eye 画（粗字重下不长大，宽 4 的琴板里才留得出缝）
const buttons = [5.5, 18.5].flatMap(x => [9, 12, 15].map(y => eye(x, y, 1.5)))

export default ({ radius }) => [left(radius), right(radius), ...bellows, ...buttons]

// 实心：两块琴板填实，按钮挖成圆孔；风箱照旧是线
export const fill = ({ radius }) => [
  solid([left(radius), right(radius)]),
  knock(buttons),
  ...bellows,
]
