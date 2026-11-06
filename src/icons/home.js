import { rounded } from '../geometry'
import { GROUND, groundLine, opening } from '../scene'
import { hole, solid } from '../solid'

// 45° 尖顶，屋顶两侧比墙多伸出 2.5 形成屋檐；墙从屋面上取交点
const apex = [12, 4]
const eave = 8.5
const roofY = x => apex[1] + Math.abs(x - apex[0])

const wallL = 6.5
const wallR = 17.5

export default ({ radius }) => [
  groundLine,
  rounded([[apex[0] - eave, roofY(apex[0] - eave)], apex, [apex[0] + eave, roofY(apex[0] + eave)]], radius, false),
  `M${wallL} ${roofY(wallL)}V${GROUND}`,
  `M${wallR} ${roofY(wallR)}V${GROUND}`,
  rounded(opening(12, 5, 6.5), radius, false),
]

// 实心：墙和屋顶围成的一块，屋檐照旧是线；门挖空（洞外扩半个线宽后正好是描边版门框的中心线），
// 地平线最后画，门洞不切断它
export const fill = ({ radius, stroke }) => [
  solid(rounded([[wallL, roofY(wallL)], apex, [wallR, roofY(wallR)], [wallR, GROUND], [wallL, GROUND]], radius)),
  rounded([[apex[0] - eave, roofY(apex[0] - eave)], apex, [apex[0] + eave, roofY(apex[0] + eave)]], radius, false),
  hole(rounded(opening(12, 5 - stroke, 6.5 - stroke / 2), Math.max(0, radius - stroke / 2), false)),
  groundLine,
]
