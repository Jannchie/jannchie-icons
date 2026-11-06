import { base, pieceFill } from '../chess'
import { circle } from '../geometry'

// 国际象棋·兵：圆头 + 颈圈 + 往下张开的身子 + 底座；圆头（底到 8.5）和颈圈（10.5）之间留 2
export default ({ radius }) => [
  circle(12, 6, 2.5),
  'M9.5 10.5H14.5',
  'M10.25 10.5C10.25 13.5 9 16 8 17.5H16C15 16 13.75 13.5 13.75 10.5',
  base(radius),
]

// 实心：圆头、身子、底座填实，身子和底座之间挖缝，颈圈照旧是线
export const fill = ({ radius }) => [
  ...pieceFill(radius, [circle(12, 6, 2.5), 'M10.25 10.5C10.25 13.5 9 16 8 17.5H16C15 16 13.75 13.5 13.75 10.5Z']),
  'M9.5 10.5H14.5',
]
