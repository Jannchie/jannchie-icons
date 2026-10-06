import { circle } from '../geometry'

// 用户：圆头 + 肩膀弧线
export default () => [
  circle(12, 8, 3.75),
  'M5 20.5A7 6.5 0 0 1 19 20.5',
]
