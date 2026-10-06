import { circle } from '../geometry'

// 空集 ∅：圆 + 斜穿的一道
export default ({ radius }) => [
  circle(12, 12, 7),
  'M18 4L6 20',
]
