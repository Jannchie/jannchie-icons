import { circle, crisp, rounded } from '../geometry'

// 垂直均分：上下两道横线 + 中间一个方块
export default ({ radius, stroke }) => [
  'M3.5 4H20.5',
  'M3.5 20H20.5',
  rounded([[7, 9], [17, 9], [17, 15], [7, 15]], Math.min(radius, 1.5)),
]
