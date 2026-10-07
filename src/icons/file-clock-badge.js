import { place } from '../clearance'
import { badge, flap, pageAround } from '../file'
import { rounded } from '../geometry'
import { clock, cornerScale, outlines } from '../symbols'
import { info } from '../tone'

// 文件 + 右下角时钟
const k = cornerScale.clock

export default ({ radius, stroke }) => [
  rounded(pageAround(place(outlines.clock, badge, k), stroke, radius), radius, false),
  flap,
  ...info(clock(badge, k, radius)),
]
