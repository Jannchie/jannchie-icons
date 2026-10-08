import { center, flap, page } from '../file'
import { rounded } from '../geometry'
import { ban } from '../symbols'
import { danger } from '../tone'

// 文件 + 禁止
export default ({ radius, stroke }) => [
  rounded(page(stroke, radius), radius),
  flap(stroke),
  ...danger(ban(center, 1, radius)),
]
