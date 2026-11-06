import { rounded } from '../geometry'
import { ring } from '../marks'
import { triangle, triangleWidth } from '../media'
import { hole, solid } from '../solid'

// 圆圈播放键：圆 + 重心大致居中的三角（竖直底边落在 9.5）
export default ({ radius, stroke }) => [
  ring(),
  rounded(triangle(9.5, 8), Math.min(radius, 1)),
]

export const fill = ({ radius, stroke }) => [solid(ring()), hole(rounded(triangle(9.5, 8), Math.min(radius, 1)))]
