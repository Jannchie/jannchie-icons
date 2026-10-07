import { place } from '../clearance'
import { aroundTop, badgeTop } from '../folder'
import { clock, cornerScale, outlines } from '../symbols'
import { info } from '../tone'

// 文件夹 + 右上角时钟
const k = cornerScale.clock

export default ({ radius, stroke }) => [
  ...aroundTop(place(outlines.clock, badgeTop, k), radius, stroke),
  ...info(clock(badgeTop, k, radius)),
]
