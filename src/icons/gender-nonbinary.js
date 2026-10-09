import { circle } from '../geometry'

// 非二元 ⚲：圆 + 上方竖线（顶端 3.5）顶着一个星号；墨迹上下居中
export default ({ radius }) => [
  circle(12, 16, 4.5),
  'M12 11.5V3.5',
  'M9.4 5L14.6 8',
  'M9.4 8L14.6 5',
]
