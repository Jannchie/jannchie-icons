import { place } from '../clearance'
import { aroundBase, badge } from '../briefcase'
import { cornerScale, outlines, arrowLeft } from '../symbols'

// 公文包 + 右下角左箭头
const k = cornerScale.arrowLeft

export default ({ radius, stroke }) => [
  ...aroundBase(place(outlines.arrowLeft, badge, k), radius, stroke),
  ...arrowLeft(badge, k, radius),
]
