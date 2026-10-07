import { circle, rounded } from '../geometry'
import { dot, GROUND, groundLine, opening } from '../scene'

// 学校：两翼平顶，正中钟楼高出一截、45° 山墙，楼上一只钟，门在钟楼底下
export default ({ radius }) => [
  groundLine,
  rounded([[4.5, GROUND], [4.5, 12.5], [8.5, 12.5], [8.5, 8.5], [12, 5], [15.5, 8.5], [15.5, 12.5], [19.5, 12.5], [19.5, GROUND]], radius, false),
  circle(12, 10, 1.75),
  dot(6.5, 16),
  dot(17.5, 16),
  rounded(opening(12, 3, 4.5), radius, false),
]
