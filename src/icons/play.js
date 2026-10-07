import { rounded } from '../geometry'
import { triangle, triangleWidth } from '../media'

// 播放：等边三角，重心对齐画布中心（重心在宽度 1/3 处）
const h = 14
// 竖直底边落在 .5 上：取 8.5（重心约在 12.5）
const base = 8.5

export default ({ radius }) => [
  rounded(triangle(base, h), radius),
]
