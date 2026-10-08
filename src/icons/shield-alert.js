import { center, plain } from '../shield'
import { dot } from '../scene'

// 盾 + 感叹号：竖线 + 圆点，整体以盾的居中符号中心为准，竖线在正中 x 12
// （外框里的居中符号不为正中单线挪半格，见 clearance.js 的 snap）
const [x, y] = center

export default ({ stroke }) => [
  ...plain(stroke),
  `M${x} ${y - 4}V${y + 1}`,
  dot(x, y + 4),
]
