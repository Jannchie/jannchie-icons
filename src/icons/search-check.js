import base from './search'
import { check } from '../symbols'

// 搜索 + 镜片里的勾
export default ({ radius }) => [
  ...base(),
  ...check([10.5, 10.5], 0.75, radius),
]
