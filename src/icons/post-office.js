import { rounded } from '../geometry'
import { GROUND, groundLine, opening } from '../scene'
import { hole, knock, solid } from '../solid'

// 邮局：平顶楼，檐口出挑，墙上挂一只信封，门在下面
export default ({ radius }) => [
  groundLine,
  'M3.5 6.5H20.5',
  `M4.5 6.5V${GROUND}`,
  `M19.5 6.5V${GROUND}`,
  rounded([[8.5, 8.5], [15.5, 8.5], [15.5, 13.5], [8.5, 13.5]], Math.min(radius, 1)),
  rounded([[8.5, 8.5], [12, 11], [15.5, 8.5]], radius, false),
  rounded(opening(12, 3, 4.5), radius, false),
]

// 实心：楼身一块，信封挖出轮廓和封口（信封留成实心），门挖空；檐口和地平线照旧是线
export const fill = ({ radius, stroke }) => [
  solid(`M4.5 6.5H19.5V${GROUND}H4.5Z`),
  knock([rounded([[8.5, 8.5], [15.5, 8.5], [15.5, 13.5], [8.5, 13.5]], Math.min(radius, 1)), rounded([[8.5, 8.5], [12, 11], [15.5, 8.5]], radius, false)]),
  hole(rounded(opening(12, 3 - stroke, 4.5 - stroke / 2), Math.max(0, radius - stroke / 2), false)),
  'M3.5 6.5H20.5',
  groundLine,
]
