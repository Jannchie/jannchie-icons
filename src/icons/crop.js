import { rounded } from '../geometry'

// 裁剪：两个交叠的 L 形
export default ({ radius }) => [
  rounded([[6.5, 3], [6.5, 17.5], [21, 17.5]], Math.min(radius, 2), false),
  rounded([[17.5, 21], [17.5, 6.5], [3, 6.5]], Math.min(radius, 2), false),
]
