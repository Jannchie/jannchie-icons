import { circle, crisp, rounded } from '../geometry'

// 水平均分：左右两道竖线 + 中间一个方块
export default ({ radius, stroke }) => [
  'M4.5 3.5V20.5',
  'M19.5 3.5V20.5',
  rounded([[8.5, 7.5], [15.5, 7.5], [15.5, 16.5], [8.5, 16.5]], Math.min(radius, 1.5)),
]
