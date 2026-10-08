import { eaves } from '../roofs'
import { GROUND, groundLine } from '../scene'

// 塔（五重塔的简化）：三层飞檐，自下而上收窄，每层之间露一小段塔身，顶上相轮
const cx = 12

export default ({ radius }) => [
  groundLine,
  `M${cx} 2.5V5.5`,
  eaves(cx, 5.5, 8.5, 1, 4, radius),
  `M${cx - 2} 8.5V10.5`,
  `M${cx + 2} 8.5V10.5`,
  eaves(cx, 10.5, 13.5, 2, 5, radius),
  `M${cx - 3} 13.5V15.5`,
  `M${cx + 3} 13.5V15.5`,
  eaves(cx, 15.5, 18.5, 3, 7, radius),
  `M${cx - 4} 18.5V${GROUND}`,
  `M${cx + 4} 18.5V${GROUND}`,
]
