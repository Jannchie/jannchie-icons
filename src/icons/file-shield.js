import { center, flap, page, centerScale } from '../file'
import { rounded } from '../geometry'
import { shield, visual } from '../symbols'
import { success } from '../tone'

// 文件 + 盾
export default ({ radius, stroke }) => [
  rounded(page(stroke, radius), radius),
  flap(stroke),
  ...success(shield(center, centerScale * visual.shield, radius)),
]
