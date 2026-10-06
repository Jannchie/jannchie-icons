import { place } from '../clearance'
import { aroundBase, badge } from '../briefcase'
import { cornerScale, outlines, arrowUp } from '../symbols'

// 公文包 + 右下角上箭头
const k = cornerScale.arrowUp

export default ({ radius, stroke }) => [
  ...aroundBase(place(outlines.arrowUp, badge, k), radius, stroke),
  ...arrowUp(badge, k, radius),
]
