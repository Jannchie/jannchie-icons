import { rounded } from '../geometry'
import { triangle } from '../media'

// 快退：快进的镜像
// 三角宽取整数 9（高约 10.4），两条竖直底边落在 20.5 / 11.5
const w = 9
const h = 2 * w * Math.tan(Math.PI / 6)
const right = 20.5

export default ({ radius }) => [
  rounded(triangle(right, h, -1), radius),
  rounded(triangle(right - w, h, -1), radius),
]
