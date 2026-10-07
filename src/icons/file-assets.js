import { center, flap, page } from '../file'
import { rounded } from '../geometry'
import { assets } from '../symbols'
import { accent } from '../tone'

// 文件 + 素材
export default ({ radius }) => [
  rounded(page(radius), radius),
  flap,
  ...accent(assets(center, 1, radius)),
]
