import { place } from '../clearance'
import { aroundBase, badge } from '../calendar'
import { cornerScale, outlines, puzzle } from '../symbols'
import { accent } from '../tone'

// 日历 + 右下角拼图（模组）
const k = cornerScale.puzzle

export default ({ radius, stroke }) => [
  ...aroundBase(place(outlines.puzzle, badge, k), radius, stroke),
  ...accent(puzzle(badge, k, radius)),
]
