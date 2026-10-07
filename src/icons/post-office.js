import { rounded } from '../geometry'
import { GROUND, groundLine, opening } from '../scene'

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
