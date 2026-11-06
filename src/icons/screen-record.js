import { circle, rounded } from '../geometry'
import { center, screen, stand } from '../monitor'
import { dot } from '../scene'
import { knock, solid } from '../solid'

// 录屏：显示器 + 屏幕里的录制标记（圆圈里一个实心点）
export default ({ radius }) => [
  rounded(screen, Math.min(radius, 2.5)),
  ...stand,
  circle(center[0], center[1], 3),
  dot(center[0], center[1], 2.5),
]

// 实心：屏幕一块，挖掉录制标记的圆圈，圈里留成实心圆点
export const fill = ({ radius }) => [
  solid(rounded(screen, Math.min(radius, 2.5))),
  knock(circle(center[0], center[1], 3)),
  ...stand,
]
