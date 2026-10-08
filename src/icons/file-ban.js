import { center, flap, page, centerScale } from '../file'
import { rounded } from '../geometry'
import { ban, visual } from '../symbols'
import { danger } from '../tone'

// 文件 + 禁止
export default ({ radius, stroke }) => [
  rounded(page(stroke, radius), radius),
  flap(stroke),
  ...danger(ban(center, centerScale * visual.ban, radius)),
]
