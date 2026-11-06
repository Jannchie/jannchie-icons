import { rounded } from '../geometry'
import { eaves } from '../roofs'
import { GROUND, groundLine, opening } from '../scene'
import { hole, solid } from '../solid'

// 寺院：一层宽大的飞檐屋顶，屋脊两端的鸱尾上翘；墙身和门居中
export default ({ radius }) => [
  groundLine,
  eaves(12, 5.5, 10.5, 3, 7.5, radius),
  'M9 5.5L8.5 4',
  'M15 5.5L15.5 4',
  `M6.5 10.5V${GROUND}`,
  `M17.5 10.5V${GROUND}`,
  rounded(opening(12, 5, 6.5), radius, false),
]

// 实心：屋顶和墙身连成一块，鸱尾照旧是线；门挖空（同 home：洞外扩半个线宽后正好是描边版门框的中心线），地平线最后画
export const fill = ({ radius, stroke }) => [
  solid([eaves(12, 5.5, 10.5, 3, 7.5, radius), rounded([[6.5, 10.5], [17.5, 10.5], [17.5, GROUND], [6.5, GROUND]], 0)]),
  'M9 5.5L8.5 4',
  'M15 5.5L15.5 4',
  hole(rounded(opening(12, 5 - stroke, 6.5 - stroke / 2), Math.max(0, radius - stroke / 2), false)),
  groundLine,
]
