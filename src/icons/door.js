import { rounded } from '../geometry'
import { dot, GROUND } from '../scene'
import { knock, solid } from '../solid'

// 门：落在地面上的门板（6.5–17.5 × 3.5–20.5，两条竖边落到地面线上）+ 右侧门把手（x 14，离门板右边 3.5）；地面线比门板两边各宽出 3
const ground = `M3.5 ${GROUND}H20.5`
const panel = [[6.5, GROUND, 0], [6.5, 3.5], [17.5, 3.5], [17.5, GROUND, 0]]
const knob = dot(14, 12.5)

export default ({ radius }) => [
  ground,
  rounded(panel, Math.min(radius, 1.5), false),
  knob,
]

// 实心：门板一块（底下两个角贴着地面线，不收圆角），门把手挖成圆点（尖角模式下也是圆的）；地面线照旧是线
export const fill = ({ radius }) => [
  solid(rounded(panel, Math.min(radius, 1.5))),
  knock({ ...knob, round: true }),
  ground,
]
