import { circle, crisp, rounded } from '../geometry'

// 收件箱：上窄下宽的托盘 + 中间凹进的投信口
export default ({ radius, stroke }) => [
  rounded([[6, 4.5], [18, 4.5], [20.5, 12.5], [20.5, 19.5], [3.5, 19.5], [3.5, 12.5]], Math.min(radius, 2)),
  rounded([[3.5, 12.5], [8, 12.5], [9.5, 15.5], [14.5, 15.5], [16, 12.5], [20.5, 12.5]], Math.min(radius, 1), false),
]
