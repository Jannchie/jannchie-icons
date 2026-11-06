import { listBadge, symbolFill } from '../list'
import { cornerScale, outlines, puzzle } from '../symbols'
import { accent } from '../tone'

// 列表 + 拼图（模组）
const k = cornerScale.puzzle

export default ({ radius, stroke }) => {
  const { center, size, lines } = listBadge(outlines.puzzle, k, stroke, puzzle, radius)
  return [...lines, ...accent(puzzle(center, size, radius))]
}

// 实心：行线照旧，符号填实
export const fill = ({ radius, stroke }) => {
  const { center, size, lines } = listBadge(outlines.puzzle, k, stroke, puzzle, radius)
  return [...lines, ...accent(symbolFill('puzzle', puzzle(center, size, radius), stroke))]
}
