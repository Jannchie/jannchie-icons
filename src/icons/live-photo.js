import { circle } from '../geometry'
import { dot } from '../scene'

// 实况照片：中心圆 + 中圈 + 外圈一圈点
export default () => [
  circle(12, 12, 2.5),
  circle(12, 12, 5.5),
  ...Array.from({ length: 16 }, (_, i) => dot(12 + 9 * Math.cos(i * Math.PI / 8), 12 + 9 * Math.sin(i * Math.PI / 8), 1.5)),
]
