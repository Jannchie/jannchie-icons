import { rounded } from '../geometry'

// 沙漏：上下横梁 + 两个对顶的锥形玻璃
export default ({ radius }) => [
  'M6 3H18',
  'M6 21H18',
  rounded([[7.5, 3], [7.5, 6.5], [12, 12], [16.5, 6.5], [16.5, 3]], Math.min(radius, 1), false),
  rounded([[7.5, 21], [7.5, 17.5], [12, 12], [16.5, 17.5], [16.5, 21]], Math.min(radius, 1), false),
]
