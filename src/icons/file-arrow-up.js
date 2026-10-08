import { center, flap, page, centerScale } from '../file'
import { rounded } from '../geometry'
import { arrowUp, visual } from '../symbols'
import { info } from '../tone'

// 文件 + 上箭头
export default ({ radius, stroke }) => [
  rounded(page(stroke, radius), radius),
  flap(stroke),
  ...info(arrowUp(center, centerScale * visual.arrowUp, radius)),
]
