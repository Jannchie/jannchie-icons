import { center, flap, page, centerScale } from '../file'
import { rounded } from '../geometry'
import { arrowLeft, visual } from '../symbols'
import { info } from '../tone'

// 文件 + 左箭头
export default ({ radius, stroke }) => [
  rounded(page(stroke, radius), radius),
  flap(stroke),
  ...info(arrowLeft(center, centerScale * visual.arrowLeft, radius)),
]
