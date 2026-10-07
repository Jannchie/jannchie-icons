import { rounded } from '../geometry'
import { triangle } from '../media'

// 快退：快进的镜像
// 三角宽 7（高约 8.1），两条竖直底边落在 19.5 / 10.5，前一个的尖和后一个的底边隔 2
const w = 7
const h = 2 * w * Math.tan(Math.PI / 6)
const right = 19.5

export default ({ radius }) => [
  rounded(triangle(right, h, -1), radius),
  rounded(triangle(right - w - 2, h, -1), radius),
]
