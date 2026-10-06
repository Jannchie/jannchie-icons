import { circle, crisp, rounded } from '../geometry'

// 适应屏幕：四角取景框 + 中间一个方块
export default ({ radius, stroke }) => [
  rounded([[3, 6.5], [3, 3], [6.5, 3]], Math.min(radius, 1.5), false),
  rounded([[21, 6.5], [21, 3], [17.5, 3]], Math.min(radius, 1.5), false),
  rounded([[21, 17.5], [21, 21], [17.5, 21]], Math.min(radius, 1.5), false),
  rounded([[3, 17.5], [3, 21], [6.5, 21]], Math.min(radius, 1.5), false),
  rounded([[8, 8], [16, 8], [16, 16], [8, 16]], Math.min(radius, 1.5)),
]
