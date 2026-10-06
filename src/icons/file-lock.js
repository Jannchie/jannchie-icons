import { center, flap, page } from '../file'
import { rounded } from '../geometry'
import { lock } from '../symbols'

// 文件 + 锁
export default ({ radius }) => [
  rounded(page(radius), radius),
  flap,
  ...lock(center, 1, radius),
]
