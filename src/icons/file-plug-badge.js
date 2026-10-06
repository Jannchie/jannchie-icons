import { place } from '../clearance'
import { badge, flap, pageAround } from '../file'
import { rounded } from '../geometry'
import { cornerScale, outlines, plug } from '../symbols'

// 文件 + 右下角插头
const k = cornerScale.plug

export default ({ radius, stroke }) => [
  rounded(pageAround(place(outlines.plug, badge, k), stroke, radius), radius, false),
  flap,
  ...plug(badge, k, radius),
]
