import { rounded } from '../geometry'
import { GROUND, groundLine, opening } from '../scene'
import { hole, solid } from '../solid'

// 仓库：拱形屋顶的大棚，宽卷帘门上两道横缝
const shed = `M3.5 ${GROUND}V11.5A8.5 6 0 0 1 20.5 11.5V${GROUND}`
const slats = { d: 'M7.5 14.5H16.5M7.5 17.5H16.5', thin: true }

export default ({ radius }) => [
  groundLine,
  shed,
  rounded(opening(12, 9, 8.5), radius, false),
  slats,
]

// 实心：拱顶大棚填实；卷帘门挖空（洞外扩半个线宽后正好是描边版门框的中心线），门上两道横缝照旧是线，
// 地平线最后画，门洞不切断它
export const fill = ({ radius, stroke }) => [
  solid(`${shed}Z`),
  hole(rounded(opening(12, 9 - stroke, 8.5 - stroke / 2), Math.max(0, radius - stroke / 2), false)),
  slats,
  groundLine,
]
