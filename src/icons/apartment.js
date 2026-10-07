import { rounded } from '../geometry'
import { dot, GROUND, groundLine, opening } from '../scene'

// 公寓楼：宽矮的平顶楼，檐口出挑，三层窗点每层四扇，门居中（门上方那层只留两侧的窗）
const columns = [7, 10, 14, 17]

export default ({ radius }) => [
  groundLine,
  'M3.5 5.5H20.5',
  `M4.5 5.5V${GROUND}`,
  `M19.5 5.5V${GROUND}`,
  ...[8.5, 11.5].flatMap(y => columns.map(x => dot(x, y))),
  dot(7, 14.5),
  dot(17, 14.5),
  rounded(opening(12, 3, 4.5), radius, false),
]
