import { center, flap, page } from '../file'
import { rounded } from '../geometry'
import { heart } from '../symbols'
import { danger } from '../tone'

// 文件 + 爱心
export default ({ radius, stroke }) => [
  rounded(page(stroke, radius), radius),
  flap(stroke),
  ...danger(heart(center, 1, radius)),
]
