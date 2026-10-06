import { circle, crisp, rounded } from '../geometry'

// K 线图：两根蜡烛（影线 + 实体）
export default ({ radius, stroke }) => [
  'M8 3V7',
  rounded([[6, 7], [10, 7], [10, 15], [6, 15]], Math.min(radius, 0.75)),
  'M8 15V21',
  'M16 5V9',
  rounded([[14, 9], [18, 9], [18, 17], [14, 17]], Math.min(radius, 0.75)),
  'M16 17V21',
]
