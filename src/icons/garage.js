import { rounded } from '../geometry'
import { GROUND, groundLine, opening } from '../scene'

// 车库：和住宅同样的 45° 尖顶与屋檐，墙放宽，门换成带横缝的车库门
const apex = [12, 4.5]
const eave = 9
const roofY = x => apex[1] + Math.abs(x - apex[0])
const wallL = 5.5
const wallR = 18.5

export default ({ radius }) => [
  groundLine,
  rounded([[apex[0] - eave, roofY(apex[0] - eave)], apex, [apex[0] + eave, roofY(apex[0] + eave)]], radius, false),
  `M${wallL} ${roofY(wallL)}V${GROUND}`,
  `M${wallR} ${roofY(wallR)}V${GROUND}`,
  rounded(opening(12, 9, 7.5), radius, false),
  { d: 'M7.5 14.5H16.5M7.5 17.5H16.5', thin: true },
]
