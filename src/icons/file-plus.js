import { center, flap, page } from '../file'
import { rounded } from '../geometry'
import { plus } from '../symbols'
import { success } from '../tone'

// 文件 + 加号
export default ({ radius }) => [
  rounded(page(radius), radius),
  flap,
  ...success(plus(center, 1, radius)),
]
