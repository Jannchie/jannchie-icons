import { base } from '../chess'
import { circle } from '../geometry'

// 国际象棋·兵：圆头 + 颈圈 + 往下张开的身子 + 底座
export default ({ radius }) => [
  circle(12, 6.75, 2.75),
  'M9.5 10.75H14.5',
  'M10.25 10.75C10.25 13.75 9 16 8 17.5H16C15 16 13.75 13.75 13.75 10.75',
  base(radius),
]
