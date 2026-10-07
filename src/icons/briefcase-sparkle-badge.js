import { place } from '../clearance'
import { aroundBase, badge } from '../briefcase'
import { cornerScale, outlines, sparkle } from '../symbols'
import { accent } from '../tone'

// 公文包 + 右下角星芒
const k = cornerScale.sparkle

export default ({ radius, stroke }) => [
  ...aroundBase(place(outlines.sparkle, badge, k), radius, stroke),
  ...accent(sparkle(badge, k, radius)),
]
