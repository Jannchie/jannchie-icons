import { center, flap, page } from '../file'
import { rounded } from '../geometry'
import { ban } from '../symbols'

// 文件 + 禁止
export default ({ radius }) => [
  rounded(page(radius), radius),
  flap,
  ...ban(center, 1, radius),
]
