import { badge, bubbleAround } from '../chat'
import { place } from '../clearance'
import { rounded } from '../geometry'
import { cornerScale, outlines, puzzle } from '../symbols'
import { accent } from '../tone'

// 对话 + 右下角拼图（模组）
const k = cornerScale.puzzle

export default ({ radius, stroke }) => [
  ...bubbleAround(place(outlines.puzzle, badge, k), stroke, radius).map(p => rounded(p, radius, false)),
  ...accent(puzzle(badge, k, radius)),
]
