import { circle, crisp, rounded } from '../geometry'

// 垂直均分：上下两道横线 + 中间一个方块
export default ({ radius, stroke }) => [
  'M3.5 4.5H20.5',
  'M3.5 19.5H20.5',
  rounded([[7.5, 8.5], [16.5, 8.5], [16.5, 15.5], [7.5, 15.5]], Math.min(radius, 1.5)),
]
