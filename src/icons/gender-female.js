import { circle } from '../geometry'

// 女性 ♀：圆 + 下方十字
export default ({ radius }) => [
  circle(12, 9, 5.5),
  'M12 14.5V21.5',
  'M8.5 18H15.5',
]
