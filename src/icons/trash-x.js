import { rounded } from '../geometry'
import { cross } from '../symbols'

// 彻底删除：垃圾桶 + 桶里一个叉
export default ({ radius }) => [
  'M4 6.5H20',
  rounded([[9.5, 6.5], [9.5, 4], [14.5, 4], [14.5, 6.5]], Math.min(radius, 1), false),
  rounded([[6, 6.5], [6, 20.5], [18, 20.5], [18, 6.5]], Math.min(radius, 2.5), false),
  ...cross([12, 13.5], 1.1, radius),
]
