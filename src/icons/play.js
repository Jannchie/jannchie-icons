import { rounded } from '../geometry'
import { triangle, triangleWidth } from '../media'

// 播放：等边三角，重心对齐画布中心（重心在宽度 1/3 处）
const h = 14
const base = 12 - triangleWidth(h) / 3

export default ({ radius }) => [
  rounded(triangle(base, h), radius),
]
