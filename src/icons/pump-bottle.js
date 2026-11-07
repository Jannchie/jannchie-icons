import { GAP } from '../clearance'
import { rounded } from '../geometry'
import { knock, solid, tile } from '../solid'

// 按压瓶（洗手液、洗发水）：瓶身（5.5–17.5 × 10.5–20.5）+ 瓶肩到瓶颈（9.5–13.5，7.5 → 10.5）；
// 泵杆从瓶颈正中（x 11.5）升到 3.5，泵头往右伸出，出液口向下弯到 5.5（离瓶颈右上角斜向 2.8）；瓶身上一条标签线
const stem = 'M11.5 7.5V3.5'
const head = radius => rounded([[8.5, 3.5], [16.5, 3.5], [16.5, 5.5]], Math.min(radius, 1), false)
const label = 'M8.5 15.5H14.5'

export default ({ radius }) => [
  rounded([[9.5, 10.5], [5.5, 10.5], [5.5, 20.5], [17.5, 20.5], [17.5, 10.5], [13.5, 10.5]], Math.min(radius, 2), false),
  rounded([[9.5, 10.5], [9.5, 7.5], [13.5, 7.5], [13.5, 10.5]], Math.min(radius, 0.5), false),
  stem,
  head(radius),
  label,
]

// 实心：瓶身一块，标签线挖空；瓶颈（泵的旋盖）单独一块（见 solid.js 的 tile），底边往上收，和瓶身之间留 GAP 的缝，
// 顶边和左右边和描边版的墨迹一致；泵杆、泵头照旧是线
export const fill = ({ radius, stroke, sharp }) => {
  const h = stroke / 2
  return [
    solid(rounded([[5.5, 10.5], [5.5, 20.5], [17.5, 20.5], [17.5, 10.5]], Math.min(radius, 2))),
    knock(label),
    tile([9.5 - h, 7.5 - h, 13.5 + h, 10.5 - h - GAP], sharp ? 0 : Math.min(radius, 0.5) + h),
    stem,
    head(radius),
  ]
}
