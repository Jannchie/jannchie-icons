import { place } from '../clearance'
import { badge, flap, pageAround } from '../file'
import { rounded } from '../geometry'
import { arrowRight, cornerScale, outlines } from '../symbols'
import { info } from '../tone'

// 文件 + 右下角右箭头
const k = cornerScale.arrowRight

export default ({ radius, stroke }) => [
  rounded(pageAround(place(outlines.arrowRight, badge, k), stroke, radius), radius, false),
  flap,
  ...info(arrowRight(badge, k, radius)),
]
