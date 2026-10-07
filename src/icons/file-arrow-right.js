import { center, flap, page } from '../file'
import { rounded } from '../geometry'
import { arrowRight } from '../symbols'
import { info } from '../tone'

// 文件 + 右箭头
export default ({ radius }) => [
  rounded(page(radius), radius),
  flap,
  ...info(arrowRight(center, 1, radius)),
]
