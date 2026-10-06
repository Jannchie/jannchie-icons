import { rounded } from '../geometry'
import { triangle, triangleWidth } from '../media'

// 快进：两个三角首尾相接，整体居中
const h = 10
const w = triangleWidth(h)
const left = 12 - w

export default ({ radius }) => [
  rounded(triangle(left, h), radius),
  rounded(triangle(left + w, h), radius),
]
