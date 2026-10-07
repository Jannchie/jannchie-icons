import { center, flap, page } from '../file'
import { rounded } from '../geometry'
import { music } from '../symbols'
import { accent } from '../tone'

// 文件 + 音乐
export default ({ radius }) => [
  rounded(page(radius), radius),
  flap,
  ...accent(music(center, 1, radius)),
]
