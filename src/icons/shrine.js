import { rounded } from '../geometry'
import { GROUND, groundLine, opening } from '../scene'
import { hole, knock, solid } from '../solid'

// 神社：缓坡屋顶，两道屋面越过屋脊交叉成千木；墙上一道长押，门居中
const apex = [12, 6]
const roofY = x => apex[1] + Math.abs(x - apex[0]) / 2
const chigi = 2 // 千木伸出屋脊的水平距离
const wallL = 6.5
const wallR = 17.5
const roof = [
  `M2.5 ${roofY(2.5)}L${apex[0] + chigi} ${apex[1] - chigi / 2}`,
  `M21.5 ${roofY(21.5)}L${apex[0] - chigi} ${apex[1] - chigi / 2}`,
]

export default ({ radius }) => [
  groundLine,
  ...roof,
  `M${wallL} ${roofY(wallL)}V${GROUND}`,
  `M${wallR} ${roofY(wallR)}V${GROUND}`,
  `M${wallL} 12.5H${wallR}`,
  rounded(opening(12, 5, 5.5), radius, false),
]

// 实心：墙和屋面围成的一块，屋檐、千木照旧是线；长押挖成一道穿出两侧墙的缝，门挖空（洞外扩半个线宽后正好是
// 描边版门框的中心线），地平线最后画，门洞不切断它
export const fill = ({ radius, stroke }) => [
  solid(`M${wallL} ${roofY(wallL)}L${apex[0]} ${apex[1]}L${wallR} ${roofY(wallR)}V${GROUND}H${wallL}Z`),
  ...roof,
  knock(`M${wallL - 2} 12.5H${wallR + 2}`),
  hole(rounded(opening(12, 5 - stroke, 5.5 - stroke / 2), Math.max(0, radius - stroke / 2), false)),
  groundLine,
]
