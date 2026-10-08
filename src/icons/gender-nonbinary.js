import { circle } from '../geometry'

// 非二元 ⚲：圆 + 上方竖线顶着一个星号
export default ({ radius }) => [
  circle(12, 15, 4.5),
  'M12 10.5V2.5',
  'M9.4 4L14.6 7',
  'M9.4 7L14.6 4',
]
