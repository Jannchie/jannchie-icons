import { rounded } from '../geometry'
import { GROUND, groundLine, opening } from '../scene'

// 45° 尖顶，屋顶两侧比墙多伸出 2.5 形成屋檐；墙从屋面上取交点
const apex = [12, 4]
const eave = 8.5
const roofY = x => apex[1] + Math.abs(x - apex[0])

const wallL = 6
const wallR = 18

export default ({ radius }) => [
  groundLine,
  rounded([[apex[0] - eave, roofY(apex[0] - eave)], apex, [apex[0] + eave, roofY(apex[0] + eave)]], radius, false),
  `M${wallL} ${roofY(wallL)}V${GROUND}`,
  `M${wallR} ${roofY(wallR)}V${GROUND}`,
  rounded(opening(12, 4.5, 6.5), radius, false),
]
