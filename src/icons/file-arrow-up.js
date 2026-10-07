import { center, flap, page } from '../file'
import { rounded } from '../geometry'
import { arrowUp } from '../symbols'
import { info } from '../tone'

// 文件 + 上箭头
export default ({ radius }) => [
  rounded(page(radius), radius),
  flap,
  ...info(arrowUp(center, 1, radius)),
]
