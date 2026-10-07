import { center, flap, page } from '../file'
import { rounded } from '../geometry'
import { lock } from '../symbols'
import { warning } from '../tone'

// 文件 + 锁
export default ({ radius }) => [
  rounded(page(radius), radius),
  flap,
  ...warning(lock(center, 1, radius)),
]
