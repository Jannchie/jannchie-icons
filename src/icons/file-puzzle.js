import { center, flap, page } from '../file'
import { rounded } from '../geometry'
import { puzzle } from '../symbols'

// 文件 + 拼图（模组）
export default ({ radius }) => [
  rounded(page(radius), radius),
  flap,
  ...puzzle(center, 1, radius),
]
