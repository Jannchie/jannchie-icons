import { center, flap, page, centerScale } from '../file'
import { rounded } from '../geometry'
import { heart, visual } from '../symbols'
import { danger } from '../tone'

// 文件 + 爱心
export default ({ radius, stroke }) => [
  rounded(page(stroke, radius), radius),
  flap(stroke),
  ...danger(heart(center, centerScale * visual.heart, radius)),
]
