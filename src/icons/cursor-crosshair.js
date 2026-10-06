import { circle } from '../geometry'

// 十字准星：圆 + 四个方向伸出圆外的短线（中心留空）
export default () => [
  circle(12, 12, 6.5),
  'M12 2.5V8',
  'M12 16V21.5',
  'M2.5 12H8',
  'M16 12H21.5',
]
