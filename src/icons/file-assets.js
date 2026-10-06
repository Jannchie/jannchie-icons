import { center, flap, page } from '../file'
import { rounded } from '../geometry'
import { assets } from '../symbols'

// 文件 + 素材
export default ({ radius }) => [
  rounded(page(radius), radius),
  flap,
  ...assets(center, 1, radius),
]
