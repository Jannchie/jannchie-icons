import { center, flap, page } from '../file'
import { rounded } from '../geometry'
import { plus } from '../symbols'

// 文件 + 加号
export default ({ radius }) => [
  rounded(page(radius), radius),
  flap,
  ...plus(center, 1, radius),
]
