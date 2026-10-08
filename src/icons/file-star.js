import { center, flap, page } from '../file'
import { rounded } from '../geometry'
import { star } from '../symbols'
import { warning } from '../tone'

// 文件 + 收藏
export default ({ radius, stroke }) => [
  rounded(page(stroke, radius), radius),
  flap(stroke),
  ...warning(star(center, 1, radius)),
]
