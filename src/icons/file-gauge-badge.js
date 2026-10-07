import { place } from '../clearance'
import { badge, flap, pageAround } from '../file'
import { rounded } from '../geometry'
import { cornerScale, gauge, outlines } from '../symbols'
import { info } from '../tone'

// 文件 + 右下角计速器
const k = cornerScale.gauge

export default ({ radius, stroke }) => [
  rounded(pageAround(place(outlines.gauge, badge, k), stroke, radius), radius, false),
  flap,
  ...info(gauge(badge, k, radius)),
]
