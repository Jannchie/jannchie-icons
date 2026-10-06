import { place } from '../clearance'
import { aroundBase, badge } from '../briefcase'
import { cornerScale, outlines, puzzle } from '../symbols'

// 公文包 + 右下角拼图（模组）
const k = cornerScale.puzzle

export default ({ radius, stroke }) => [
  ...aroundBase(place(outlines.puzzle, badge, k), radius, stroke),
  ...puzzle(badge, k, radius),
]
