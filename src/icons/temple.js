import { rounded } from '../geometry'
import { eaves } from '../roofs'
import { GROUND, groundLine, opening } from '../scene'

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
