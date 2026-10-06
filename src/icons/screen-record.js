import { circle, rounded } from '../geometry'
import { center, screen, stand } from '../monitor'
import { dot } from '../scene'

// 录屏：显示器 + 屏幕里的录制标记（圆圈里一个实心点）
export default ({ radius }) => [
  rounded(screen, Math.min(radius, 2.5)),
  ...stand,
  circle(center[0], center[1], 3),
  dot(center[0], center[1], 2.5),
]
