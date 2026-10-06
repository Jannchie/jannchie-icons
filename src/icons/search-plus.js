import base from './search'
import { plus } from '../symbols'

// 搜索 + 镜片里的加号（放大）
export default ({ radius }) => [
  ...base(),
  ...plus([10.5, 10.5], 0.85, radius),
]
