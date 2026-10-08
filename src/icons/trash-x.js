import { cross } from '../symbols'
import { trash } from '../trash'

// 彻底删除：垃圾桶 + 桶里一个叉（中心在桶身内部的中点 (12, 14)）
export default ({ radius, stroke }) => [
  ...trash(radius, stroke),
  ...cross([12, 14], 1.1, radius),
]
