import { rounded } from '../geometry'
import { doorway, GROUND, groundLine, opening } from '../scene'
import { knock, solid } from '../solid'

// 餐厅：檐口出挑的平顶楼（同 post-office：檐口 3.5–20.5 × 5.5，墙 4.5 / 19.5），墙上挂一副刀叉，门在下面正中。
// 刀叉照 utensils 的造法缩小：左边三齿叉（齿在 7.5 / 9.5 / 11.5，叉柄 9.5），右边单刃餐刀（刀背 16.5），柄都停在 14，
// 门（3 宽、顶在 16）夹在叉柄和刀柄之间。刀叉是记号
const sign = [
  'M7.5 8V10C7.5 11 8.25 11.75 9.5 11.75C10.75 11.75 11.5 11 11.5 10V8',
  'M9.5 8V14',
  'M16.5 14V8C15 9 14.5 10.5 14.5 12.5H16.5',
]

export default ({ radius }) => [
  groundLine,
  'M3.5 5.5H20.5',
  `M4.5 5.5V${GROUND}`,
  `M19.5 5.5V${GROUND}`,
  ...sign,
  rounded(opening(12, 3, 4), radius, false),
]

// 实心：楼身一块，刀叉挖空，门挖空；檐口和地平线照旧是线
export const fill = ({ radius, stroke }) => [
  solid(`M4.5 5.5H19.5V${GROUND}H4.5Z`),
  knock(sign),
  doorway(12, 3, 4, radius, stroke),
  'M3.5 5.5H20.5',
  groundLine,
]
