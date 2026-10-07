import { rounded } from '../geometry'
import { GROUND, groundLine, opening } from '../scene'

// 医院：平顶，正中十字
// 楼身右移半格（5.5–19.5），十字和门的竖边才能落在 .5 上
const cross = [12.5, 10.5]

export default ({ radius }) => [
  groundLine,
  rounded([[5.5, GROUND], [5.5, 5.5], [19.5, 5.5], [19.5, GROUND]], radius, false),
  `M${cross[0]} ${cross[1] - 2}V${cross[1] + 2}`,
  `M${cross[0] - 2} ${cross[1]}H${cross[0] + 2}`,
  rounded(opening(12.5, 4, 5.5), radius, false),
]
