import { rounded } from '../geometry'
import { ring } from '../marks'
import { triangle, triangleWidth } from '../media'

// 圆圈播放键：圆 + 重心大致居中的三角（竖直底边落在 9.5）
export default ({ radius, stroke }) => [
  ring(),
  rounded(triangle(9.5, 8), Math.min(radius, 1)),
]
