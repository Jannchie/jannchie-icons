import { place } from '../clearance'
import { aroundTop, badgeTop } from '../folder'
import { cornerScale, outlines, puzzle } from '../symbols'
import { accent } from '../tone'

// 文件夹 + 右上角拼图（模组）
const k = cornerScale.puzzle

export default ({ radius, stroke }) => [
  ...aroundTop(place(outlines.puzzle, badgeTop, k), radius, stroke),
  ...accent(puzzle(badgeTop, k, radius)),
]
