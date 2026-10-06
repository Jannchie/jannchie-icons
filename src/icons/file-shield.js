import { center, flap, page } from '../file'
import { rounded } from '../geometry'
import { shield } from '../symbols'

// 文件 + 盾
export default ({ radius }) => [
  rounded(page(radius), radius),
  flap,
  ...shield(center, 1, radius),
]
