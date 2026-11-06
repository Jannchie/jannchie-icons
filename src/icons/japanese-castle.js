import { crisp, rounded } from '../geometry'
import { eaves } from '../roofs'
import { dot, GROUND, groundLine } from '../scene'
import { knock, solid } from '../solid'

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

// 实心：石垣、两层墙身和飞檐填实，窗挖空；顶层檐口挖一道缝，屋顶不和下面糊成一块
// （下层檐口、石垣顶边不挖：中间那层墙只有 3 高，再挖两道缝窗户就和缝连在一起了）；鯱、地平线照旧是线
export const fill = ({ radius }) => [
  solid([
    rounded([[cx - 8, GROUND], [cx - 6, 15.5, crisp(radius)], [cx + 6, 15.5, crisp(radius)], [cx + 8, GROUND]], radius),
    rounded([[cx - 5, 12.5], [cx + 5, 12.5], [cx + 5, 15.5], [cx - 5, 15.5]], 0),
    eaves(cx, 9.5, 12.5, 3, 6, radius),
    rounded([[cx - 3, 7.5], [cx + 3, 7.5], [cx + 3, 9.5], [cx - 3, 9.5]], 0),
    eaves(cx, 4.5, 7.5, 1, 4.5, radius),
  ]),
  knock([dot(cx - 2.5, 14), dot(cx + 2.5, 14), `M${cx - 4.5} 7.5H${cx + 4.5}`]),
  `M${cx - 1} 4.5L${cx - 1.5} 3`,
  `M${cx + 1} 4.5L${cx + 1.5} 3`,
  groundLine,
]
