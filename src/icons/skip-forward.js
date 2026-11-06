import { rounded } from '../geometry'
import { triangle } from '../media'
import { solid } from '../solid'

// 下一首：三角 + 竖线
const h = 12
const bar = 18.5
const base = 5.5 // 竖直底边落在 .5 上

export default ({ radius }) => [
  rounded(triangle(base, h), radius),
  `M${bar} ${12 - h / 2}V${12 + h / 2}`,
]

export const fill = ({ radius }) => [solid(rounded(triangle(base, h), radius)), `M${bar} ${12 - h / 2}V${12 + h / 2}`]
