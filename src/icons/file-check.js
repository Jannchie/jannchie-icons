import { center, flap, page, centerScale } from '../file'
import { rounded } from '../geometry'
import { check, visual } from '../symbols'
import { success } from '../tone'

// 文件 + 勾
export default ({ radius, stroke }) => [
  rounded(page(stroke, radius), radius),
  flap(stroke),
  ...success(check(center, centerScale * visual.check, radius)),
]
