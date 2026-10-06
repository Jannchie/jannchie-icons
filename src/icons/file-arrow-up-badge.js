import { place } from '../clearance'
import { badge, flap, pageAround } from '../file'
import { rounded } from '../geometry'
import { arrowUp, cornerScale, outlines } from '../symbols'

// 文件 + 右下角上箭头
const k = cornerScale.arrowUp

export default ({ radius, stroke }) => [
  rounded(pageAround(place(outlines.arrowUp, badge, k), stroke, radius), radius, false),
  flap,
  ...arrowUp(badge, k, radius),
]
