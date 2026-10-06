import { rounded } from '../geometry'
import { triangle } from '../media'

// 下一首：三角 + 竖线
const h = 12
const bar = 18.5
const base = 5.75

export default ({ radius }) => [
  rounded(triangle(base, h), radius),
  `M${bar} ${12 - h / 2}V${12 + h / 2}`,
]
