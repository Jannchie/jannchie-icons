import { rounded } from '../geometry'
import { knock, solid } from '../solid'

// 实验：瓶口 + 瓶颈 + 锥形瓶身 + 液面
const lip = 'M8.5 3.5H15.5'

export default ({ radius }) => [
  lip,
  'M9.5 3.5V9',
  'M14.5 3.5V9',
  rounded([[9.5, 9], [4, 20.5], [20, 20.5], [14.5, 9]], Math.min(radius, 1.5), false),
  // 液面两端正好落在瓶身斜边上（y = 14.5），不会被吸歪
  'M6.87 14.5H17.13',
]

// 实心：瓶颈和瓶身连成一块，瓶口照旧是线；液面挖成一道横穿整个瓶身的缝（两头穿出斜边，缝的两端就是瓶壁本身），
// 把瓶子分成上面的空瓶和下面的液体两块
export const fill = ({ radius }) => [
  solid(rounded([[9.5, 3.5, 0], [9.5, 9], [4, 20.5], [20, 20.5], [14.5, 9], [14.5, 3.5, 0]], Math.min(radius, 1.5))),
  lip,
  knock('M0 14.5H24'),
]
