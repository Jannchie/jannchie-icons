import { rounded } from '../geometry'
import { GROUND, dot, groundLine, opening } from '../scene'

// 办公楼：窄高平顶，两列窗点
export default ({ radius }) => [
  groundLine,
  rounded([[6.5, GROUND], [6.5, 4], [17.5, 4], [17.5, GROUND]], radius, false),
  ...[7.5, 10.5, 13.5].flatMap(y => [dot(10, y), dot(14, y)]),
  rounded(opening(12, 3.5, 4), radius, false),
]
