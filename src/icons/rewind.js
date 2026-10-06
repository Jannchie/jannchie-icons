import { rounded } from '../geometry'
import { triangle, triangleWidth } from '../media'

// 快退：快进的镜像
const h = 10
const w = triangleWidth(h)
const right = 12 + w

export default ({ radius }) => [
  rounded(triangle(right, h, -1), radius),
  rounded(triangle(right - w, h, -1), radius),
]
