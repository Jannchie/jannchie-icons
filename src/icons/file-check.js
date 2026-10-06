import { center, flap, page } from '../file'
import { rounded } from '../geometry'
import { check } from '../symbols'

// 文件 + 勾
export default ({ radius }) => [
  rounded(page(radius), radius),
  flap,
  ...check(center, 1, radius),
]
