import { circle } from '../geometry'

// 摄氏度 ℃：左上的小圆 + 开口朝右的 C
export default ({ radius }) => [
  circle(6, 6.5, 2),
  'M18.04 7.79A5.5 5.5 0 1 0 18.04 16.21',
]
