import { rounded } from '../geometry'

// 实验：瓶口 + 瓶颈 + 锥形瓶身 + 液面
export default ({ radius }) => [
  'M8.5 3.5H15.5',
  'M9.5 3.5V9',
  'M14.5 3.5V9',
  rounded([[9.5, 9], [4, 20.5], [20, 20.5], [14.5, 9]], Math.min(radius, 1.5), false),
  // 液面两端正好落在瓶身斜边上（y = 14.5），不会被吸歪
  'M6.87 14.5H17.13',
]
