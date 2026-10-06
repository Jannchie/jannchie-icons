import { rounded } from '../geometry'

// 实验：瓶口 + 瓶颈 + 锥形瓶身 + 液面
export default ({ radius }) => [
  'M8.5 3.5H15.5',
  'M9.75 3.5V9',
  'M14.25 3.5V9',
  rounded([[9.75, 9], [4, 20.5], [20, 20.5], [14.25, 9]], Math.min(radius, 1.5), false),
  'M7 15H17',
]
