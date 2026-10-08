import { center, flap, page } from '../file'
import { rounded } from '../geometry'
import { assets } from '../symbols'
import { accent } from '../tone'

// 文件 + 素材
export default ({ radius, stroke }) => [
  rounded(page(stroke, radius), radius),
  flap(stroke),
  ...accent(assets(center, 1, radius)),
]
