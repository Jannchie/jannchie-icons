import { rounded } from '../geometry'

// 保存（软盘）：右上切角的方框 + 上方快门 + 下方标签
export default ({ radius }) => [
  rounded([[3.5, 3.5], [16.5, 3.5], [20.5, 7.5], [20.5, 20.5], [3.5, 20.5]], Math.min(radius, 2)),
  rounded([[7.5, 3.5], [7.5, 7.5], [14.5, 7.5], [14.5, 3.5]], Math.min(radius, 1), false),
  rounded([[7.5, 20.5], [7.5, 14], [16.5, 14], [16.5, 20.5]], Math.min(radius, 1), false),
]
