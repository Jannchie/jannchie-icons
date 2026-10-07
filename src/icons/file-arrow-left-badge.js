import { place } from '../clearance'
import { badge, flap, pageAround } from '../file'
import { rounded } from '../geometry'
import { arrowLeft, cornerScale, outlines } from '../symbols'
import { info } from '../tone'

// 文件 + 右下角左箭头
const k = cornerScale.arrowLeft

export default ({ radius, stroke }) => [
  rounded(pageAround(place(outlines.arrowLeft, badge, k), stroke, radius), radius, false),
  flap,
  ...info(arrowLeft(badge, k, radius)),
]
