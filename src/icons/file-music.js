import { center, flap, page, centerScale } from '../file'
import { rounded } from '../geometry'
import { music, visual } from '../symbols'
import { accent } from '../tone'

// 文件 + 音乐
export default ({ radius, stroke }) => [
  rounded(page(stroke, radius), radius),
  flap(stroke),
  ...accent(music(center, centerScale * visual.music, radius)),
]
