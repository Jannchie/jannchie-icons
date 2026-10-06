import base from './search'
import { cross } from '../symbols'

// 搜索 + 镜片里的叉（清除）
export default ({ radius }) => [
  ...base(),
  ...cross([10.5, 10.5], 0.9, radius),
]
