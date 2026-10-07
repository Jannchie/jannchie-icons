import { place } from '../clearance'
import { aroundTop, badgeTop } from '../folder'
import { cornerScale, gauge, outlines } from '../symbols'
import { info } from '../tone'

// 文件夹 + 右上角计速器
const k = cornerScale.gauge

export default ({ radius, stroke }) => [
  ...aroundTop(place(outlines.gauge, badgeTop, k), radius, stroke),
  ...info(gauge(badgeTop, k, radius)),
]
