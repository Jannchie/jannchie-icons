import { center, flap, page, centerScale } from '../file'
import { rounded } from '../geometry'
import { arrowDown, visual } from '../symbols'
import { info } from '../tone'

// 文件 + 下箭头
export default ({ radius, stroke }) => [
  rounded(page(stroke, radius), radius),
  flap(stroke),
  ...info(arrowDown(center, centerScale * visual.arrowDown, radius)),
]
