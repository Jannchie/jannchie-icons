import { rounded } from '../geometry'
import { dot, GROUND, groundLine, opening } from '../scene'

// 酒店：高楼，楼顶招牌上一个 H，下面一排窗点，门居中
export default ({ radius }) => [
  groundLine,
  rounded([[6.5, GROUND], [6.5, 3.5], [17.5, 3.5], [17.5, GROUND]], radius, false),
  'M10.5 6.5V10.5',
  'M13.5 6.5V10.5',
  'M10.5 8.5H13.5',
  ...[9, 12, 15].map(x => dot(x, 13.5)),
  rounded(opening(12, 3, 3.5), radius, false),
]
