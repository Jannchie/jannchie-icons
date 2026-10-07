import { rounded } from '../geometry'

// 沙漏：上下横梁 + 两个对顶的锥形玻璃
export default ({ radius }) => [
  'M6 3.5H18',
  'M6 20.5H18',
  rounded([[7.5, 3.5], [7.5, 6.5], [12, 12], [16.5, 6.5], [16.5, 3.5]], Math.min(radius, 1), false),
  rounded([[7.5, 20.5], [7.5, 17.5], [12, 12], [16.5, 17.5], [16.5, 20.5]], Math.min(radius, 1), false),
]
