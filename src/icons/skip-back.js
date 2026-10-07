import { rounded } from '../geometry'
import { triangle } from '../media'

// 上一首：下一首的镜像
const h = 12
const bar = 5.5
const base = 18.5 // 竖直底边落在 .5 上

export default ({ radius }) => [
  rounded(triangle(base, h, -1), radius),
  `M${bar} ${12 - h / 2}V${12 + h / 2}`,
]
