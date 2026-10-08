import { center, flap, page, centerScale } from '../file'
import { rounded } from '../geometry'
import { arrowRight, visual } from '../symbols'
import { info } from '../tone'

// 文件 + 右箭头
export default ({ radius, stroke }) => [
  rounded(page(stroke, radius), radius),
  flap(stroke),
  ...info(arrowRight(center, centerScale * visual.arrowRight, radius)),
]
