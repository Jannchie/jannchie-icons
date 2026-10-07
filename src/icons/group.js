import { circle, crisp, rounded } from '../geometry'

// 编组：四角取景框 + 框里两个方块
export default ({ radius, stroke }) => [
  rounded([[3.5, 7], [3.5, 3.5], [7, 3.5]], Math.min(radius, 1.5), false),
  rounded([[20.5, 7], [20.5, 3.5], [17, 3.5]], Math.min(radius, 1.5), false),
  rounded([[20.5, 17], [20.5, 20.5], [17, 20.5]], Math.min(radius, 1.5), false),
  rounded([[3.5, 17], [3.5, 20.5], [7, 20.5]], Math.min(radius, 1.5), false),
  rounded([[7.5, 7.5], [13.5, 7.5], [13.5, 13.5], [7.5, 13.5]], Math.min(radius, 1)),
  rounded([[10.5, 10.5], [16.5, 10.5], [16.5, 16.5], [10.5, 16.5]], Math.min(radius, 1)),
]
