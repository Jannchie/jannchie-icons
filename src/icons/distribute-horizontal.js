import { circle, crisp, rounded } from '../geometry'

// 水平均分：左右两道竖线 + 中间一个方块
export default ({ radius, stroke }) => [
  'M4 3.5V20.5',
  'M20 3.5V20.5',
  rounded([[9, 7], [15, 7], [15, 17], [9, 17]], Math.min(radius, 1.5)),
]
