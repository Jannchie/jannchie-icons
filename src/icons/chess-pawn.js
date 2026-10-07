import { base } from '../chess'
import { circle } from '../geometry'

// 国际象棋·兵：圆头 + 颈圈 + 往下张开的身子 + 底座；圆头（底到 8.5）和颈圈（10.5）之间留 2
export default ({ radius }) => [
  circle(12, 6, 2.5),
  'M9.5 10.5H14.5',
  'M10.25 10.5C10.25 13.5 9 16 8 17.5H16C15 16 13.75 13.5 13.75 10.5',
  base(radius),
]
