import { rounded } from '../geometry'

// 视频：机身 + 右侧梯形镜头罩（斜边 30°）；竖边落在 .5 上，整体偏左半格
const rise = 6 * Math.tan(Math.PI / 6)
export default ({ radius }) => [
  rounded([[2.5, 6.5], [14.5, 6.5], [14.5, 17.5], [2.5, 17.5]], Math.min(radius, 2.5)),
  rounded([[14.5, 10], [20.5, 10 - rise], [20.5, 14 + rise], [14.5, 14]], Math.min(radius, 1), false),
]
