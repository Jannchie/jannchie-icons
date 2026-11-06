import { rounded } from '../geometry'
import { knock, solid } from '../solid'

// 饭团：大圆角三角 + 底部的海苔
export default ({ radius }) => [
  rounded([[12, 3.5], [21, 19.5], [3, 19.5]], 4),
  rounded([[9.5, 19.5], [9.5, 13.5], [14.5, 13.5], [14.5, 19.5]], Math.min(radius, 1), false),
]

// 实心：饭团一块，挖掉海苔的轮廓（海苔留成实心，四周一道缝和米饭分开）
export const fill = ({ radius, stroke }) => [
  solid(rounded([[12, 3.5], [21, 19.5], [3, 19.5]], 4)),
  // 两侧往下多伸一个线宽，把饭团底边切干净
  knock(rounded([[9.5, 19.5 + stroke], [9.5, 13.5], [14.5, 13.5], [14.5, 19.5 + stroke]], Math.min(radius, 1), false)),
]
