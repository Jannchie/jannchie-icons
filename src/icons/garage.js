import { rounded } from '../geometry'
import { GROUND, groundLine, opening } from '../scene'
import { hole, solid } from '../solid'

// 车库：和住宅同样的 45° 尖顶与屋檐，墙放宽，门换成带横缝的车库门
const apex = [12, 4.5]
const eave = 9
const roofY = x => apex[1] + Math.abs(x - apex[0])
const wallL = 5.5
const wallR = 18.5
const roof = radius => rounded([[apex[0] - eave, roofY(apex[0] - eave)], apex, [apex[0] + eave, roofY(apex[0] + eave)]], radius, false)
const slats = { d: 'M7.5 14.5H16.5M7.5 17.5H16.5', thin: true }

export default ({ radius }) => [
  groundLine,
  roof(radius),
  `M${wallL} ${roofY(wallL)}V${GROUND}`,
  `M${wallR} ${roofY(wallR)}V${GROUND}`,
  rounded(opening(12, 9, 7.5), radius, false),
  slats,
]

// 实心：同 home，墙和屋顶围成的一块，屋檐照旧是线；车库门挖空（洞外扩半个线宽后是门框的中心线），
// 两道横缝照旧是细线、两头接在门框上；地平线最后画
export const fill = ({ radius, stroke }) => [
  solid(rounded([[wallL, roofY(wallL)], apex, [wallR, roofY(wallR)], [wallR, GROUND, 0], [wallL, GROUND, 0]], radius)),
  roof(radius),
  hole(rounded(opening(12, 9 - stroke, 7.5 - stroke / 2), Math.max(0, radius - stroke / 2), false)),
  slats,
  groundLine,
]
