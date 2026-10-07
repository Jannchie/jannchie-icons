import { circle, rounded } from '../geometry'
import { GROUND, groundLine, opening } from '../scene'

// 车站：拱形大棚，拱里一只钟；拱脚一道挑檐，两墙落地，正中大门
export default ({ radius }) => [
  groundLine,
  'M5 11.5A7 7 0 0 1 19 11.5',
  'M3.5 11.5H20.5',
  `M4.5 11.5V${GROUND}`,
  `M19.5 11.5V${GROUND}`,
  circle(12, 8, 1.75),
  { d: 'M12 6.75V8H13.25', detail: true },
  rounded(opening(12, 5, 5.5), radius, false),
]
