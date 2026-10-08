import { center, flap, page } from '../file'
import { rounded } from '../geometry'
import { puzzle } from '../symbols'
import { accent } from '../tone'

// 文件 + 拼图（模组）
export default ({ radius, stroke }) => [
  rounded(page(stroke, radius), radius),
  flap(stroke),
  ...accent(puzzle(center, 1, radius)),
]
