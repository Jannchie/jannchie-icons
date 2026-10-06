import { rounded } from '../geometry'
import { dot } from '../scene'

// 键盘：外框 + 两排按键点 + 空格键
export default ({ radius }) => [
  rounded([[2.5, 6], [21.5, 6], [21.5, 18], [2.5, 18]], Math.min(radius, 2)),
  dot(6, 9.5, 1.75),
  dot(9.33, 9.5, 1.75),
  dot(12.67, 9.5, 1.75),
  dot(16, 9.5, 1.75),
  dot(18, 9.5, 1.75),
  dot(6, 12.5, 1.75),
  dot(9.33, 12.5, 1.75),
  dot(12.67, 12.5, 1.75),
  dot(16, 12.5, 1.75),
  dot(18, 12.5, 1.75),
  'M8 15.25H16',
]
