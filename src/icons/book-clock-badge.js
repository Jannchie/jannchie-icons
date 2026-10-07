import { place } from '../clearance'
import { aroundBase, badge } from '../book'
import { cornerScale, outlines, clock } from '../symbols'
import { info } from '../tone'

// 书 + 右下角时钟
const k = cornerScale.clock

export default ({ radius, stroke }) => [
  ...aroundBase(place(outlines.clock, badge, k), radius, stroke),
  ...info(clock(badge, k, radius)),
]
