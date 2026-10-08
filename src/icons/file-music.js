import { center, flap, page } from '../file'
import { rounded } from '../geometry'
import { music } from '../symbols'
import { accent } from '../tone'

// 文件 + 音乐
export default ({ radius, stroke }) => [
  rounded(page(stroke, radius), radius),
  flap(stroke),
  ...accent(music(center, 1, radius)),
]
