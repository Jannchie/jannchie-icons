import { rounded } from '../geometry'

// 视频：机身 + 右侧梯形镜头罩（斜边 30°）
const rise = 6 * Math.tan(Math.PI / 6)
export default ({ radius }) => [
  rounded([[3, 6], [15, 6], [15, 18], [3, 18]], Math.min(radius, 2.5)),
  rounded([[15, 10], [21, 10 - rise], [21, 14 + rise], [15, 14]], Math.min(radius, 1), false),
]
