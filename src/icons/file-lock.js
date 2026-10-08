import { center, flap, page } from '../file'
import { rounded } from '../geometry'
import { lock } from '../symbols'
import { warning } from '../tone'

// 文件 + 锁
export default ({ radius, stroke }) => [
  rounded(page(stroke, radius), radius),
  flap(stroke),
  ...warning(lock(center, 1, radius)),
]
