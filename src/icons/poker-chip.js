import { circle } from '../geometry'
import { ring } from '../marks'

// 筹码：外圈 + 内圈 + 外圈上下左右四道刻痕（刻痕落在 .5 上，往左上偏半格）
export default ({ radius }) => [
  ring(),
  circle(12, 12, 5),
  'M11.5 3V7',
  'M11.5 17V21',
  'M3 11.5H7',
  'M17 11.5H21',
]
