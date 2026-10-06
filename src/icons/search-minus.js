import base from './search'
import { minus } from '../symbols'

// 搜索 + 镜片里的减号（缩小）
export default ({ radius }) => [
  ...base(),
  ...minus([10.5, 10.5], 0.85, radius),
]
