import { center, flap, page } from '../file'
import { rounded } from '../geometry'
import { code } from '../symbols'
import { accent } from '../tone'

// 文件 + 代码
export default ({ radius }) => [
  rounded(page(radius), radius),
  flap,
  ...accent(code(center, 1, radius)),
]
