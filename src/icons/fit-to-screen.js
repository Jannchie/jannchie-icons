import { circle, crisp, rounded } from '../geometry'

// 适应屏幕：四角取景框 + 中间一个方块
export default ({ radius, stroke }) => [
  rounded([[3.5, 7], [3.5, 3.5], [7, 3.5]], Math.min(radius, 1.5), false),
  rounded([[20.5, 7], [20.5, 3.5], [17, 3.5]], Math.min(radius, 1.5), false),
  rounded([[20.5, 17], [20.5, 20.5], [17, 20.5]], Math.min(radius, 1.5), false),
  rounded([[3.5, 17], [3.5, 20.5], [7, 20.5]], Math.min(radius, 1.5), false),
  rounded([[8.5, 8.5], [15.5, 8.5], [15.5, 15.5], [8.5, 15.5]], Math.min(radius, 1.5)),
]
