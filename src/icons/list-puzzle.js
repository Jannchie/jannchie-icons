import { listBadge } from '../list'
import { cornerScale, outlines, puzzle } from '../symbols'
import { accent } from '../tone'

// 列表 + 拼图（模组）
const k = cornerScale.puzzle

export default ({ radius, stroke }) => {
  const { center, size, lines } = listBadge(outlines.puzzle, k, stroke)
  return [...lines, ...accent(puzzle(center, size, radius))]
}
