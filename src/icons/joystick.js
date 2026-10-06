import { circle, rounded } from '../geometry'

// 摇杆：底座 + 杆 + 顶上的球 + 底座上一个按键
export default ({ radius }) => [
  rounded([[4, 16], [20, 16], [20, 20.5], [4, 20.5]], Math.min(radius, 1.5)),
  'M12 16V9',
  circle(12, 6, 3),
  rounded([[15.5, 16], [15.5, 14], [18, 14], [18, 16]], Math.min(radius, 0.75), false),
]
