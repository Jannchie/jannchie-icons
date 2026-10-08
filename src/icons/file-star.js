import { center, flap, page, centerScale } from '../file'
import { rounded } from '../geometry'
import { star, visual } from '../symbols'
import { warning } from '../tone'

// 文件 + 收藏
export default ({ radius, stroke }) => [
  rounded(page(stroke, radius), radius),
  flap(stroke),
  ...warning(star(center, centerScale * visual.star, radius)),
]
