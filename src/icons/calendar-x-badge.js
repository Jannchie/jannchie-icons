import { place } from '../clearance'
import { aroundBase, badge } from '../calendar'
import { cornerScale, outlines, cross } from '../symbols'
import { danger } from '../tone'

// 日历 + 右下角叉
const k = cornerScale.cross

export default ({ radius, stroke }) => [
  ...aroundBase(place(outlines.cross, badge, k), radius, stroke),
  ...danger(cross(badge, k, radius)),
]
