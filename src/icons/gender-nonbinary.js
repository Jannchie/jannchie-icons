import { circle } from '../geometry'

// 非二元 ⚲：圆 + 上方竖线顶着一个星号（整体右移半格）
export default ({ radius }) => [
  circle(12.5, 15, 4.5),
  'M12.5 10.5V2.5',
  'M9.9 4L15.1 7',
  'M9.9 7L15.1 4',
]
