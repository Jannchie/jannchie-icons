import { circle } from '../geometry'

// 百分号：一道斜线 + 左上、右下两个小圆
export default ({ radius }) => [
  'M18.5 5.5L5.5 18.5',
  circle(7.5, 7.5, 2.25),
  circle(16.5, 16.5, 2.25),
]
