import { place } from '../clearance'
import { aroundBase, badge } from '../briefcase'
import { cornerScale, outlines, cross } from '../symbols'

// 公文包 + 右下角叉
const k = cornerScale.cross

export default ({ radius, stroke }) => [
  ...aroundBase(place(outlines.cross, badge, k), radius, stroke),
  ...cross(badge, k, radius),
]
