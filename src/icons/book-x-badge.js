import { place } from '../clearance'
import { aroundBase, badge } from '../book'
import { cornerScale, outlines, cross } from '../symbols'
import { danger } from '../tone'

// 书 + 右下角叉
const k = cornerScale.cross

export default ({ radius, stroke }) => [
  ...aroundBase(place(outlines.cross, badge, k), radius, stroke),
  ...danger(cross(badge, k, radius)),
]
