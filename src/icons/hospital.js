import { rounded } from '../geometry'
import { GROUND, groundLine, opening } from '../scene'

// 医院：平顶，正中十字
const cross = [12, 10.5]

export default ({ radius }) => [
  groundLine,
  rounded([[5, GROUND], [5, 5.5], [19, 5.5], [19, GROUND]], radius, false),
  `M${cross[0]} ${cross[1] - 2}V${cross[1] + 2}`,
  `M${cross[0] - 2} ${cross[1]}H${cross[0] + 2}`,
  rounded(opening(12, 4.5, 5), radius, false),
]
