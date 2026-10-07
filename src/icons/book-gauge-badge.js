import { place } from '../clearance'
import { aroundBase, badge } from '../book'
import { cornerScale, outlines, gauge } from '../symbols'
import { info } from '../tone'

// 书 + 右下角计速器
const k = cornerScale.gauge

export default ({ radius, stroke }) => [
  ...aroundBase(place(outlines.gauge, badge, k), radius, stroke),
  ...info(gauge(badge, k, radius)),
]
