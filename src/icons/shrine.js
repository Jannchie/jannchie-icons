import { rounded } from '../geometry'
import { GROUND, groundLine, opening } from '../scene'

// 神社：缓坡屋顶，两道屋面越过屋脊交叉成千木；墙上一道长押，门居中
const apex = [12, 6]
const roofY = x => apex[1] + Math.abs(x - apex[0]) / 2
const chigi = 2 // 千木伸出屋脊的水平距离

export default ({ radius }) => [
  groundLine,
  `M2.5 ${roofY(2.5)}L${apex[0] + chigi} ${apex[1] - chigi / 2}`,
  `M21.5 ${roofY(21.5)}L${apex[0] - chigi} ${apex[1] - chigi / 2}`,
  `M6.5 ${roofY(6.5)}V${GROUND}`,
  `M17.5 ${roofY(17.5)}V${GROUND}`,
  'M6.5 12.5H17.5',
  rounded(opening(12, 5, 5.5), radius, false),
]
