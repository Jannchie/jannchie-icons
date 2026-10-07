import { center, flap, page } from '../file'
import { rounded } from '../geometry'
import { clock } from '../symbols'
import { info } from '../tone'

// 文件 + 时钟
export default ({ radius }) => [
  rounded(page(radius), radius),
  flap,
  ...info(clock(center, 1, radius)),
]
