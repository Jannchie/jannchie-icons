import { circle } from '../geometry'

// 女性 ♀：圆 + 下方十字（整体右移半格）
export default ({ radius }) => [
  circle(12.5, 9, 5.5),
  'M12.5 14.5V21.5',
  'M9 17.5H16',
]
