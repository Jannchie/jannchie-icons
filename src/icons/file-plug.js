import { center, flap, page } from '../file'
import { rounded } from '../geometry'
import { plug } from '../symbols'

// 文件 + 插头
export default ({ radius }) => [
  rounded(page(radius), radius),
  flap,
  ...plug(center, 1, radius),
]
