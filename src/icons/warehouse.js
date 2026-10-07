import { rounded } from '../geometry'
import { GROUND, groundLine, opening } from '../scene'

// 仓库：拱形屋顶的大棚，宽卷帘门上两道横缝
export default ({ radius }) => [
  groundLine,
  `M3.5 ${GROUND}V11.5A8.5 6 0 0 1 20.5 11.5V${GROUND}`,
  rounded(opening(12, 9, 8.5), radius, false),
  { d: 'M7.5 14.5H16.5M7.5 17.5H16.5', thin: true },
]
