import { circle, crisp, rounded } from '../geometry'

// 编组：四角取景框 + 框里两个方块
export default ({ radius, stroke }) => [
  rounded([[3, 6.5], [3, 3], [6.5, 3]], Math.min(radius, 1.5), false),
  rounded([[21, 6.5], [21, 3], [17.5, 3]], Math.min(radius, 1.5), false),
  rounded([[21, 17.5], [21, 21], [17.5, 21]], Math.min(radius, 1.5), false),
  rounded([[3, 17.5], [3, 21], [6.5, 21]], Math.min(radius, 1.5), false),
  rounded([[7, 7], [13, 7], [13, 13], [7, 13]], Math.min(radius, 1)),
  rounded([[11, 11], [17, 11], [17, 17], [11, 17]], Math.min(radius, 1)),
]
