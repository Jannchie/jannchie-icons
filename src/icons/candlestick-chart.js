import { circle, crisp, rounded } from '../geometry'

// K 线图：两根蜡烛（影线 + 实体）
export default ({ radius, stroke }) => [
  'M7.5 3V7.5',
  rounded([[5.5, 7.5], [9.5, 7.5], [9.5, 15.5], [5.5, 15.5]], Math.min(radius, 0.75)),
  'M7.5 15.5V21',
  'M16.5 5V9.5',
  rounded([[14.5, 9.5], [18.5, 9.5], [18.5, 17.5], [14.5, 17.5]], Math.min(radius, 0.75)),
  'M16.5 17.5V21',
]
