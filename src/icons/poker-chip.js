import { circle } from '../geometry'
import { ring } from '../marks'

// 筹码：外圈 + 内圈 + 外圈上下左右四道刻痕（刻痕在中轴上）
export default ({ radius }) => [
  ring(),
  circle(12, 12, 5),
  'M12 3V7',
  'M12 17V21',
  'M3 12H7',
  'M17 12H21',
]
