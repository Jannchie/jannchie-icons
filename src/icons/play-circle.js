import { rounded } from '../geometry'
import { ring } from '../marks'
import { triangle, triangleWidth } from '../media'

// 圆圈播放键：圆 + 重心居中的三角
export default ({ radius, stroke }) => [
  ring(),
  rounded(triangle(12 - triangleWidth(8) / 3, 8), Math.min(radius, 1)),
]
