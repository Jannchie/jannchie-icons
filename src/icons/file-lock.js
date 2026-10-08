import { center, flap, page, centerScale } from '../file'
import { rounded } from '../geometry'
import { lock, visual } from '../symbols'
import { warning } from '../tone'

// 文件 + 锁
export default ({ radius, stroke }) => [
  rounded(page(stroke, radius), radius),
  flap(stroke),
  ...warning(lock(center, centerScale * visual.lock, radius)),
]
