import { place } from '../clearance'
import { badge, flap, pageAround } from '../file'
import { rounded } from '../geometry'
import { arrowDown, cornerScale, outlines } from '../symbols'

// 文件 + 右下角下箭头
const k = cornerScale.arrowDown

export default ({ radius, stroke }) => [
  rounded(pageAround(place(outlines.arrowDown, badge, k), stroke, radius), radius, false),
  flap,
  ...arrowDown(badge, k, radius),
]
