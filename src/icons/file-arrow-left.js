import { center, flap, page } from '../file'
import { rounded } from '../geometry'
import { arrowLeft } from '../symbols'

// 文件 + 左箭头
export default ({ radius }) => [
  rounded(page(radius), radius),
  flap,
  ...arrowLeft(center, 1, radius),
]
