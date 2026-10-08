import { crisp, rounded } from '../geometry'
import { eaves } from '../roofs'
import { dot, GROUND, groundLine } from '../scene'

// 天守阁：向上收分的石垣，上面两层飞檐，屋脊两端的鯱上翘；石垣的斜角不随全局圆角
const cx = 12

export default ({ radius }) => [
  groundLine,
  rounded([[cx - 8, GROUND], [cx - 6, 15.5, crisp(radius)], [cx + 6, 15.5, crisp(radius)], [cx + 8, GROUND]], radius, false),
  `M${cx - 5} 15.5V12.5`,
  `M${cx + 5} 15.5V12.5`,
  dot(cx - 2.5, 14),
  dot(cx + 2.5, 14),
  eaves(cx, 9.5, 12.5, 3, 6, radius),
  `M${cx - 3} 9.5V7.5`,
  `M${cx + 3} 9.5V7.5`,
  eaves(cx, 4.5, 7.5, 1, 4.5, radius),
  `M${cx - 1} 4.5L${cx - 1.5} 3`,
  `M${cx + 1} 4.5L${cx + 1.5} 3`,
]
