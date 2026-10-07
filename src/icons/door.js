import { rounded } from '../geometry'
import { dot, GROUND } from '../scene'

// 门：落在地面上的门板（6.5–17.5 × 3.5–20.5，两条竖边落到地面线上）+ 右侧门把手（x 14，离门板右边 3.5）；地面线比门板两边各宽出 3
export default ({ radius }) => [
  `M3.5 ${GROUND}H20.5`,
  rounded([[6.5, GROUND], [6.5, 3.5], [17.5, 3.5], [17.5, GROUND]], Math.min(radius, 1.5), false),
  dot(14, 12.5),
]
