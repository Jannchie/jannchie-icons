import { circle } from '../geometry'

// 地球 ⊕：圆 + 内接的十字
export default ({ radius }) => [
  circle(12, 12, 8.5),
  'M12 3.5V20.5',
  'M3.5 12H20.5',
]
